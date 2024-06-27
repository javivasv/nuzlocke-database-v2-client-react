import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMockStore } from '../../../mocks/store';
import UnitTestWrapper from '../UnitTestWrapper';
import ForgotPassword from '../../../components/Auth/ForgotPassword';

// Config for store mock
const state = {};
const store = createMockStore(state);

test("Email renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <ForgotPassword />
    </UnitTestWrapper>
  );

  expect(screen.getByText("Email"));
  const emailInput = screen.getByTestId("test-email-input");
  expect(emailInput).toBeInTheDocument();
});

test("Send email button renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <ForgotPassword />
    </UnitTestWrapper>
  );

  const sendEmailButton = screen.getByRole("button", { name: /send email/i, });
  expect(sendEmailButton).toBeInTheDocument();
});

test("Links renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <ForgotPassword />
    </UnitTestWrapper>
  );

  expect(screen.getByText("Login"));
  expect(screen.getByText("Home"));
});