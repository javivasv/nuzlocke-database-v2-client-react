import { expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import TestWrapper from '../IntegrationTestWrapper';
import Auth from '../../../containers/Auth';
import Register from '../../../components/Auth/Register';
import Login from '../../../components/Auth/Login';

test("Email input values", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper initialEntries={['/register']}>
      <Route element={<Auth />}>
        <Route path="register" element={<Register />}></Route>
      </Route>
    </TestWrapper>
  );

  // Check email render
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Invalid email input
  await user.clear(emailInput);
  await user.type(emailInput, 'test email');
  expect(emailInput).toHaveValue('test email');

  // Validate format input error message
  const invalidEmailMessage = screen.queryByText('Invalid email address');
  expect(invalidEmailMessage).toBeInTheDocument();

  // Empty email input
  await user.clear(emailInput);
  expect(emailInput).toHaveValue('');

  // Validate required input error message
  const requiredEmailMessage = screen.queryByText('Email is required');
  expect(requiredEmailMessage).toBeInTheDocument();

  // Valid email input
  await user.clear(emailInput);
  await user.type(emailInput, 'valid@test.com');
  expect(emailInput).toHaveValue('valid@test.com');
  expect(invalidEmailMessage).not.toBeInTheDocument();
  expect(requiredEmailMessage).not.toBeInTheDocument();
});

test("Username input values", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper initialEntries={['/register']}>
      <Route element={<Auth />}>
        <Route path="register" element={<Register />}></Route>
      </Route>
    </TestWrapper>
  );

  // Check username render
  const usernameInput = screen.getByTestId("test-username-input");
  expect(usernameInput).toBeInTheDocument();

  // Empty username input
  await user.clear(usernameInput);
  await user.type(usernameInput, 'test username');
  await user.clear(usernameInput);
  expect(usernameInput).toHaveValue('');

  // Validate required input error message
  const requiredUsernameMessage = screen.queryByText('Username is required');
  expect(requiredUsernameMessage).toBeInTheDocument();

  // Valid username input
  await user.clear(usernameInput);
  await user.type(usernameInput, 'test username');
  expect(usernameInput).toHaveValue('test username');
  expect(requiredUsernameMessage).not.toBeInTheDocument();
});

test("Password input values", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper initialEntries={['/register']}>
      <Route element={<Auth />}>
        <Route path="register" element={<Register />}></Route>
      </Route>
    </TestWrapper>
  );

  // Check password render
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();

  // Empty password input
  await user.clear(passwordInput);
  await user.type(passwordInput, 'test password');
  await user.clear(passwordInput);
  expect(passwordInput).toHaveValue('');

  // Validate required input error message
  const requiredPasswordMessage = screen.queryByText('Password is required');
  expect(requiredPasswordMessage).toBeInTheDocument();

  // Valid password input
  await user.clear(passwordInput);
  await user.type(passwordInput, 'test password');
  expect(passwordInput).toHaveValue('test password');
  expect(requiredPasswordMessage).not.toBeInTheDocument();
});

test("Password confirmation input values", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper initialEntries={['/register']}>
      <Route element={<Auth />}>
        <Route path="register" element={<Register />}></Route>
      </Route>
    </TestWrapper>
  );

  // Check password confirmation render
  const passwordConfirmationInput = screen.getByTestId("test-password-confirmation-input");
  expect(passwordConfirmationInput).toBeInTheDocument();

  // Empty password confirmation input
  await user.clear(passwordConfirmationInput);
  await user.type(passwordConfirmationInput, 'test password confirmation');
  await user.clear(passwordConfirmationInput);
  expect(passwordConfirmationInput).toHaveValue('');

  // Validate required input error message
  const requiredPasswordConfirmationMessage = screen.getByText('Password confirmation is required');
  expect(requiredPasswordConfirmationMessage).toBeInTheDocument();

  // Check password render
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();

  // Valid password input
  await user.clear(passwordInput);
  await user.type(passwordInput, 'test password');
  expect(passwordInput).toHaveValue('test password');

  // Validate password match input error message
  await user.clear(passwordConfirmationInput);
  await user.type(passwordConfirmationInput, 'test password confirmation');
  expect(passwordConfirmationInput).toHaveValue('test password confirmation');
  const matchPasswordConfirmationMessage = screen.getByText('Passwords must match');
  expect(matchPasswordConfirmationMessage).toBeInTheDocument();

  // Valid password confirmation input
  await user.clear(passwordConfirmationInput);
  await user.type(passwordConfirmationInput, 'test password');
  expect(passwordConfirmationInput).toHaveValue('test password');

  // Validate match between inputs
  const matchPasswordConfirmationMessageSecond = screen.queryByText('Passwords must match');
  expect(matchPasswordConfirmationMessageSecond).not.toBeInTheDocument();
});

test("Submit - Empty form", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper initialEntries={['/register']}>
      <Route element={<Auth />}>
        <Route path="register" element={<Register />}></Route>
      </Route>
    </TestWrapper>
  );

  // Check email render
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Empty email input
  await user.clear(emailInput);
  expect(emailInput).toHaveValue('');

  // Check username render
  const usernameInput = screen.getByTestId("test-username-input");
  expect(usernameInput).toBeInTheDocument();

  // Empty username input
  await user.clear(usernameInput);
  expect(usernameInput).toHaveValue('');

  // Check password render
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();

  // Empty password input
  await user.clear(passwordInput);
  expect(passwordInput).toHaveValue('');

  // Check password confirmation render
  const passwordConfirmationInput = screen.getByTestId("test-password-confirmation-input");
  expect(passwordConfirmationInput).toBeInTheDocument();

  // Empty password confirmation input
  await user.clear(passwordConfirmationInput);
  expect(passwordConfirmationInput).toHaveValue('');

  // Check register button render
  const registerButton = screen.getByRole("button", { name: /register/i, });
  expect(registerButton).toBeInTheDocument();

  // Get register form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("test-register-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate required input error messages
    const requiredEmailMessage = screen.getByText('Email is required');
    expect(requiredEmailMessage).toBeInTheDocument();

    const requiredUsernameMessage = screen.getByText('Username is required');
    expect(requiredUsernameMessage).toBeInTheDocument();

    const requiredPasswordMessage = screen.getByText('Password is required');
    expect(requiredPasswordMessage).toBeInTheDocument();

    const requiredPasswordConfirmationMessage = screen.getByText('Password confirmation is required');
    expect(requiredPasswordConfirmationMessage).toBeInTheDocument();
  })
});

test("Submit - User exists", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper initialEntries={['/register']}>
      <Route element={<Auth />}>
        <Route path="register" element={<Register />}></Route>
      </Route>
    </TestWrapper>
  );

  // Check email render
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Valid email input
  await user.clear(emailInput);
  await user.type(emailInput, 'exists@test.com');
  expect(emailInput).toHaveValue('exists@test.com');

  // Check username render
  const usernameInput = screen.getByTestId("test-username-input");
  expect(usernameInput).toBeInTheDocument();

  // Valid username input
  await user.clear(usernameInput);
  await user.type(usernameInput, 'test username');
  expect(usernameInput).toHaveValue('test username');

  // Check password render
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();

  // Valid password input
  await user.clear(passwordInput);
  await user.type(passwordInput, 'test password');
  expect(passwordInput).toHaveValue('test password');

  // Check password confirmation render
  const passwordConfirmationInput = screen.getByTestId("test-password-confirmation-input");
  expect(passwordConfirmationInput).toBeInTheDocument();

  // Valid password confirmation input
  await user.clear(passwordConfirmationInput);
  await user.type(passwordConfirmationInput, 'test password');
  expect(passwordConfirmationInput).toHaveValue('test password');

  // Check register button render
  const registerButton = screen.getByRole("button", { name: /register/i, });
  expect(registerButton).toBeInTheDocument();

  // Get register form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("test-register-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate snackbar message render
    const snackbarMessage = screen.getByText("User already exists");
    expect(snackbarMessage).toBeInTheDocument();
  })
});

test("Submit - Server error", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper initialEntries={['/register']}>
      <Route element={<Auth />}>
        <Route path="register" element={<Register />}></Route>
      </Route>
    </TestWrapper>
  );

  // Check email render
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Valid email input
  await user.clear(emailInput);
  await user.type(emailInput, 'server@test.com');
  expect(emailInput).toHaveValue('server@test.com');

  // Check username render
  const usernameInput = screen.getByTestId("test-username-input");
  expect(usernameInput).toBeInTheDocument();

  // Valid username input
  await user.clear(usernameInput);
  await user.type(usernameInput, 'test username');
  expect(usernameInput).toHaveValue('test username');

  // Check password render
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();

  // Valid password input
  await user.clear(passwordInput);
  await user.type(passwordInput, 'test password');
  expect(passwordInput).toHaveValue('test password');

  // Check password confirmation render
  const passwordConfirmationInput = screen.getByTestId("test-password-confirmation-input");
  expect(passwordConfirmationInput).toBeInTheDocument();

  // Valid password confirmation input
  await user.clear(passwordConfirmationInput);
  await user.type(passwordConfirmationInput, 'test password');
  expect(passwordConfirmationInput).toHaveValue('test password');

  // Check register button render
  const registerButton = screen.getByRole("button", { name: /register/i, });
  expect(registerButton).toBeInTheDocument();

  // Get register form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("test-register-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate snackbar message render
    const snackbarMessage = screen.getByText("An error occurred during the creation");
    expect(snackbarMessage).toBeInTheDocument();
  })
});

test("Submit - Successful", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper initialEntries={['/register']}>
      <Route element={<Auth />}>
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Route>
    </TestWrapper>
  );

  // Check email render
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Valid email input
  await user.clear(emailInput);
  await user.type(emailInput, 'success@test.com');
  expect(emailInput).toHaveValue('success@test.com');

  // Check username render
  const usernameInput = screen.getByTestId("test-username-input");
  expect(usernameInput).toBeInTheDocument();

  // Valid username input
  await user.clear(usernameInput);
  await user.type(usernameInput, 'test username');
  expect(usernameInput).toHaveValue('test username');

  // Check password render
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();

  // Valid password input
  await user.clear(passwordInput);
  await user.type(passwordInput, 'test password');
  expect(passwordInput).toHaveValue('test password');

  // Check password confirmation render
  const passwordConfirmationInput = screen.getByTestId("test-password-confirmation-input");
  expect(passwordConfirmationInput).toBeInTheDocument();

  // Valid password confirmation input
  await user.clear(passwordConfirmationInput);
  await user.type(passwordConfirmationInput, 'test password');
  expect(passwordConfirmationInput).toHaveValue('test password');

  // Check register button render
  const registerButton = screen.getByRole("button", { name: /register/i, });
  expect(registerButton).toBeInTheDocument();

  // Get register form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("test-register-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate snackbar message render
    const snackbarMessage = screen.getByText("User created successfully");
    expect(snackbarMessage).toBeInTheDocument();
  })
});