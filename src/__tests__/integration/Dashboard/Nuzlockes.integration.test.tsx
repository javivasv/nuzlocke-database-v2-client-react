import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';
import { store } from '../../../store/store';
import IntegrationTestWrapper from '../IntegrationTestWrapper';
import NuzlockesLayout from '../../../containers/NuzlockesLayout';
import NuzlockesContainer from '../../../containers/NuzlockesContainer';
import NuzlockeForm from '../../../components/Nuzlocke/NuzlockeForm';
import NuzlockeContainer from '../../../containers/NuzlockeContainer';
import Nuzlocke from '../../../components/Nuzlocke/Nuzlocke';

const user = userEvent.setup();

test("Navigation from Nuzlockes to Nuzlocke Form", async () => {
  render(
    <IntegrationTestWrapper initialEntries={['/nuzlockes']}>
      <Route path="nuzlockes" element={<NuzlockesLayout isMdAndUp={true} />}>
        <Route index path="" element={<NuzlockesContainer />} />
        <Route path="nuzlocke-form" element={<NuzlockeForm />} />
      </Route>
    </IntegrationTestWrapper>
  );

  // Check new nuzlocke button render
  const newNuzlockeButton = screen.getByRole("button", { name: /new nuzlocke/i, });
  expect(newNuzlockeButton).toBeInTheDocument();

  // Redirect to Nuzlocke Form
  await user.click(newNuzlockeButton);

  // Check create nuzlocke button render
  const createNuzlockeButton = screen.getByRole("button", { name: /create nuzlocke/i, });
  expect(createNuzlockeButton).toBeInTheDocument();
});

test("Navigation from Nuzlockes to Nuzlocke Form", async () => {
  render(
    <IntegrationTestWrapper initialEntries={['/nuzlockes']}>
      <Route path="nuzlockes" element={<NuzlockesLayout isMdAndUp={true} />}>
        <Route index path="" element={<NuzlockesContainer />} />
        <Route path="nuzlocke-form" element={<NuzlockeForm />} />
        <Route path="nuzlocke" element={<NuzlockeContainer />}>
          <Route path=":nuzlockeId" element={<Nuzlocke isMdAndUp={true} />} />
        </Route>
      </Route>
    </IntegrationTestWrapper>
  );

  const testNuzlockes = [{
    _id: '0000',
    name: "test name",
    game: "test game",
    status: "started"
  }];

  // Validate nuzlockes state after setting nuzlockes
  const state = store.getState().nuzlockes;
  expect(state.nuzlockes).toEqual(testNuzlockes);

  const testNuzlocke = screen.getByText("test name");
  expect(testNuzlocke).toBeInTheDocument();

  // Select nuzlocke
  await user.click(testNuzlocke);

  // Check Nuzlocke view render
  expect(screen.getByText("There are no pokemon registered yet"));
  expect(screen.getByText("test name - test game"));
});