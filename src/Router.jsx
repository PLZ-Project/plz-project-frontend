import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import PostArticlePage from './pages/PostArticlePage';
import PostModifyPage from './pages/PostModifyPage';
import AuthRoute from './router/customRoutes';
import UserinfoPage from './pages/UserinfoPage';
import PostSpecPage from './pages/PostSpecPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/post" element={<PostArticlePage />} />
      <Route path="/post/:id" element={<PostModifyPage />} />
      <Route path="/userinfo" element={<UserinfoPage />} />
      <Route path="/post/:id" element={<PostSpecPage />} />
      <Route path="/post/modify/:id" element={<PostModifyPage />} />
    </Routes>
  );
}

export default Router;
