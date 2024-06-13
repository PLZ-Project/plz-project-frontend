import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import PostArticlePage from './pages/PostArticlePage';
import PostModifyPage from './pages/PostModifyPage';
import PostSpecPage from './pages/PostSpecPage';

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/post" element={<PostArticlePage />} />
      <Route path="/post/:id" element={<PostSpecPage />} />
      <Route path="/post/modify/:id" element={<PostModifyPage />} />
    </Routes>
  );
}

export default Router;
