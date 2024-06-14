def branch = env.BRANCH_NAME

pipeline {
    agent any

    environment {
        SLACK_SUCCESS_CHANNEL = '#SUCCESS'
        SLACK_FAIL_CHANNEL = '#FAIL'
        AWS_REGION = 'ap-northeast-2'
        COMMIT_MESSAGE = '⚡[Modify] 코드 수정'
        BLUE_GREEN_STATE_FILE = 'blue_green_state.txt'
        GITHUB_TOKEN = credentials('github-tokens')
        SLACK_BOT_TOKEN = credentials('slack-credentials')
        GITHUB_CREDENTIALS = credentials('github-credentials')
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo branch
                    if (branch == 'main') {
                        echo "Checking out main branch"
                        checkout([$class: 'GitSCM', branches: [[name: "*/main"]],
                            doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [],
                            userRemoteConfigs: [[url: 'https://github.com/UVC-Midterm-Project/uvc-midterm-project-frontend.git',
                            credentialsId: GITHUB_CREDENTIALS]]])
                    } else {
                        echo "Checking out dev branch"
                        checkout([$class: 'GitSCM', branches: [[name: "*/dev"]],
                            doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [],
                            userRemoteConfigs: [[url: 'https://github.com/UVC-Midterm-Project/uvc-midterm-project-frontend.git',
                            credentialsId: GITHUB_CREDENTIALS]]])
                    }

                    def blueGreenState = branch == 'main' ? 
                        sh(script: "git show origin/flag:${env.BLUE_GREEN_STATE_FILE}", returnStdout: true).trim() :
                        sh(script: "git show origin/devFlag:${env.BLUE_GREEN_STATE_FILE}", returnStdout: true).trim()

                    if (blueGreenState.isEmpty()) {
                        blueGreenState = ''
                    }

                    env.BLUE_GREEN_STATE = blueGreenState
                    echo env.BLUE_GREEN_STATE
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    branch == 'main' ?
                       docker.build('whitewalls/frontend:latest', '--no-cache .') :
                       docker.build('whitewalls/frontend-dev:latest', '--no-cache .')
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                script {
                    env.FAILED_STATE_NAME = 'Push Docker Images'

                    if(branch == 'main') {
                        withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                            sh "docker login -u ${env.DOCKER_HUB_USERNAME} -p ${env.DOCKER_HUB_PASSWORD} https://registry.hub.docker.com"
                            sh "docker push whitewalls/frontend:latest"
                        }
                    } else {
                        withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
                            sh "docker login -u ${env.DOCKER_HUB_USERNAME} -p ${env.DOCKER_HUB_PASSWORD} https://registry.hub.docker.com"
                            sh "docker push whitewalls/frontend-dev:latest"
                        }
                    }
                }
            }
        }

        stage('Deploy to Next Environment') {
            steps {
                script {
                    env.FAILED_STATE_NAME = 'Deploy to Next Environment'
                    
                    def envStatus = env.BLUE_GREEN_STATE

                    def env = envStatus == 'blue' ? 'green' : 'blue'
                    def devEnv = envStatus == 'blue' ? 'greenDev' : 'blueDev'
                    
                    def port = envStatus == 'blue' ? 83 : 84
                    def devPort = envStatus == 'blue' ? 87 : 88
                    
                    def nextEnv = branch == 'main' ? env : devEnv
                    def nextPort = branch == 'main' ? port : devPort

                    def stopAndRemoveCommand = "docker stop frontend-${nextEnv} && " +
                                            "docker container prune -f"

                    def deployCommand = branch == 'main' ? 
                                        ("docker system prune -af && docker pull whitewalls/frontend:latest && " +
                                            "docker run -d --name frontend-${nextEnv} -p ${nextPort}:80 whitewalls/frontend:latest") :
                                        ("docker system prune -af && docker pull whitewalls/frontend-dev:latest && " +
                                            "docker run -d --name frontend-${nextEnv} -p ${nextPort}:80 whitewalls/frontend-dev:latest")    

                    def commandId = sh(script: """
                    aws ssm send-command --document-name "AWS-RunShellScript" \\
                        --targets '[{"Key":"tag:Name","Values":["deploy-server"]}]' \\
                        --parameters '{"commands":["${deployCommand} && ${stopAndRemoveCommand}"]}' \\
                        --region "${AWS_REGION}" \\
                        --output text --query 'Command.CommandId'
                    """, returnStdout: true).trim()

                    waitForSSMCommandCompletion(commandId)
                }
            }
        }

        stage('Update Blue-Green State') {
            steps {
                script {
                    env.FAILED_STATE_NAME = 'Update Blue-Green State'

                    withCredentials([usernamePassword(credentialsId: 'github-credentials', usernameVariable: 'GITHUB_USERNAME', passwordVariable: 'GITHUB_TOKEN')]) {
                        if (branch == 'main') {
                            sh """
                            git init
                            git remote add origin https://github.com/UVC-Midterm-Project/uvc-midterm-project-frontend.git || git status
                            git config user.name "${GITHUB_USERNAME}"
                            git config user.email "whitewalls@naver.com"
                            git fetch origin
                            git checkout flag || git checkout -b flag origin/flag
                            git pull --rebase origin flag
                            """
                        } else {
                            sh """
                            git init
                            git remote add origin https://github.com/UVC-Midterm-Project/uvc-midterm-project-frontend.git || git status
                            git config user.name "${GITHUB_USERNAME}"
                            git config user.email "whitewalls@naver.com"
                            git fetch origin
                            git checkout devFlag || git checkout -b devFlag origin/devFlag
                            git pull --rebase origin devFlag
                            """
                        }

                        def prevEnv = env.BLUE_GREEN_STATE
                        def currentEnv = prevEnv == 'blue' ? 'green' : 'blue'

                        writeFile file: env.BLUE_GREEN_STATE_FILE, text: currentEnv
                        echo currentEnv


                        if (branch == 'main') {
                            sh """
                            git add ${env.BLUE_GREEN_STATE_FILE}
                            git commit -m "${env.COMMIT_MESSAGE}"
                            git push --force https://${env.GITHUB_USERNAME}:${env.GITHUB_TOKEN}@github.com/UVC-Midterm-Project/uvc-midterm-project-frontend.git flag
                            """
                        } else {
                            sh """
                            git add ${env.BLUE_GREEN_STATE_FILE}
                            git commit -m "${env.COMMIT_MESSAGE}"
                            git push --force https://${env.GITHUB_USERNAME}:${env.GITHUB_TOKEN}@github.com/UVC-Midterm-Project/uvc-midterm-project-frontend.git devFlag
                            """
                        }
                    }
                }
            }
        }

        stage('Switch to Next Environment') {
            steps {
                script {
                    env.FAILED_STATE_NAME = 'Switch to Next Environment'

                    def envStatus = env.BLUE_GREEN_STATE

                    def currentEnv = envStatus == 'blue' ? 'blue' : 'green'
                    def currentDevEnv = envStatus == 'blue' ? 'blueDev' : 'greenDev'

                    def nextEnv = envStatus == 'blue' ? 'green' : 'blue'
                    def nextDevEnv = envStatus == 'blue' ? 'greenDev' : 'blueDev'

                    def port = envStatus == 'blue' ? 81 : 82
                    def devPort = envStatus == 'blue' ? 85 : 86

                    def existedEnv = branch == 'main' ? currentEnv : currentDevEnv
                    def renewEnv = branch == 'main' ? nextEnv : nextDevEnv
                    def activePort = branch == 'main' ? port : devPort

                    def stopCurrentCommand

                    if (envStatus != '') {
                        stopCurrentCommand = "docker stop frontend-${existedEnv} && " +
                                            "docker container prune -f && " +
                                            "docker image prune -a -f"  
                    } else {
                        stopCurrentCommand = "docker container prune -f"
                    }

                    def startNextCommand = branch == 'main' ? 
                        "docker run -d --name frontend-${renewEnv} -p ${activePort}:80 whitewalls/frontend:latest" :
                        "docker run -d --name frontend-${renewEnv} -p ${activePort}:80 whitewalls/frontend-dev:latest"

                    def switchCommand = startNextCommand + " && " + stopCurrentCommand

                    def commandId = sh(script: """
                    aws ssm send-command --document-name "AWS-RunShellScript" \\
                        --targets '[{"Key":"tag:Name","Values":["deploy-server"]}]' \\
                        --parameters '{"commands":["${switchCommand}"]}' \\
                        --region "${AWS_REGION}" \\
                        --output text --query 'Command.CommandId'
                    """, returnStdout: true).trim()

                    waitForSSMCommandCompletion(commandId)
                }
            }
        }
    }

    post {
        success {
            script {
                def message = "⭐😋${env.BRANCH_NAME}브랜치에서 ${env.BUILD_NUMBER}번째 프론트엔드 빌드가 성공하였습니다!! PR을 승인해주세요!!😋⭐"
                slackSend(channel: env.SLACK_SUCCESS_CHANNEL, tokenCredentialId: 'slack-credentials', message: message)
            }
        }

        failure {
            script {
                node {
                    def checkEarlyStateCondition = env.FAILED_STATE_NAME != 'Push Docker Images'

                    if (checkEarlyStateCondition) {
                        def envStatus = env.BLUE_GREEN_STATE

                        def nextEnv = envStatus == 'blue' ? 'green' : 'blue'
                        def nextDevEnv = envStatus == 'blue' ? 'greenDev' : 'blueDev'
                        
                        def activeEnv = branch == 'main' ? nextEnv : nextDevEnv

                        def checkCommand = "docker inspect -f '{{.State.Running}}' frontend-${activeEnv}"
                        def cleanupCommand = "docker stop frontend-${activeEnv} && docker rm frontend-${activeEnv}"

                        def restoreCommand = "docker image prune -a -f"

                        def isRunning = sh(script: checkCommand, returnStatus: true) == 0 || false

                        if (isRunning) {
                            def commandId = sh(script: """
                                aws ssm send-command \\
                                    --document-name "AWS-RunShellScript" \\
                                    --targets '[{"Key":"tag:Name","Values":["deploy-server"]}]' \\
                                    --parameters '{"commands":["${cleanupCommand} && ${restoreCommand}"]}' \\
                                    --region "${AWS_REGION}" \\
                                    --output text --query 'Command.CommandId'
                                """, returnStdout: true).trim()

                            waitForSSMCommandCompletion(commandId)
                        } else {
                            def commandId = sh(script: """
                                aws ssm send-command \\
                                    --document-name "AWS-RunShellScript" \\
                                    --targets '[{"Key":"tag:Name","Values":["deploy-server"]}]' \\
                                    --parameters '{"commands":["${restoreCommand}"]}' \\
                                    --region "${AWS_REGION}" \\
                                    --output text --query 'Command.CommandId'
                                """, returnStdout: true).trim()

                            waitForSSMCommandCompletion(commandId)
                        }
                    }

                    def checkLateStateCondition = env.FAILED_STATE_NAME == 'Update Blue-Green State' ||  env.FAILED_STATE_NAME == 'Switch to Next Environment'

                    if (checkLateStateCondition) {
                        withCredentials([usernamePassword(credentialsId: 'github-credentials', usernameVariable: 'GITHUB_USERNAME', passwordVariable: 'GITHUB_TOKEN')]) {
                            if (branch == 'main') {
                                sh """
                                git init
                                git remote add origin https://github.com/UVC-Midterm-Project/uvc-midterm-project-frontend.git || git status
                                git config user.name "${GITHUB_USERNAME}" 
                                git config user.email "whitewalls@naver.com"
                                git  remote  set-branches  --add  'origin'  'flag'
                                git fetch origin
                                git checkout flag || git checkout -b flag origin/flag || git checkout --track origin/flag
                                git pull --rebase origin flag
                                """
                            } else {
                                sh """
                                git init
                                git remote add origin https://github.com/UVC-Midterm-Project/uvc-midterm-project-frontend.git || git status
                                git config user.name "${GITHUB_USERNAME}"
                                git config user.email "whitewalls@naver.com"
                                git remote  set-branches  --add  'origin'  'devFlag'
                                git fetch origin
                                git checkout devFlag || git checkout -b devFlag origin/devFlag || git checkout --track origin/devFlag
                                git pull --rebase origin devFlag
                                """
                            }

                            def prevEnv = env.BLUE_GREEN_STATE

                            writeFile file: env.BLUE_GREEN_STATE_FILE, text: prevEnv
                            echo prevEnv

                            if (branch == 'main') {
                                sh """
                                git add ${env.BLUE_GREEN_STATE_FILE}
                                git commit -m "${env.COMMIT_MESSAGE}"
                                git push --force https://${env.GITHUB_USERNAME}:${env.GITHUB_TOKEN}@github.com/UVC-Midterm-Project/uvc-midterm-project-frontend.git flag
                                """
                            } else {
                                sh """
                                git add ${env.BLUE_GREEN_STATE_FILE}
                                git commit -m "${env.COMMIT_MESSAGE}"
                                git push --force https://${env.GITHUB_USERNAME}:${env.GITHUB_TOKEN}@github.com/UVC-Midterm-Project/uvc-midterm-project-frontend.git devFlag
                                """
                            }
                        }
                    }

                    def message = "☔🙀${env.BRANCH_NAME}브랜치에서 ${env.BUILD_NUMBER}번째 프론트엔드 빌드가 실패하였습니다!! 로그를 확인해주세요!!🙀☔"

                    slackSend(channel: env.SLACK_FAIL_CHANNEL, tokenCredentialId: 'slack-credentials', message: message)
                }
            }
        }
    }
}


def waitForSSMCommandCompletion(commandId) {
    while (true) {
        def status = sh(script: """
            aws ssm list-command-invocations --command-id "${commandId}" \\
                --details --region "${AWS_REGION}" \\
                --output text --query 'CommandInvocations[*].Status'
        """, returnStdout: true).trim()

        if (status == "Success") {
            echo "Command ${commandId} completed successfully."
            break
        } else if (status == "Failed" || status == "Cancelled" || status == "TimedOut") {
            error "Command ${commandId} failed with status: ${status}"
        } else {
            echo "Command ${commandId} is still in progress with status: ${status}. Waiting..."
            sleep(time: 5, unit: "SECONDS")
        }
    }
}
