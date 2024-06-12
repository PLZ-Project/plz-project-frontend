import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';

function Router() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}

export default Router;
