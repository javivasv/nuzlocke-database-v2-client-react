import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMockStore } from '../../../mocks/store';
import UnitTestWrapper from '../UnitTestWrapper';
import MainContent from '../../../components/About/MainContent';
import SecondaryContent from '../../../components/About/SecondaryContent';

// Config for store mock
const state = {
  auth: {
    user: null,
  }
};
const store = createMockStore(state);

test("Main content - First card", () => {
  render(
    <UnitTestWrapper store={store}>
      <MainContent />
    </UnitTestWrapper>
  );

  expect(screen.getByText("About"));
  expect(screen.getByText(/my name is javier vivas/i));
  expect(screen.getByText(/in 2020 I got to know what a nuzlocke is/i));
  expect(screen.getByText(/as i played, i found uncomfortable to keep track of my nuzlockes/i));
  expect(screen.getByText(/this is a side project that i made/i));
  expect(screen.getByRole("link", { name: "Buy Me a Coffee" })).toHaveAttribute("href", "https://www.buymeacoffee.com/javivasv")
});

test("Main content - Second card", () => {
  render(
    <UnitTestWrapper store={store}>
      <MainContent />
    </UnitTestWrapper>
  );

  expect(screen.getByText(/pokemon sprites, pokemon names,/i));
  expect(screen.getByRole("link", { name: "PokeAPI V2" })).toHaveAttribute("href", "https://pokeapi.co/docs/v2")
  expect(screen.getByText(/nuzlocke rules and/i));
  expect(screen.getByRole("link", { name: "Bulbapedia" })).toHaveAttribute("href", "https://bulbapedia.bulbagarden.net/wiki/Main_Page")
  expect(screen.getByText(/login background art/i));
  expect(screen.getByRole("link", { name: "OpenAI" })).toHaveAttribute("href", "https://openai.com/")
});

test("Main content - Third card", () => {
  render(
    <UnitTestWrapper store={store}>
      <MainContent />
    </UnitTestWrapper>
  );

  expect(screen.getByText(/pokémon and its trademarks are the property of/i));
});

test("Secondary content - First card", () => {
  render(
    <UnitTestWrapper store={store}>
      <SecondaryContent isMdAndUp={true} />
    </UnitTestWrapper>
  );

  expect(screen.getByText("Feedback"));
});

test("Secondary content - Second card", () => {
  render(
    <UnitTestWrapper store={store}>
      <SecondaryContent isMdAndUp={true} />
    </UnitTestWrapper>
  );

  expect(screen.getByText("Contact"));
  expect(screen.getByRole("link", { name: "Personal website" })).toHaveAttribute("href", "https://javivasv.com/")
  expect(screen.getByRole("link", { name: "Buy Me a Coffee" })).toHaveAttribute("href", "https://www.buymeacoffee.com/javivasv")
  expect(screen.getByRole("link", { name: "Github" })).toHaveAttribute("href", "https://github.com/javivasv")
  expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", "https://www.linkedin.com/in/javier-vivas-veliz/")
});