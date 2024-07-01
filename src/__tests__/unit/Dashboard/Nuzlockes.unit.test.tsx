import { expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMockStore } from '../../../mocks/store';
import UnitTestWrapper from '../UnitTestWrapper';
import NuzlockesTable from '../../../components/Nuzlockes/NuzlockesTable';
import TableHeaders from '../../../components/TableHeaders';
import NuzlockeRow from '../../../components/Nuzlockes/NuzlockeRow';

// Config for store mock
const state = {
  nuzlockes: {
    nuzlockes: [],
    nuzlocke: null,
  }
};

const store = createMockStore(state);

test("Search renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <NuzlockesTable />
    </UnitTestWrapper>
  );

  const searchIcon = screen.getByTestId('test-nuzlockes-search-icon');
  expect(searchIcon).toBeInTheDocument()
  expect(screen.getByPlaceholderText("Search"));
});

test("No nuzlockes message renderization", () => {
  render(
    <UnitTestWrapper store={store}>
      <NuzlockesTable />
    </UnitTestWrapper>
  );

  expect(screen.getByText("There are no nuzlockes registered yet"));
});

test("Nuzlockes table headers renderization", () => {
  const headers = [
    {
      name: "name",
      text: "Name",
      cols: 6,
    },
    {
      name: "game",
      text: "Game",
      cols: 3,
    },
    {
      name: "status",
      text: "Status",
      cols: 3,
    },
  ]

  render(
    <UnitTestWrapper store={store}>
      <TableHeaders headers={headers} />
    </UnitTestWrapper>
  );

  expect(screen.getByText("Name"));
  expect(screen.getByText("Game"));
  expect(screen.getByText("Status"));
});

test("Nuzlockes table row renderization - Started", () => {
  const nuzlocke = {
    _id: "0000",
    name: "test name",
    game: "test game",
    description: "",
    status: "started",
    user: "",
    pokemon: [],
  }

  render(
    <UnitTestWrapper store={store}>
      <NuzlockeRow nuzlocke={nuzlocke} />
    </UnitTestWrapper>
  );

  expect(screen.getByText("test name"));
  expect(screen.getByText("test game"));

  const startedIcon = screen.getByTestId('test-nuzlockes-started-icon');
  expect(startedIcon).toBeInTheDocument()
});

test("Nuzlockes table row renderization - Completed", () => {
  const nuzlocke = {
    _id: "0000",
    name: "test name",
    game: "test game",
    description: "",
    status: "completed",
    user: "",
    pokemon: [],
  }

  render(
    <UnitTestWrapper store={store}>
      <NuzlockeRow nuzlocke={nuzlocke} />
    </UnitTestWrapper>
  );

  expect(screen.getByText("test name"));
  expect(screen.getByText("test game"));

  const startedIcon = screen.getByTestId('test-nuzlockes-completed-icon');
  expect(startedIcon).toBeInTheDocument()
});

test("Nuzlockes table row renderization - Lost", () => {
  const nuzlocke = {
    _id: "0000",
    name: "test name",
    game: "test game",
    description: "",
    status: "lost",
    user: "",
    pokemon: [],
  }

  render(
    <UnitTestWrapper store={store}>
      <NuzlockeRow nuzlocke={nuzlocke} />
    </UnitTestWrapper>
  );

  expect(screen.getByText("test name"));
  expect(screen.getByText("test game"));

  const startedIcon = screen.getByTestId('test-nuzlockes-lost-icon');
  expect(startedIcon).toBeInTheDocument()
});