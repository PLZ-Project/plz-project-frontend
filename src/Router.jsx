import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LangdingPage';
import MainPage from './pages/MainPage';
import PostArticlePage from './pages/PostArticlePage';
import PostModifyPage from './pages/PostModifyPage';
import PostSpecPage from './pages/PostSpecPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import UserinfoPage from './pages/UserinfoPage';
import TestPage from './pages/testPage';
import { AuthRoute, NonAuthRoute } from './router/customRoutes';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route
        path="/login"
        element={(
          <NonAuthRoute>
            <SigninPage />
          </NonAuthRoute>
        )}
      />
      <Route
        path="/signup"
        element={(
          <NonAuthRoute>
            <SignupPage />
          </NonAuthRoute>
        )}
      />
      <Route
        path="/post"
        element={(
          <AuthRoute>
            <PostArticlePage />
          </AuthRoute>
        )}
      />
      <Route path="/post/:id" element={<PostSpecPage />} />
      <Route
        path="/post/modify/:id"
        element={(
          <AuthRoute>
            <PostModifyPage />
          </AuthRoute>
        )}
      />
      <Route
        path="/userinfo"
        element={(
          <AuthRoute>
            <UserinfoPage />
          </AuthRoute>
        )}
      />
      <Route path="/post/:id" element={<PostSpecPage />} />

      <Route
        path="/test/:id"
        element={(
          <AuthRoute>
            <TestPage />
          </AuthRoute>
        )}
      />
    </Routes>
  );
}

export default Router;
