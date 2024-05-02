import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestWrapper from '../../../TestWrapper';
import Login from '../Login';

describe('Login', () => {
  it('Login render', () => {
    render(
      <TestWrapper>
        <Login />
      </TestWrapper>
    );

    expect(screen.getByText('Email'));
    expect(screen.getByText('Password'));
    expect(screen.getByText('Login'));
    expect(screen.getByText('Forgot password'));
    expect(screen.getByText(`Don't have an account?`));
    expect(screen.getByText('Register'));
    expect(screen.getByText('Home'));
  });
})