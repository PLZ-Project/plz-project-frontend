import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'jotai';
import Router from './Router';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <CookiesProvider>
          <Router />
        </CookiesProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
