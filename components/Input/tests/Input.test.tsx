import { cleanup, render, screen } from '@testing-library/react';
import Input from '..';

describe(`Test render Input`, () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  const mockProps = {
    type: `text`,
    name: `mockName`,
    value: `mockValue`,
    placeholder: `mockPlaceholder`,
    onChange: jest.fn(),
  };

  describe(`when the component is called and the prop type`, () => {
    test(`is different to "checkbox", should return an input element with testId equal to "inputs-different-than-checkbox"`, () => {
      render(<Input {...mockProps} />);

      expect(
        screen.getByTestId(`inputs-different-than-checkbox`),
      ).toBeInTheDocument();
    });

    test(`is different to "checkbox", shouldn't return an input element with testId equal to "input-checkbox"`, () => {
      render(<Input {...mockProps} />);

      expect(screen.queryByTestId(`input-checkbox`)).not.toBeInTheDocument();
    });

    test(`is equal to "checkbox", should return an input element with testId equal to "input-checkbox"`, () => {
      const modifiedMockProps = {
        ...mockProps,
        type: `checkbox`,
      };

      render(<Input {...modifiedMockProps} />);

      expect(screen.getByTestId(`input-checkbox`)).toBeInTheDocument();
    });

    test(`is equal to "checkbox", shouldn't return an input element with testId equal to "inputs-different-than-checkbox"`, () => {
      const modifiedMockProps = {
        ...mockProps,
        type: `checkbox`,
      };

      render(<Input {...modifiedMockProps} />);

      expect(
        screen.queryByTestId(`inputs-different-than-checkbox`),
      ).not.toBeInTheDocument();
    });
  });
});
