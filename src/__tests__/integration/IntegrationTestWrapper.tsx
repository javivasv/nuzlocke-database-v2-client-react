import { ReactNode } from 'react';
import { MemoryRouter, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from "../../store/store";
import NotificationSnackbar from '../../components/Notifications/NotificationSnackbar';

interface Props {
  children: ReactNode;
  initialEntries?: string[];
}

function IntegrationTestWrapper({ children, initialEntries }: Props) {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          {children}
        </Routes>
      </MemoryRouter>
      <NotificationSnackbar />
    </Provider>
  )
}

export default IntegrationTestWrapper;
