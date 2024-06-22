import { expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TestWrapper from '../../../TestWrapper';
import ForgotPassword from '../ForgotPassword';

test("Forgot password elements render", () => {
  render(
    <TestWrapper>
      <ForgotPassword />
    </TestWrapper>
  );

  // Check email render
  expect(screen.getByText("Email"));
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Check send email button render
  const sendEmailButton = screen.getByRole("button", { name: /send email/i, });
  expect(sendEmailButton).toBeInTheDocument();

  // Check redirect links render
  expect(screen.getByText("Login"));
  expect(screen.getByText("Home"));
});

test("Submit empty forgot password form", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper>
      <ForgotPassword />
    </TestWrapper>
  );

  // Check email render
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Empty email input
  await user.clear(emailInput);
  expect(emailInput).toHaveValue('');

  // Check send email button render
  const sendEmailButton = screen.getByRole("button", { name: /send email/i, });
  expect(sendEmailButton).toBeInTheDocument();

  // Get forgot password form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("forgot-password-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate required input error messages
    const requiredEmailMessage = screen.getByText('Email is required');
    expect(requiredEmailMessage).toBeInTheDocument();
  })
});

test("Invalid email", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper>
      <ForgotPassword />
    </TestWrapper>
  );

  // Check email render
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Valid email input
  await user.clear(emailInput);
  await user.type(emailInput, 'invalid@test.com');
  expect(emailInput).toHaveValue('invalid@test.com');

  // Check send email button render
  const sendEmailButton = screen.getByRole("button", { name: /send email/i, });
  expect(sendEmailButton).toBeInTheDocument();

  // Get forgot password form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("forgot-password-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate snackbar message render
    const snackbarMessage = screen.getByText("User not found");
    expect(snackbarMessage).toBeInTheDocument();
  })
});

test("Server error", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper>
      <ForgotPassword />
    </TestWrapper>
  );

  // Check email render
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Valid email input
  await user.clear(emailInput);
  await user.type(emailInput, 'server@test.com');
  expect(emailInput).toHaveValue('server@test.com');

  // Check send email button render
  const sendEmailButton = screen.getByRole("button", { name: /send email/i, });
  expect(sendEmailButton).toBeInTheDocument();

  // Get forgot password form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("forgot-password-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate snackbar message render
    const snackbarMessage = screen.getByText("An error occurred sending the reset email");
    expect(snackbarMessage).toBeInTheDocument();
  })
});

test("Successful forgot password", async () => {
  const user = userEvent.setup();

  render(
    <TestWrapper>
      <ForgotPassword />
    </TestWrapper>
  );

  // Check email render
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Valid email input
  await user.clear(emailInput);
  await user.type(emailInput, 'success@test.com');
  expect(emailInput).toHaveValue('success@test.com');

  // Check send email button render
  const sendEmailButton = screen.getByRole("button", { name: /send email/i, });
  expect(sendEmailButton).toBeInTheDocument();

  // Get forgot password form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("forgot-password-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate snackbar message render
    const snackbarMessage = screen.getByText("Reset email sent successfully");
    expect(snackbarMessage).toBeInTheDocument();
  })
});