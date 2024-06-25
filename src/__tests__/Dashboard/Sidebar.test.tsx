import { expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import { store } from '../../store/store';
import { setUser } from '../../store/auth/authSlice';
import TestWrapper from '../../TestWrapper';
import Dashboard from '../../containers/Dashboard';
import Home from '../../containers/Home';
import NuzlockesLayout from '../../containers/NuzlockesLayout';
import NuzlockesContainer from '../../containers/NuzlockesContainer';
import About from '../../containers/About';
import Auth from '../../containers/Auth';
import Login from '../../components/Auth/Login';

// Config for useMediaQuery mock
import * as MaterialUI from '@mui/material';

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual<typeof MaterialUI>('@mui/material');
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

const { useMediaQuery } = await import('@mui/material');
(useMediaQuery as jest.Mock).mockImplementation(query => query === '(min-width:1280px)' ? true : false);

test("Elements renderization", async () => {
  const mockToggleTheme = vi.fn();

  render(
    <TestWrapper initialEntries={['/home']}>
      <Route element={<Dashboard ToggleTheme={mockToggleTheme} />}>
        <Route index path="home" element={<Home isMdAndUp={true} />} />
      </Route>
    </TestWrapper>
  );

  // Check login button render - Before setting user
  const loginButton = screen.getByRole("button", { name: /login/i, });
  expect(loginButton).toBeInTheDocument();

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

  // Check sidebar title render
  expect(screen.getByText("Nuzlocke DataBase"));

  // Check sidebar navigation elements render
  const homeIcon = screen.getByTestId('test-sidebar-home-icon');
  expect(homeIcon).toBeInTheDocument();
  expect(screen.getByText("Home"));

  const pokeballIcon = screen.getByTestId('test-sidebar-pokeball-icon');
  expect(pokeballIcon).toBeInTheDocument()
  expect(screen.getByText("Nuzlockes"));

  const infoIcon = screen.getByTestId('test-sidebar-info-icon');
  expect(infoIcon).toBeInTheDocument()
  expect(screen.getByText("About"));

  const switchElement = screen.getByRole('checkbox');
  expect(switchElement).toBeInTheDocument();
  expect(switchElement).not.toBeChecked();
  const darkModeIcon = screen.getByTestId('test-sidebar-dark-mode-icon');
  expect(darkModeIcon).toBeInTheDocument()
  
  // Check logout button render - After setting user
  const logoutButton = screen.getByRole("button", { name: /logout/i, });
  expect(logoutButton).toBeInTheDocument();
});

test("Logout - Login", async () => {
  const mockToggleTheme = vi.fn();
  const user = userEvent.setup();

  render(
    <TestWrapper initialEntries={['/home']}>
      <Route element={<Dashboard ToggleTheme={mockToggleTheme} />}>
        <Route index path="home" element={<Home isMdAndUp={true} />} />
      </Route>
      <Route element={<Auth />}>
        <Route path="login" element={<Login />}></Route>
      </Route>
    </TestWrapper>
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
  const logoutButton = screen.getByRole("button", { name: /logout/i, });
  expect(logoutButton).toBeInTheDocument();

  // Logout
  await user.click(logoutButton);

  // Check login button render
  const loginButton = screen.getByRole("button", { name: /login/i, });
  expect(loginButton).toBeInTheDocument();

  // Redirect to Login
  await user.click(loginButton);

  // Check login button render
  expect(screen.getByText("Email"));
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();
});

test("Navigation between modules", async () => {
  const mockToggleTheme = vi.fn();
  const user = userEvent.setup();

  render(
    <TestWrapper initialEntries={['/home']}>
      <Route element={<Dashboard ToggleTheme={mockToggleTheme} />}>
        <Route index path="home" element={<Home isMdAndUp={true} />} />
        <Route path="nuzlockes" element={<NuzlockesLayout isMdAndUp={true} />}>
          <Route index path="" element={<NuzlockesContainer />} />
        </Route>
        <Route path="about" element={<About isMdAndUp={true} />} />
      </Route>
    </TestWrapper>
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
  const homeButton = screen.getByText("Home");
  expect(homeButton).toBeInTheDocument;

  const nuzlockesButton = screen.getByText("Nuzlockes");
  expect(nuzlockesButton).toBeInTheDocument;

  const aboutButton = screen.getByText("About");
  expect(aboutButton).toBeInTheDocument;

  // Redirect to Nuzlockes
  await user.click(nuzlockesButton);
  expect(screen.getByText("New nuzlocke")).toBeInTheDocument;

  // Redirect to About
  await user.click(aboutButton);
  expect(screen.getByText(/my name is/i)).toBeInTheDocument;

  // Redirect to Home
  await user.click(homeButton);
  expect(screen.getByText("Welcome to the Nuzlocke DataBase!")).toBeInTheDocument;
});

test("Theme change", async () => {
  const mockToggleTheme = vi.fn();
  const user = userEvent.setup();

  render(
    <TestWrapper initialEntries={['/home']}>
      <Route element={<Dashboard ToggleTheme={mockToggleTheme} />}>
        <Route index path="home" element={<Home isMdAndUp={true} />} />
      </Route>
    </TestWrapper>
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
