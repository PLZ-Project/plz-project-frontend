import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import PostArticlePage from './pages/PostArticlePage';
import PostModifyPage from './pages/PostModifyPage';
import AuthRoute from './router/customRoutes';
import UserinfoPage from './pages/UserinfoPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/post" element={<PostArticlePage />} />
      <Route path="/post/:id" element={<PostModifyPage />} />
      <Route
        path="/userinfo"
        element={
          <AuthRoute>
            <UserinfoPage />
          </AuthRoute>
        }
      />
    </Routes>
  );
}

export default Router;
