import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AsyncButton from './AsyncButton';
import { useAuthStore } from '../../store/useAuthStore';
import '@testing-library/jest-dom';

vi.mock('../../store/useAuthStore', () => ({
  useAuthStore: vi.fn(),
}));

describe('AsyncButton', () => {
  it('disables the button when loading', async () => {
    const mockSetLoading = vi.fn();
    (useAuthStore as vi.Mock).mockReturnValue({
      loading: true,
      setLoading: mockSetLoading,
    });

    render(<AsyncButton>LOG IN</AsyncButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('disabled');
  });
});