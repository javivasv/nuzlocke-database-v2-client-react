import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  // Check email render
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();

  // Empty email input
  await user.clear(passwordInput);
  await user.type(passwordInput, 'test');
  await user.clear(passwordInput);
  expect(passwordInput).toHaveValue('');

  const emptyPasswordMessage = screen.getByText('Password is required');
  expect(emptyPasswordMessage).toBeInTheDocument();

  // Valid email input
  await user.clear(passwordInput);
  await user.type(passwordInput, 'test');
  expect(passwordInput).toHaveValue('test');
  expect(emptyPasswordMessage).not.toBeInTheDocument();
});