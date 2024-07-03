import { expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import { store } from '../../../store/store';
import { AuthState } from '../../../store/auth/authSlice';
import IntegrationTestWrapper from '../IntegrationTestWrapper';
import Auth from '../../../containers/Auth';
import Login from '../../../components/Auth/Login';
import Dashboard from '../../../containers/Dashboard';
import Home from '../../../containers/Home';

// Config for ToggleTheme mock
const mockToggleTheme = vi.fn();

const user = userEvent.setup();

test("Email input values", async () => {
  render(
    <IntegrationTestWrapper initialEntries={['/login']}>
      <Route element={<Auth />}>
        <Route path="login" element={<Login />}></Route>
      </Route>
    </IntegrationTestWrapper>
  );

  // Check email render
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Invalid email input
  await user.clear(emailInput);
  await user.type(emailInput, 'test email');
  expect(emailInput).toHaveValue('test email');

  // Validate email format input error message
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

test("Password input values", async () => {
  render(
    <IntegrationTestWrapper initialEntries={['/login']}>
      <Route element={<Auth />}>
        <Route path="login" element={<Login />}></Route>
      </Route>
    </IntegrationTestWrapper>
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

test("Submit - Empty form", async () => {
  render(
    <IntegrationTestWrapper initialEntries={['/login']}>
      <Route element={<Auth />}>
        <Route path="login" element={<Login />}></Route>
      </Route>
    </IntegrationTestWrapper>
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
  const form = screen.getByTestId("test-login-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate required input error messages
    const requiredEmailMessage = screen.getByText('Email is required');
    expect(requiredEmailMessage).toBeInTheDocument();

    const requiredPasswordMessage = screen.getByText('Password is required');
    expect(requiredPasswordMessage).toBeInTheDocument();
  })
});

test("Submit - Invalid credentials", async () => {
  render(
    <IntegrationTestWrapper initialEntries={['/login']}>
      <Route element={<Auth />}>
        <Route path="login" element={<Login />}></Route>
      </Route>
    </IntegrationTestWrapper>
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
  await user.type(passwordInput, 'test password');
  expect(passwordInput).toHaveValue('test password');

  // Check login button render
  const loginButton = screen.getByRole("button", { name: /login/i, });
  expect(loginButton).toBeInTheDocument();

  // Get login form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("test-login-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate snackbar message render
    const snackbarMessage = screen.getByText("Invalid credentials");
    expect(snackbarMessage).toBeInTheDocument();
  })
});

test("Submit - Server error", async () => {
  render(
    <IntegrationTestWrapper initialEntries={['/login']}>
      <Route element={<Auth />}>
        <Route path="login" element={<Login />}></Route>
      </Route>
    </IntegrationTestWrapper>
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
  await user.type(passwordInput, 'test password');
  expect(passwordInput).toHaveValue('test password');

  // Check login button render
  const loginButton = screen.getByRole("button", { name: /login/i, });
  expect(loginButton).toBeInTheDocument();

  // Get login form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("test-login-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate snackbar message render
    const snackbarMessage = screen.getByText("An error occurred during the login");
    expect(snackbarMessage).toBeInTheDocument();
  })
});

test("Submit - Successful", async () => {
  render(
    <IntegrationTestWrapper initialEntries={['/login']}>
      <Route element={<Auth />}>
        <Route path="login" element={<Login />}></Route>
      </Route>
      <Route element={<Dashboard ToggleTheme={mockToggleTheme} />}>
        <Route index path="home" element={<Home isMdAndUp={true} />} />
      </Route>
    </IntegrationTestWrapper>
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
  await user.type(passwordInput, 'test password');
  expect(passwordInput).toHaveValue('test password');

  // Check remember me checkbox
  const rememberMeCheckbox = screen.getByRole('checkbox');
  expect(rememberMeCheckbox).toBeInTheDocument();
  expect(rememberMeCheckbox).not.toBeChecked();
  await user.click(rememberMeCheckbox);

  // Check login button render
  const loginButton = screen.getByRole("button", { name: /login/i, });
  expect(loginButton).toBeInTheDocument();

  // Validate auth initial state
  const initialState = store.getState() as { auth: AuthState };
  expect(initialState.auth.user).toEqual(null);

  // Get login form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("test-login-form");
  fireEvent.submit(form);

  await waitFor(() => {
    const state = store.getState() as { auth: AuthState };

    // Validate auth state after login
    expect(state.auth.user).toEqual({
      _id: "0000",
      email: "success@test.com",
      username: "test username",
    });

    expect(screen.getByText("Welcome to the Nuzlocke DataBase!"));

    // Check local storage 
    expect(localStorage.getItem('ndb_remember_me')).not.toBeNull();
  })
});

test("Remember me - Clear data", async () => {
  render(
    <IntegrationTestWrapper initialEntries={['/login']}>
      <Route element={<Auth />}>
        <Route path="login" element={<Login />}></Route>
      </Route>
      <Route element={<Dashboard ToggleTheme={mockToggleTheme} />}>
        <Route index path="home" element={<Home isMdAndUp={true} />} />
      </Route>
    </IntegrationTestWrapper>
  );

  // Check email render
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();
  expect(emailInput).toHaveValue('success@test.com');

  // Check password render
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).toHaveValue('test password');

  // Uncheck remember me checkbox
  const rememberMeCheckbox = screen.getByRole('checkbox');
  expect(rememberMeCheckbox).toBeInTheDocument();
  expect(rememberMeCheckbox).toBeChecked();
  await user.click(rememberMeCheckbox);

  // Check local storage 
  expect(localStorage.getItem('ndb_remember_me')).toBeNull();
});