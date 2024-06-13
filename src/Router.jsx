import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';

function Router() {
  return (
    <Routes>
      <Route path="/login" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default Router;
