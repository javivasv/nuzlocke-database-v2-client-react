import { expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import TestWrapper from '../IntegrationTestWrapper';
import Auth from '../../../containers/Auth';
import ForgotPassword from '../../../components/Auth/ForgotPassword';

const user = userEvent.setup();

test("Submit - Empty form", async () => {
  render(
    <TestWrapper initialEntries={['/forgot-password']}>
      <Route element={<Auth />}>
        <Route path="forgot-password" element={<ForgotPassword />}></Route>
      </Route>
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
  const form = screen.getByTestId("test-forgot-password-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate required input error messages
    const requiredEmailMessage = screen.getByText('Email is required');
    expect(requiredEmailMessage).toBeInTheDocument();
  })
});

test("Submit - Inexistent email", async () => {
  render(
    <TestWrapper initialEntries={['/forgot-password']}>
      <Route element={<Auth />}>
        <Route path="forgot-password" element={<ForgotPassword />}></Route>
      </Route>
    </TestWrapper>
  );

  // Check email render
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();

  // Valid email input
  await user.clear(emailInput);
  await user.type(emailInput, 'inexistent@test.com');
  expect(emailInput).toHaveValue('inexistent@test.com');

  // Check send email button render
  const sendEmailButton = screen.getByRole("button", { name: /send email/i, });
  expect(sendEmailButton).toBeInTheDocument();

  // Get forgot password form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("test-forgot-password-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate snackbar message render
    const snackbarMessage = screen.getByText("User not found");
    expect(snackbarMessage).toBeInTheDocument();
  })
});

test("Submit - Server error", async () => {
  render(
    <TestWrapper initialEntries={['/forgot-password']}>
      <Route element={<Auth />}>
        <Route path="forgot-password" element={<ForgotPassword />}></Route>
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

  // Check send email button render
  const sendEmailButton = screen.getByRole("button", { name: /send email/i, });
  expect(sendEmailButton).toBeInTheDocument();

  // Get forgot password form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("test-forgot-password-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate snackbar message render
    const snackbarMessage = screen.getByText("An error occurred sending the reset email");
    expect(snackbarMessage).toBeInTheDocument();
  })
});

test("Submit - Successful", async () => {
  render(
    <TestWrapper initialEntries={['/forgot-password']}>
      <Route element={<Auth />}>
        <Route path="forgot-password" element={<ForgotPassword />}></Route>
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

  // Check send email button render
  const sendEmailButton = screen.getByRole("button", { name: /send email/i, });
  expect(sendEmailButton).toBeInTheDocument();

  // Get forgot password form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("test-forgot-password-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate snackbar message render
    const snackbarMessage = screen.getByText("Reset email sent successfully");
    expect(snackbarMessage).toBeInTheDocument();
  })
});