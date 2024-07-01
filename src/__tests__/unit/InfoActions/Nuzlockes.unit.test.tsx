import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMockStore } from '../../../mocks/store';
import UnitTestWrapper from '../UnitTestWrapper';
import Nuzlockes from '../../../components/InfoActions/Nuzlockes';

// Config for store mock
const state = {};
const store = createMockStore(state);

test("New nuzlocke button renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Nuzlockes />
    </UnitTestWrapper>
  );

  const newNuzlockeButton = screen.getByRole("button", { name: /new nuzlocke/i, });
  expect(newNuzlockeButton).toBeInTheDocument();
});

test("Links renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <Nuzlockes />
    </UnitTestWrapper>
  );

  expect(screen.getByText("Relevant websites"));
  expect(screen.getByRole("link", { name: "Bulbapedia" })).toHaveAttribute("href", "https://bulbapedia.bulbagarden.net/wiki/Main_Page")
  expect(screen.getByRole("link", { name: "Pokemon Showdown Damage Calculator" })).toHaveAttribute("href", "https://calc.pokemonshowdown.com")
  expect(screen.getByRole("link", { name: "Serebii" })).toHaveAttribute("href", "https://www.serebii.net/index2.shtml")
});