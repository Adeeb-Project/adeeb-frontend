export const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = mockLocalStorage;

global.fetch = jest.fn();
