import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import { server } from './src/mocks/server';

beforeAll(() => {
  server.listen()
});

afterEach(() => {
  server.resetHandlers()
  cleanup()
});

afterAll(() => {
  server.close()
});
