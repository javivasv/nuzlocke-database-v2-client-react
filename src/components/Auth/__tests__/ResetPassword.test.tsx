import { expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import TestWrapper from '../../../TestWrapper';
import ResetPassword from '../ResetPassword';

test("Reset password elements render", () => {
  render(
    <TestWrapper initialEntries={['/reset-password/valid-token']}>
      <Route path="reset-password/:resetToken" element={<ResetPassword />} />
    </TestWrapper>
  );

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