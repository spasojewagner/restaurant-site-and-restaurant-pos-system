import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; 
import './index.css';
import App from './App.jsx';
import store from './redux/store.js'; 
import { SnackbarProvider } from 'notistack';
import {
  QueryClientProvider,
  QueryClient,
} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarProvider autoHideDuration={3000}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </SnackbarProvider>
    </Provider>
  </StrictMode>
);
