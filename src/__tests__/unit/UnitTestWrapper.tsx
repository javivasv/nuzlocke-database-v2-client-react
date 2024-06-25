import { ReactNode } from 'react';
import { MemoryRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { Store } from 'redux';

interface Props {
  children: ReactNode;
  store: Store;
}

function UnitTestWrapper({ children, store }: Props) {
  return (
    <Provider store={store} >
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </Provider>
  )
}

export default UnitTestWrapper;
