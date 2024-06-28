import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMockStore } from '../../../mocks/store';
import UnitTestWrapper from '../UnitTestWrapper';
import MainContent from '../../../components/Home/MainContent';
import SecondaryContent from '../../../components/Home/SecondaryContent';

// Config for store mock
const state = {
  videos: {
    videos: [
      {
        _id: "65a5b792c9219bac6084f762",
        channel: "JaidenAnimations",
        name: "I Attempted a Two Player Nuzlocke",
        url: "HePvLYiZVko?si=nmE_MAcncFJxyjkV",
      }
    ],
  },
};

const store = createMockStore(state);

test("Main content - First card", () => {
  render(
    <UnitTestWrapper store={store}>
      <MainContent />
    </UnitTestWrapper>
  );

  expect(screen.getByText("Welcome to the Nuzlocke DataBase!"));
  expect(screen.getByText(/here you can keep track/i));
  expect(screen.getByText("What is a nuzlocke?"));
  expect(screen.getByText(/a nuzlocke is a set of rules/i));
});

test("Main content - Second card", () => {
  render(
    <UnitTestWrapper store={store}>
      <MainContent />
    </UnitTestWrapper>
  );

  expect(screen.getByText("Relevant Nuzlocke Videos"));

  const iframes = screen.getAllByTitle("I Attempted a Two Player Nuzlocke");
  expect(iframes.length).toBe(1);
});

test("Second content - First card", () => {
  render(
    <UnitTestWrapper store={store}>
      <SecondaryContent isMdAndUp={true} />
    </UnitTestWrapper>
  );

  expect(screen.getByText("Nuzlocke Basic Rules"));
  expect(screen.getByText(/any pokémon that faints is considered dead/i));
  expect(screen.getByText(/the player may only catch the first wild/i));
});

test("Second content - Second card", () => {
  render(
    <UnitTestWrapper store={store}>
      <SecondaryContent isMdAndUp={true} />
    </UnitTestWrapper>
  );

  expect(screen.getByText("Commonly accepted extra rules"));
  expect(screen.getByText(/the two basic rules are not in effect/i));
  expect(screen.getByText(/the player must nickname all/i));
  expect(screen.getByText(/the 'first wild Pokémon in each area'/i));
  expect(screen.getByText(/shiny pokémon do not need/i));
  expect(screen.getByText(/if the player has no Pokémon/i));
});