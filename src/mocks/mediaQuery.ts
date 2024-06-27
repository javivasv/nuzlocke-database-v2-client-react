import { vi } from 'vitest';

// Sets the screen size depending on the mediaQuery parameter
// for responsive testing
export const configMediaQuery = (mediaQuery: string) => {
  return vi.fn().mockImplementation(query => ({
    matches: query === mediaQuery,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn()
  }))
}