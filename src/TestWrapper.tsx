import { ReactNode } from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "./store/store";
import NotificationSnackbar from './components/Notifications/NotificationSnackbar';

interface Props {
  children: ReactNode;
}

function TestWrapper({ children }: Props) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        { children }
      </BrowserRouter>
      <NotificationSnackbar />
    </Provider>
  )
}

export default TestWrapper;
