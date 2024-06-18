import React, { useRef } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { TransitionGroup, Transition } from 'react-transition-group';
import MainPage from './pages/MainPage';
import PostArticlePage from './pages/PostArticlePage';
import PostModifyPage from './pages/PostModifyPage';
import PostSpecPage from './pages/PostSpecPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LangdingPage';
import TestPage from './pages/testPage';

const timeout = 1000;

const getTransitionStyles = {
  entering: { opacity: 0 },
  entered: { transition: `opacity ${timeout}ms ease-in-out`, opacity: 1 },
  exiting: { transition: `opacity ${timeout}ms ease-in-out`, opacity: 0 },
  exited: { opacity: 0 },
};

function AnimatedRoutes() {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <TransitionGroup>
      <Transition
        key={location.key}
        nodeRef={nodeRef}
        timeout={timeout}
      >
        {state => (
          <div
            ref={nodeRef}
            style={{
              ...getTransitionStyles[state]
            }}
          >
            <Routes location={location}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/login" element={<SigninPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/post" element={<PostArticlePage />} />
              <Route path="/post/:id" element={<PostSpecPage />} />
              <Route path="/post/modify/:id" element={<PostModifyPage />} />
            </Routes>
          </div>
        )}
      </Transition>
    </TransitionGroup>
  );
}

export default AnimatedRoutes;
