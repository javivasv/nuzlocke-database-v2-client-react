import { expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import { store } from '../../../store/store';
import { AuthState } from '../../../store/auth/authSlice';
import IntegrationTestWrapper from '../IntegrationTestWrapper';
import Dashboard from '../../../containers/Dashboard';
import About from '../../../containers/About';

// Config for ToggleTheme mock
const mockToggleTheme = vi.fn();

const user = userEvent.setup();

test("Submit - Server error", async () => {
  render(
    <IntegrationTestWrapper initialEntries={['/about']}>
      <Route element={<Dashboard ToggleTheme={mockToggleTheme} />}>
        <Route path="about" element={<About isMdAndUp={true} />} />
      </Route>
    </IntegrationTestWrapper>
  );

  // Check name render
  const nameInput = screen.getByTestId("test-name-input");
  expect(nameInput).toBeInTheDocument();

  // Valid name input
  await user.clear(nameInput);
  await user.type(nameInput, 'server');
  expect(nameInput).toHaveValue('server');

  // Check suggestions render
  const suggestionsInput = screen.getByTestId("test-suggestions-input");
  expect(suggestionsInput).toBeInTheDocument();

  // Valid suggestions input
  await user.clear(suggestionsInput);
  await user.type(suggestionsInput, 'suggestions');
  expect(suggestionsInput).toHaveValue('suggestions');

  // Check send button render
  const sendButton = screen.getByRole("button", { name: /send/i, });
  expect(sendButton).toBeInTheDocument();

  // Validate auth initial state
  const initialState = store.getState() as { auth: AuthState };
  expect(initialState.auth.user).toEqual(null);

  // Get feedback form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("test-feedback-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate snackbar message render
    const snackbarMessage = screen.getByText("An error occurred sending the suggestion");
    expect(snackbarMessage).toBeInTheDocument();
  })
});

test("Submit - Successful", async () => {
  render(
    <IntegrationTestWrapper initialEntries={['/about']}>
      <Route element={<Dashboard ToggleTheme={mockToggleTheme} />}>
        <Route path="about" element={<About isMdAndUp={true} />} />
      </Route>
    </IntegrationTestWrapper>
  );

  // Check name render
  const nameInput = screen.getByTestId("test-name-input");
  expect(nameInput).toBeInTheDocument();

  // Valid name input
  await user.clear(nameInput);
  await user.type(nameInput, 'success');
  expect(nameInput).toHaveValue('success');

  // Check suggestions render
  const suggestionsInput = screen.getByTestId("test-suggestions-input");
  expect(suggestionsInput).toBeInTheDocument();

  // Valid suggestions input
  await user.clear(suggestionsInput);
  await user.type(suggestionsInput, 'suggestions');
  expect(suggestionsInput).toHaveValue('suggestions');

  // Check send button render
  const sendButton = screen.getByRole("button", { name: /send/i, });
  expect(sendButton).toBeInTheDocument();

  // Validate auth initial state
  const initialState = store.getState() as { auth: AuthState };
  expect(initialState.auth.user).toEqual(null);

  // Get feedback form to submit - Using fireEvent because userEvent does not have submit
  const form = screen.getByTestId("test-feedback-form");
  fireEvent.submit(form);

  await waitFor(() => {
    // Validate snackbar message render
    const snackbarMessage = screen.getByText("Suggestion sent successfully");
    expect(snackbarMessage).toBeInTheDocument();
  })
});