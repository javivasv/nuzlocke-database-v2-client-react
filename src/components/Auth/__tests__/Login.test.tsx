import { expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { store } from '../../../store/store';
import { AuthState } from '../../../store/auth/authSlice';
import TestWrapper from '../../../TestWrapper';
import Login from '../Login';

test("Login elements render", () => {
  render(
    <TestWrapper>
      <Login />
    </TestWrapper>
  );

  // Check email render
  expect(screen.getByText("Email"));
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Check password render
  expect(screen.getByText("Password"));
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();

  // Check login button render
  const loginButton = screen.getByRole("button", { name: /login/i, });
  expect(loginButton).toBeInTheDocument();

  // Check redirect links render
  expect(screen.getByText("Forgot password"));
  expect(screen.getByText("Don't have an account?"));
  expect(screen.getByText("Register"));
  expect(screen.getByText("Home"));
});

test("Email input values", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper>
      <Login />
    </TestWrapper>
  );

  // Check email render
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Invalid email input
  await user.clear(emailInput);
  await user.type(emailInput, 'test');
  expect(emailInput).toHaveValue('test');

  const invalidEmailMessage = screen.getByText('Invalid email address');
  expect(invalidEmailMessage).toBeInTheDocument();

  // Empty email input
  await user.clear(emailInput);
  expect(emailInput).toHaveValue('');

  // Validate input error message
  const emptyEmailMessage = screen.getByText('Email is required');
  expect(emptyEmailMessage).toBeInTheDocument();

  // Valid email input
  await user.clear(emailInput);
  await user.type(emailInput, 'test@test.com');
  expect(emailInput).toHaveValue('test@test.com');
  expect(invalidEmailMessage).not.toBeInTheDocument();
  expect(emptyEmailMessage).not.toBeInTheDocument();
});

test("Password input values", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper>
      <Login />
    </TestWrapper>
  );

  // Check password render
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();

  // Empty password input
  await user.clear(passwordInput);
  await user.type(passwordInput, 'test');
  await user.clear(passwordInput);
  expect(passwordInput).toHaveValue('');

  // Validate input error message
  const emptyPasswordMessage = screen.getByText('Password is required');
  expect(emptyPasswordMessage).toBeInTheDocument();

  // Valid password input
  await user.clear(passwordInput);
  await user.type(passwordInput, 'test');
  expect(passwordInput).toHaveValue('test');
  expect(emptyPasswordMessage).not.toBeInTheDocument();
});

test("Submit empty login form", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper>
      <Login />
    </TestWrapper>
  );

  // Check email render
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Empty email input
  await user.clear(emailInput);
  expect(emailInput).toHaveValue('');

  // Check password render
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();

  // Empty password input
  await user.clear(passwordInput);
  expect(passwordInput).toHaveValue('');

  // Check login button render
  const loginButton = screen.getByRole("button", { name: /login/i, });
  expect(loginButton).toBeInTheDocument();

  // Get login form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("login-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate input error message
    const emptyEmailMessage = screen.getByText('Email is required');
    expect(emptyEmailMessage).toBeInTheDocument();

    // Validate input error message
    const emptyPasswordMessage = screen.getByText('Password is required');
    expect(emptyPasswordMessage).toBeInTheDocument();
  })
});

test("Invalid credentials", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper>
      <Login />
    </TestWrapper>
  );

  // Check email render
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Valid email input
  await user.clear(emailInput);
  await user.type(emailInput, 'invalid@test.com');
  expect(emailInput).toHaveValue('invalid@test.com');

  // Check password render
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();

  // Valid password input
  await user.clear(passwordInput);
  await user.type(passwordInput, 'test');
  expect(passwordInput).toHaveValue('test');

  // Check login button render
  const loginButton = screen.getByRole("button", { name: /login/i, });
  expect(loginButton).toBeInTheDocument();

  // Validate auth initial state
  const initialState = store.getState() as { auth: AuthState };
  expect(initialState.auth.user).toEqual(null);

  // Get login form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("login-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate error message render
    const errorMessage = screen.getByText("Invalid credentials");
    expect(errorMessage).toBeInTheDocument();
  })
});

test("Server error", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper>
      <Login />
    </TestWrapper>
  );

  // Check email render
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Valid email input
  await user.clear(emailInput);
  await user.type(emailInput, 'server@test.com');
  expect(emailInput).toHaveValue('server@test.com');

  // Check password render
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();

  // Valid password input
  await user.clear(passwordInput);
  await user.type(passwordInput, 'test');
  expect(passwordInput).toHaveValue('test');

  // Check login button render
  const loginButton = screen.getByRole("button", { name: /login/i, });
  expect(loginButton).toBeInTheDocument();

  // Validate auth initial state
  const initialState = store.getState() as { auth: AuthState };
  expect(initialState.auth.user).toEqual(null);

  // Get login form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("login-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate error message render
    const errorMessage = screen.getByText("An error occurred during the login");
    expect(errorMessage).toBeInTheDocument();
  })
});

test("Successful login", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper>
      <Login />
    </TestWrapper>
  );

  // Check email render
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Valid email input
  await user.clear(emailInput);
  await user.type(emailInput, 'success@test.com');
  expect(emailInput).toHaveValue('success@test.com');

  // Check password render
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();

  // Valid password input
  await user.clear(passwordInput);
  await user.type(passwordInput, 'test');
  expect(passwordInput).toHaveValue('test');

  // Check login button render
  const loginButton = screen.getByRole("button", { name: /login/i, });
  expect(loginButton).toBeInTheDocument();

  // Validate auth initial state
  const initialState = store.getState() as { auth: AuthState };
  expect(initialState.auth.user).toEqual(null);

  // Get login form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("login-form");
  fireEvent.submit(form);

  await waitFor(() => {
    const state = store.getState() as { auth: AuthState };

    // Validate auth state after login
    expect(state.auth.user).toEqual({
      _id: "0000",
      email: "success@test.com",
      username: "test",
    });
  })
});