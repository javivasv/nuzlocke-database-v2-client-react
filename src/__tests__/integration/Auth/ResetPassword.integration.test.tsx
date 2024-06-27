import { expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import { sign } from "jsonwebtoken";
import TestWrapper from '../IntegrationTestWrapper';
import Auth from '../../../containers/Auth';
import ResetPassword from '../../../components/Auth/ResetPassword';
import Login from '../../../components/Auth/Login';

const tokenKey = "testing_key";
const user = userEvent.setup();

// Used the same renderization test for all elements
test("Elements renderization and token validation - Valid token", async() => {
  const validToken = sign({
    email: "valid@test.com",
  },
  tokenKey,
  {
    expiresIn: "1d",
  });

  render(
    <TestWrapper initialEntries={[`/reset-password/${validToken}`]}>
      <Route element={<Auth />}>
        <Route path="reset-password/:resetToken" element={<ResetPassword />} />
      </Route>
    </TestWrapper>
  );

  await waitFor(() => {
    const loader = screen.queryByRole("progressbar");
    expect(loader).not.toBeInTheDocument();
  })

  // Check password render
  expect(screen.getByText("Password"));
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();

  // Check password confirmation render
  expect(screen.getByText("Password confirmation"));
  const passwordConfirmationInput = screen.getByTestId("test-password-confirmation-input");
  expect(passwordConfirmationInput).toBeInTheDocument();

  // Check reset password button render
  const resetPasswordButton = screen.getByRole("button", { name: /reset password/i, });
  expect(resetPasswordButton).toBeInTheDocument();

  // Check redirect links render
  expect(screen.getByText("Login"));
  expect(screen.getByText("Home"));
});

test("Elements renderization and token validation - Token expired", async () => {
  const validToken = sign({
    email: "expired@test.com",
  },
  tokenKey,
  {
    expiresIn: "1d",
  });

  render(
    <TestWrapper initialEntries={[`/reset-password/${validToken}`]}>
      <Route element={<Auth />}>
        <Route path="reset-password/:resetToken" element={<ResetPassword />} />
      </Route>
    </TestWrapper>
  );

  await waitFor(() => {
    const loader = screen.queryByRole("progressbar");
    expect(loader).not.toBeInTheDocument();
  })

  // Validate snackbar message render
  const snackbarMessage = screen.queryAllByText("Reset token expired");
  expect(snackbarMessage.length).toBeGreaterThan(0);

  // Check password not render
  const password = screen.queryByText('Password');
  expect(password).not.toBeInTheDocument();

  // Check password confirmation not render
  const passwordConfirmation = screen.queryByText('Password confirmation');
  expect(passwordConfirmation).not.toBeInTheDocument();

  // Check reset password button not render
  const resetPasswordButton = screen.queryByText('Reset password');
  expect(resetPasswordButton).not.toBeInTheDocument();
});

test("Elements renderization and token validation - Invalid token", async () => {
  const validToken = sign({
    email: "invalid@test.com",
  },
  tokenKey,
  {
    expiresIn: "1d",
  });

  render(
    <TestWrapper initialEntries={[`/reset-password/${validToken}`]}>
      <Route element={<Auth />}>
        <Route path="reset-password/:resetToken" element={<ResetPassword />} />
      </Route>
    </TestWrapper>
  );

  await waitFor(() => {
    const loader = screen.queryByRole("progressbar");
    expect(loader).not.toBeInTheDocument();
  })

  // Validate snackbar message render
  const snackbarMessage = screen.queryAllByText("Invalid token");
  expect(snackbarMessage.length).toBeGreaterThan(0);

  // Check password not render
  const password = screen.queryByText('Password');
  expect(password).not.toBeInTheDocument();

  // Check password confirmation not render
  const passwordConfirmation = screen.queryByText('Password confirmation');
  expect(passwordConfirmation).not.toBeInTheDocument();

  // Check reset password button not render
  const resetPasswordButton = screen.queryByText('Reset password');
  expect(resetPasswordButton).not.toBeInTheDocument();
});

test("Elements renderization and token validation - Server error", async () => {
  const validToken = sign({
    email: "server@test.com",
  },
  tokenKey,
  {
    expiresIn: "1d",
  });

  render(
    <TestWrapper initialEntries={[`/reset-password/${validToken}`]}>
      <Route element={<Auth />}>
        <Route path="reset-password/:resetToken" element={<ResetPassword />} />
      </Route>
    </TestWrapper>
  );

  await waitFor(() => {
    const loader = screen.queryByRole("progressbar");
    expect(loader).not.toBeInTheDocument();
  })

  // Validate snackbar message render
  const snackbarMessage = screen.queryAllByText("Server error");
  expect(snackbarMessage.length).toBeGreaterThan(0);

  // Check password not render
  const password = screen.queryByText('Password');
  expect(password).not.toBeInTheDocument();

  // Check password confirmation not render
  const passwordConfirmation = screen.queryByText('Password confirmation');
  expect(passwordConfirmation).not.toBeInTheDocument();

  // Check reset password button not render
  const resetPasswordButton = screen.queryByText('Reset password');
  expect(resetPasswordButton).not.toBeInTheDocument();
});

test("Password input values", async () => {
  const validToken = sign({
    email: "valid@test.com",
  },
  tokenKey,
  {
    expiresIn: "1d",
  });

  render(
    <TestWrapper initialEntries={[`/reset-password/${validToken}`]}>
      <Route element={<Auth />}>
        <Route path="reset-password/:resetToken" element={<ResetPassword />} />
      </Route>
    </TestWrapper>
  );

  await waitFor(() => {
    const loader = screen.queryByRole("progressbar");
    expect(loader).not.toBeInTheDocument();
  })

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
  const validToken = sign({
    email: "valid@test.com",
  },
  tokenKey,
  {
    expiresIn: "1d",
  });

  render(
    <TestWrapper initialEntries={[`/reset-password/${validToken}`]}>
      <Route element={<Auth />}>
        <Route path="reset-password/:resetToken" element={<ResetPassword />} />
      </Route>
    </TestWrapper>
  );

  await waitFor(() => {
    const loader = screen.queryByRole("progressbar");
    expect(loader).not.toBeInTheDocument();
  })

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
  const validToken = sign({
    email: "valid@test.com",
  },
  tokenKey,
  {
    expiresIn: "1d",
  });

  render(
    <TestWrapper initialEntries={[`/reset-password/${validToken}`]}>
      <Route element={<Auth />}>
        <Route path="reset-password/:resetToken" element={<ResetPassword />} />
      </Route>
    </TestWrapper>
  );

  await waitFor(() => {
    const loader = screen.queryByRole("progressbar");
    expect(loader).not.toBeInTheDocument();
  })

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

  // Check reset password button render
  const resetPasswordButton = screen.getByRole("button", { name: /reset password/i, });
  expect(resetPasswordButton).toBeInTheDocument();

  // Get reset password form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("test-reset-password-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate required input error messages
    const requiredPasswordMessage = screen.getByText('Password is required');
    expect(requiredPasswordMessage).toBeInTheDocument();

    const requiredPasswordConfirmationMessage = screen.getByText('Password confirmation is required');
    expect(requiredPasswordConfirmationMessage).toBeInTheDocument();
  })
});

test("Submit - Inexistent email", async () => {
  const validToken = sign({
    email: "inexistent@test.com",
  },
  tokenKey,
  {
    expiresIn: "1d",
  });

  render(
    <TestWrapper initialEntries={[`/reset-password/${validToken}`]}>
      <Route element={<Auth />}>
        <Route path="reset-password/:resetToken" element={<ResetPassword />} />
      </Route>
    </TestWrapper>
  );

  await waitFor(() => {
    const loader = screen.queryByRole("progressbar");
    expect(loader).not.toBeInTheDocument();
  })

  // Check password render
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();

  // Valid password input
  await user.clear(passwordInput);
  await user.type(passwordInput, 'test password');
  expect(passwordInput).toHaveValue('test password');

  // Check password render
  const passwordConfirmationInput = screen.getByTestId("test-password-confirmation-input");
  expect(passwordConfirmationInput).toBeInTheDocument();

  // Valid password input
  await user.clear(passwordConfirmationInput);
  await user.type(passwordConfirmationInput, 'test password');
  expect(passwordConfirmationInput).toHaveValue('test password');

  // Check reset password button render
  const resetPasswordButton = screen.getByRole("button", { name: /reset password/i, });
  expect(resetPasswordButton).toBeInTheDocument();

  // Get reset password form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("test-reset-password-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate snackbar message render
    const snackbarMessage = screen.getByText("User not found");
    expect(snackbarMessage).toBeInTheDocument();
  })
});

test("Submit - Server error", async () => {
  const validToken = sign({
    email: "valid-server@test.com",
  },
  tokenKey,
  {
    expiresIn: "1d",
  });

  render(
    <TestWrapper initialEntries={[`/reset-password/${validToken}`]}>
      <Route element={<Auth />}>
        <Route path="reset-password/:resetToken" element={<ResetPassword />} />
      </Route>
    </TestWrapper>
  );

  await waitFor(() => {
    const loader = screen.queryByRole("progressbar");
    expect(loader).not.toBeInTheDocument();
  })

  // Check password render
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();

  // Valid password input
  await user.clear(passwordInput);
  await user.type(passwordInput, 'test password');
  expect(passwordInput).toHaveValue('test password');

  // Check password render
  const passwordConfirmationInput = screen.getByTestId("test-password-confirmation-input");
  expect(passwordConfirmationInput).toBeInTheDocument();

  // Valid password input
  await user.clear(passwordConfirmationInput);
  await user.type(passwordConfirmationInput, 'test password');
  expect(passwordConfirmationInput).toHaveValue('test password');

  // Check reset password button render
  const resetPasswordButton = screen.getByRole("button", { name: /reset password/i, });
  expect(resetPasswordButton).toBeInTheDocument();

  // Get reset password form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("test-reset-password-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate snackbar message render
    const snackbarMessage = screen.getByText("An error occurred resetting the password");
    expect(snackbarMessage).toBeInTheDocument();
  })
});

test("Submit - Successful", async () => {
  const validToken = sign({
    email: "success@test.com",
  },
  tokenKey,
  {
    expiresIn: "1d",
  });

  render(
    <TestWrapper initialEntries={[`/reset-password/${validToken}`]}>
      <Route element={<Auth />}>
        <Route path="reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="login" element={<Login />}></Route>
      </Route>
    </TestWrapper>
  );

  await waitFor(() => {
    const loader = screen.queryByRole("progressbar");
    expect(loader).not.toBeInTheDocument();
  })

  // Check password render
  const passwordInput = screen.getByTestId("test-password-input");
  expect(passwordInput).toBeInTheDocument();

  // Valid password input
  await user.clear(passwordInput);
  await user.type(passwordInput, 'test password');
  expect(passwordInput).toHaveValue('test password');

  // Check password render
  const passwordConfirmationInput = screen.getByTestId("test-password-confirmation-input");
  expect(passwordConfirmationInput).toBeInTheDocument();

  // Valid password input
  await user.clear(passwordConfirmationInput);
  await user.type(passwordConfirmationInput, 'test password');
  expect(passwordConfirmationInput).toHaveValue('test password');

  // Check reset password button render
  const resetPasswordButton = screen.getByRole("button", { name: /reset password/i, });
  expect(resetPasswordButton).toBeInTheDocument();

  // Get reset password form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("test-reset-password-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate snackbar message render
    const snackbarMessage = screen.getByText("Password updated successfully");
    expect(snackbarMessage).toBeInTheDocument();
  })
});