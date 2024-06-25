import { expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMockStore } from '../../../mocks/store';
import UnitTestWrapper from '../UnitTestWrapper';
import Sidebar from '../../../components/Dashboard/Sidebar';

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

// Config for store mock
const state = {
  auth: {
    user: {
      _id: '0000',
      email: 'test@test.com',
      username: 'test username',
    },
  },
};

const store = createMockStore(state);

// Config for ToggleTheme mock
const mockToggleTheme = vi.fn();

test("Title renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Sidebar ToggleTheme={mockToggleTheme} />
    </UnitTestWrapper>
  );

  expect(screen.getByText("Nuzlocke DataBase"));
});

test("Home item renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Sidebar ToggleTheme={mockToggleTheme} />
    </UnitTestWrapper>
  );

  const homeIcon = screen.getByTestId('test-sidebar-home-icon');
  expect(homeIcon).toBeInTheDocument();
  expect(screen.getByText("Home"));
});

test("Nuzlockes item renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Sidebar ToggleTheme={mockToggleTheme} />
    </UnitTestWrapper>
  );

  const pokeballIcon = screen.getByTestId('test-sidebar-pokeball-icon');
  expect(pokeballIcon).toBeInTheDocument()
  expect(screen.getByText("Nuzlockes"));
});

test("About item renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Sidebar ToggleTheme={mockToggleTheme} />
    </UnitTestWrapper>
  );

  const infoIcon = screen.getByTestId('test-sidebar-info-icon');
  expect(infoIcon).toBeInTheDocument()
  expect(screen.getByText("About"));
});

test("Dark mode switch renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Sidebar ToggleTheme={mockToggleTheme} />
    </UnitTestWrapper>
  );

  const switchElement = screen.getByRole('checkbox');
  expect(switchElement).toBeInTheDocument();
  expect(switchElement).not.toBeChecked();
});

test("Logout button renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Sidebar ToggleTheme={mockToggleTheme} />
    </UnitTestWrapper>
  );

  const logoutIcon = screen.getByTestId('test-sidebar-logout-icon');
  expect(logoutIcon).toBeInTheDocument()
  const logoutButton = screen.getByRole("button", { name: /logout/i, });
  expect(logoutButton).toBeInTheDocument();
});

test("Login button renderization", () => {
  const state = {
    auth: {
      user: null,
    },
  };
  
  const store = createMockStore(state);

  render(
    <UnitTestWrapper store={store}>
      <Sidebar ToggleTheme={mockToggleTheme} />
    </UnitTestWrapper>
  );

  const loginIcon = screen.getByTestId('test-sidebar-login-icon');
  expect(loginIcon).toBeInTheDocument()
  const loginButton = screen.getByRole("button", { name: /login/i, });
  expect(loginButton).toBeInTheDocument();
});