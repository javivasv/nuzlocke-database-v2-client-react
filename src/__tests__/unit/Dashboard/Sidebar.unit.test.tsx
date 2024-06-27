import { expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMockStore } from '../../../mocks/store';
import { configMediaQuery } from '../../../mocks/mediaQuery';
import UnitTestWrapper from '../UnitTestWrapper';
import Sidebar from '../../../components/Dashboard/Sidebar';

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

test("Title renderization - Large screen and up", () => {
  window.matchMedia = configMediaQuery('(min-width:1280px)');

  render(
    <UnitTestWrapper store={store}>
      <Sidebar ToggleTheme={mockToggleTheme} />
    </UnitTestWrapper>
  );


  expect(screen.getByText("Nuzlocke DataBase"));
});

test("Home item renderization - Large screen and up", () => {
  window.matchMedia = configMediaQuery('(min-width:1280px)');

  render(
    <UnitTestWrapper store={store}>
      <Sidebar ToggleTheme={mockToggleTheme} />
    </UnitTestWrapper>
  );

  const homeIcon = screen.getByTestId('test-sidebar-home-icon');
  expect(homeIcon).toBeInTheDocument();
  expect(screen.getByText("Home"));
});

test("Nuzlockes item renderization - Large screen and up", () => {
  window.matchMedia = configMediaQuery('(min-width:1280px)');

  render(
    <UnitTestWrapper store={store}>
      <Sidebar ToggleTheme={mockToggleTheme} />
    </UnitTestWrapper>
  );

  const pokeballIcon = screen.getByTestId('test-sidebar-pokeball-icon');
  expect(pokeballIcon).toBeInTheDocument()
  expect(screen.getByText("Nuzlockes"));
});

test("About item renderization - Large screen and up", () => {
  window.matchMedia = configMediaQuery('(min-width:1280px)');

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

test("Logout button renderization - Large screen and up", () => {
  window.matchMedia = configMediaQuery('(min-width:1280px)');

  render(
    <UnitTestWrapper store={store}>
      <Sidebar ToggleTheme={mockToggleTheme} />
    </UnitTestWrapper>
  );

  const logoutIcon = screen.getByTestId('test-sidebar-logout-icon');
  expect(logoutIcon).toBeInTheDocument()
});

test("Login button renderization - Large screen and up", () => {
  window.matchMedia = configMediaQuery('(min-width:1280px)');

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
});

// Change to medium screen and down tests

test("Title renderization - Medium screen and down", () => {
  window.matchMedia = configMediaQuery('(max-width:1280px)');

  render(
    <UnitTestWrapper store={store}>
      <Sidebar ToggleTheme={mockToggleTheme} />
    </UnitTestWrapper>
  );

  expect(screen.getByText("NDB"));
});

test("Home item renderization - Medium screen and down", () => {
  window.matchMedia = configMediaQuery('(max-width:1280px)');

  render(
    <UnitTestWrapper store={store}>
      <Sidebar ToggleTheme={mockToggleTheme} />
    </UnitTestWrapper>
  );

  const homeIcon = screen.getByTestId('test-sidebar-home-icon');
  expect(homeIcon).toBeInTheDocument();

  const homeTitle = screen.queryByText('Home');
  expect(homeTitle).not.toBeInTheDocument();
});

test("Nuzlockes item renderization - Medium screen and down", () => {
  window.matchMedia = configMediaQuery('(max-width:1280px)');

  render(
    <UnitTestWrapper store={store}>
      <Sidebar ToggleTheme={mockToggleTheme} />
    </UnitTestWrapper>
  );

  const pokeballIcon = screen.getByTestId('test-sidebar-pokeball-icon');
  expect(pokeballIcon).toBeInTheDocument()

  const nuzlockesTitle = screen.queryByText('Nuzlockes');
  expect(nuzlockesTitle).not.toBeInTheDocument();
});

test("About item renderization - Medium screen and down", () => {
  window.matchMedia = configMediaQuery('(max-width:1280px)');

  render(
    <UnitTestWrapper store={store}>
      <Sidebar ToggleTheme={mockToggleTheme} />
    </UnitTestWrapper>
  );

  const infoIcon = screen.getByTestId('test-sidebar-info-icon');
  expect(infoIcon).toBeInTheDocument()

  const aboutTitle = screen.queryByText('About');
  expect(aboutTitle).not.toBeInTheDocument();
});

test("Logout button renderization - Medium screen and down", () => {
  window.matchMedia = configMediaQuery('(max-width:1280px)');

  render(
    <UnitTestWrapper store={store}>
      <Sidebar ToggleTheme={mockToggleTheme} />
    </UnitTestWrapper>
  );

  const logoutIcon = screen.getByTestId('test-sidebar-logout-icon');
  expect(logoutIcon).toBeInTheDocument()

  const logoutText = screen.queryByText('Logout');
  expect(logoutText).not.toBeInTheDocument();
});

test("Login button renderization - Medium screen and down", () => {
  window.matchMedia = configMediaQuery('(max-width:1280px)');

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

  const loginText = screen.queryByText('Login');
  expect(loginText).not.toBeInTheDocument();
});