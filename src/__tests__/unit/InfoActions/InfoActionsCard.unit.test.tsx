import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMockStore } from '../../../mocks/store';
import UnitTestWrapper from '../UnitTestWrapper';
import InfoActionsCard from '../../../components/InfoActions/InfoActionsCard';

// Config for store mock
const state = {};
const store = createMockStore(state);

// Used empty div as a mock for children prop
test("Email renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <InfoActionsCard>
        <div></div>
      </InfoActionsCard>
    </UnitTestWrapper>
  );

  const pokeballImage = screen.getByRole('img', { name: /pokeball/i });
  expect(pokeballImage).toBeInTheDocument();
  expect(pokeballImage).toHaveAttribute('src', expect.stringContaining('pokeball.png'));
  expect(pokeballImage).toHaveAttribute('id', 'pokeball');
});