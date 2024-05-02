import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestWrapper from '../../../TestWrapper';
import ResetPassword from '../ResetPassword';

describe('ResetPassword', () => {
  it('ResetPassword render', () => {
    render(
      <TestWrapper>
        <ResetPassword />
      </TestWrapper>
    );

    expect(screen.getByText('Password'));
    expect(screen.getByText('Password confirmation'));
    expect(screen.getByText('Reset password'));
    expect(screen.getByText('Login'));
    expect(screen.getByText('Home'));
  });
})