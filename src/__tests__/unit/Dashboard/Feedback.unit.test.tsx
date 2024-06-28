import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMockStore } from '../../../mocks/store';
import UnitTestWrapper from '../UnitTestWrapper';
import Feedback from '../../../components/About/Feedback';

// Config for store mock
const state = {
  auth: {
    user: null,
  }
};
const store = createMockStore(state);

test("Name renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Feedback />
    </UnitTestWrapper>
  );

  expect(screen.getByText("Name"));
  const nameInput = screen.getByTestId("test-name-input");
  expect(nameInput).toBeInTheDocument();
});

test("Suggestions renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Feedback />
    </UnitTestWrapper>
  );

  expect(screen.getByText("Suggestions"));
  const suggestionsInput = screen.getByTestId("test-suggestions-input");
  expect(suggestionsInput).toBeInTheDocument();
});

test("Send button renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Feedback />
    </UnitTestWrapper>
  );

  const sendButton = screen.getByRole("button", { name: /send/i, });
  expect(sendButton).toBeInTheDocument();
});