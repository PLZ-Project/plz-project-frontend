import { BrowserRouter } from 'react-router-dom';
// import { CookiesProvider } from 'react-cookie';
import { Provider } from 'jotai';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Router from './Router';
import './App.css';

function App() {
  const queryClient = new QueryClient();
  return (
    <BrowserRouter>
      <Provider>
        <QueryClientProvider client={queryClient}>
          <Router />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
