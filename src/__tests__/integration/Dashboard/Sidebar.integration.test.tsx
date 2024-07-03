import { expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import { store } from '../../../store/store';
import { setUser } from '../../../store/auth/authSlice';
import { configMediaQuery } from '../../../mocks/mediaQuery';
import IntegrationTestWrapper from '../IntegrationTestWrapper';
import Dashboard from '../../../containers/Dashboard';
import Home from '../../../containers/Home';
import NuzlockesLayout from '../../../containers/NuzlockesLayout';
import NuzlockesContainer from '../../../containers/NuzlockesContainer';
import About from '../../../containers/About';
import Auth from '../../../containers/Auth';
import Login from '../../../components/Auth/Login';

// Config for ToggleTheme mock
const mockToggleTheme = vi.fn();

const user = userEvent.setup();

test("Logout", async () => {
  render(
    <IntegrationTestWrapper initialEntries={['/home']}>
      <Route element={<Dashboard ToggleTheme={mockToggleTheme} />}>
        <Route index path="home" element={<Home isMdAndUp={true} />} />
      </Route>
      <Route element={<Auth />}>
        <Route path="login" element={<Login />}></Route>
      </Route>
    </IntegrationTestWrapper>
  );

  // Set user to show the Nuzlocke navigation element
  // and logout button
  const testUser = {
    _id: '0000',
    email: 'test@test.com',
    username: 'test username',
  };

  act(() => {
    store.dispatch(setUser(testUser));  
  });

  // Validate auth state after setting user
  const state = store.getState().auth;
  expect(state.user).toEqual(testUser);

  // Check logout button render - After setting user
  const logoutIcon = screen.getByTestId('test-sidebar-logout-icon');
  expect(logoutIcon).toBeInTheDocument()

  // Logout
  await user.click(logoutIcon);

  // Validate auth state after setting user
  const updatedState = store.getState().auth;
  expect(updatedState.user).toEqual(null);

  // Check login button render
  const loginIcon = screen.getByTestId('test-sidebar-login-icon');
  expect(loginIcon).toBeInTheDocument()
});

test("Navigation from Home to Login", async () => {
  render(
    <IntegrationTestWrapper initialEntries={['/home']}>
      <Route element={<Dashboard ToggleTheme={mockToggleTheme} />}>
        <Route index path="home" element={<Home isMdAndUp={true} />} />
      </Route>
      <Route element={<Auth />}>
        <Route path="login" element={<Login />}></Route>
      </Route>
    </IntegrationTestWrapper>
  );

  // Check login button render
  const loginIcon = screen.getByTestId('test-sidebar-login-icon');
  expect(loginIcon).toBeInTheDocument()

  // Redirect to Login
  await user.click(loginIcon);

  // Check login email input render
  expect(screen.getByText("Email"));
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();
});

test("Navigation between modules", async () => {
  render(
    <IntegrationTestWrapper initialEntries={['/home']}>
      <Route element={<Dashboard ToggleTheme={mockToggleTheme} />}>
        <Route index path="home" element={<Home isMdAndUp={true} />} />
        <Route path="nuzlockes" element={<NuzlockesLayout isMdAndUp={true} />}>
          <Route index path="" element={<NuzlockesContainer />} />
        </Route>
        <Route path="about" element={<About isMdAndUp={true} />} />
      </Route>
    </IntegrationTestWrapper>
  );

  // Set user to show the Nuzlocke navigation element
  const testUser = {
    _id: '0000',
    email: 'test@test.com',
    username: 'test username',
  };

  act(() => {
    store.dispatch(setUser(testUser));  
  });

  // Validate auth state after setting user
  const state = store.getState().auth;
  expect(state.user).toEqual(testUser);

  // Check sidebar navigation elements render
  const homeIcon = screen.getByTestId('test-sidebar-home-icon');
  expect(homeIcon).toBeInTheDocument()

  const pokeballIcon = screen.getByTestId('test-sidebar-pokeball-icon');
  expect(pokeballIcon).toBeInTheDocument()

  const infoIcon = screen.getByTestId('test-sidebar-info-icon');
  expect(infoIcon).toBeInTheDocument()

  // Redirect to Nuzlockes
  await user.click(pokeballIcon);
  expect(screen.getByText("New nuzlocke")).toBeInTheDocument;

  // Redirect to About
  await user.click(infoIcon);
  expect(screen.getByText(/my name is/i)).toBeInTheDocument;

  // Redirect to Home
  await user.click(homeIcon);
  expect(screen.getByText("Welcome to the Nuzlocke DataBase!")).toBeInTheDocument;
});

test("Theme change", async () => {
  window.matchMedia = configMediaQuery('(min-width:900px)');

  render(
    <IntegrationTestWrapper initialEntries={['/home']}>
      <Route element={<Dashboard ToggleTheme={mockToggleTheme} />}>
        <Route index path="home" element={<Home isMdAndUp={true} />} />
      </Route>
    </IntegrationTestWrapper>
  );

  const switchElement = screen.getByRole('checkbox');
  expect(switchElement).toBeInTheDocument();
  expect(switchElement).not.toBeChecked();
  
  const darkModeIcon = screen.getByTestId('test-sidebar-dark-mode-icon');
  expect(darkModeIcon).toBeInTheDocument()

  // Turn on dark mode
  await user.click(switchElement);
  expect(mockToggleTheme).toHaveBeenCalledWith(true);

  // Clear mock
  mockToggleTheme.mockClear();

  // Turn off dark mode
  await user.click(switchElement);
  expect(mockToggleTheme).toHaveBeenCalledWith(false);
})
