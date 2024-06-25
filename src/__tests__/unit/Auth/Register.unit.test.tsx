import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMockStore } from '../../../mocks/store';
import UnitTestWrapper from '../UnitTestWrapper';
import Register from '../../../components/Auth/Register';

// Config for store mock
const state = {};
const store = createMockStore(state);

test("Email renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Register />
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
      <Register />
    </UnitTestWrapper>
  );

  // Check password render
  expect(screen.getByText("Password"));
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();
});

test("Username renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Register />
    </UnitTestWrapper>
  );

  // Check username render
  expect(screen.getByText("Username"));
  const usernameInput = screen.getByTestId("test-username-input");
  expect(usernameInput).toBeInTheDocument();
});

test("Password renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Register />
    </UnitTestWrapper>
  );

  // Check password render
  expect(screen.getByText("Password"));
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();
});

test("Password confirmation renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Register />
    </UnitTestWrapper>
  );

  // Check password confirmation render
  expect(screen.getByText("Password confirmation"));
  const passwordConfirmationInput = screen.getByTestId("test-password-confirmation-input");
  expect(passwordConfirmationInput).toBeInTheDocument();
});

test("Register button renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Register />
    </UnitTestWrapper>
  );

  // Check register button render
  const registerButton = screen.getByRole("button", { name: /register/i, });
  expect(registerButton).toBeInTheDocument();
});

test("Links renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Register />
    </UnitTestWrapper>
  );

  // Check redirect links render
  expect(screen.getByText("Already have an account?"));
  expect(screen.getByText("Login"));
  expect(screen.getByText("Home"));
});