import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestWrapper from '../../../TestWrapper';
import Register from '../Register';

describe('Register', () => {
  it('Register render', () => {
    render(
      <TestWrapper>
        <Register />
      </TestWrapper>
    );

    expect(screen.getByText('Email'));
    expect(screen.getByText('Username'));
    expect(screen.getByText('Password'));
    expect(screen.getByText('Password confirmation'));
    expect(screen.getByText('Register'));
    expect(screen.getByText(`Already have an account?`));
    expect(screen.getByText('Login'));
    expect(screen.getByText('Home'));
  });
})