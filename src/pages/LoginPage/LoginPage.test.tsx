import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import '@testing-library/jest-dom';

import LoginPage from './LoginPage';

import { Toaster } from 'react-hot-toast';
import { toastMessages } from '../../constants/constants';

import { login as mockAuthApiLogin } from '../../api/AuthApi';

vi.mock('../../api/AuthApi', () => ({
  login: vi.fn()
}));

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    render(<LoginPage />);
    render(<Toaster />);
  });

  it('renders login page correctly', () => {
    expect(screen.getByText(/Welcome!/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/LOG IN/i)).toBeInTheDocument();
  });

  it('shows credentials required toast if form fields are empty', async () => {
    const button = screen.getByRole('button');
    expect(button).toHaveClass('login-button');

    fireEvent.submit(button);

    await waitFor(() => {
      expect(screen.queryByText(toastMessages.credentialsRequired)).toBeInTheDocument();
    });
  });

  it('shows invalid credentials toast when login API returns 401', async () => {
    (mockAuthApiLogin as vi.Mock).mockResolvedValue({ statusCode: 401 });

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'user@test.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'pw123' } });

    const button = screen.getByRole('button');
    expect(button).toHaveClass('login-button');
    
    fireEvent.submit(button);

    expect(mockAuthApiLogin).toHaveBeenCalledWith('user@test.com', 'pw123');

    await waitFor(() => {
      expect(screen.queryByText(toastMessages.invalidCredentials)).toBeInTheDocument();
    });
  });

  it('stores JWT token in localStorage on successful login', async () => {
    (mockAuthApiLogin as vi.Mock).mockResolvedValue({ statusCode: 200, token: 'mock_jwt_token' });

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: '123' } });

    const button = screen.getByRole('button');
    expect(button).toHaveClass('login-button');

    fireEvent.submit(button);

    await waitFor(() => { expect(localStorage.getItem('jwt')).toBe('mock_jwt_token'); });
  });
});


    // TODO: left to fix tests before commit 
    // msg "add toast messages, add constants, fix tests"