import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthRoute, NonAuthRoute } from './router/customRoutes';

const MainPage = lazy(() => import('./pages/MainPage'));
const PostArticlePage = lazy(() => import('./pages/PostArticlePage'));
const PostModifyPage = lazy(() => import('./pages/PostModifyPage'));
const UserinfoPage = lazy(() => import('./pages/UserinfoPage'));
const PostSpecPage = lazy(() => import('./pages/PostSpecPage'));
const SigninPage = lazy(() => import('./pages/SigninPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const LandingPage = lazy(() => import('./pages/LandingPage'));

function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route
          path="/login"
          element={
            <NonAuthRoute>
              <SigninPage />
            </NonAuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <NonAuthRoute>
              <SignupPage />
            </NonAuthRoute>
          }
        />
        <Route
          path="/post"
          element={
            <AuthRoute>
              <PostArticlePage />
            </AuthRoute>
          }
        />
        <Route path="/post/:id" element={<PostSpecPage />} />
        <Route
          path="/post/modify/:id"
          element={
            <AuthRoute>
              <PostModifyPage />
            </AuthRoute>
          }
        />
        <Route
          path="/userinfo"
          element={
            <AuthRoute>
              <UserinfoPage />
            </AuthRoute>
          }
        />
        <Route path="/post/:id" element={<PostSpecPage />} />
      </Routes>
    </Suspense>
  );
}

export default Router;
