import { cleanup } from '@testing-library/react';
import { priceFormater } from '../functions';

describe(`functions`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
    window.localStorage.clear();
  });

  describe(`priceFormater`, () => {
    const returnValue = priceFormater(2);
    test(`when the function is called with parameter equal "2", should returned "R$ 2,00"`, () => {
      expect(priceFormater(2)).toBe(returnValue);
    });
  });
});
