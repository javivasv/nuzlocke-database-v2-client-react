import configureStore from 'redux-mock-store';
import { RootState } from '../store/store';

const mockStore = configureStore<Partial<RootState>>([]);

export const createMockStore = (initialState: Partial<RootState>) => {
  return mockStore(initialState);
};