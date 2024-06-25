import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMockStore } from '../../../mocks/store';
import UnitTestWrapper from '../UnitTestWrapper';
import Login from '../../../components/Auth/Login';

// Config for store mock
const state = {};
const store = createMockStore(state);

test("Email renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Login />
    </UnitTestWrapper>
  );

  // Check email render
  expect(screen.getByText("Email"));
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();
});

test("Password renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Login />
    </UnitTestWrapper>
  );

  // Check password render
  expect(screen.getByText("Password"));
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();
});

test("Login button renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Login />
    </UnitTestWrapper>
  );

  // Check login button render
  const loginButton = screen.getByRole("button", { name: /login/i, });
  expect(loginButton).toBeInTheDocument();
});

test("Links renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Login />
    </UnitTestWrapper>
  );

  // Check redirect links render
  expect(screen.getByText("Forgot password"));
  expect(screen.getByText("Don't have an account?"));
  expect(screen.getByText("Register"));
  expect(screen.getByText("Home"));
});