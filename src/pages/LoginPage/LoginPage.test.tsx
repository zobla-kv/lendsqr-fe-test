import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import LoginPage from './LoginPage';
import { login as mockLogin } from '../../api/AuthApi';
import { AuthResponse } from '../../models/ApiResponse';
import '@testing-library/jest-dom';

vi.mock('../../api/AuthApi', () => ({
  login: vi.fn(),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renders login page correctly', () => {
    render(<LoginPage />);
    expect(screen.getByText(/Welcome!/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/LOG IN/i)).toBeInTheDocument();
  });

  // TODO: enable after implementing toast
  // it('shows validation error if fields are empty', async () => {
  //   render(<LoginPage />);

  //   fireEvent.submit(screen.getByRole('button', { name: /LOG IN/i }));

  //   // Check if validation message appears
  //   expect(screen.getByText(/validation failed/i)).toBeInTheDocument();
  // });

  it('calls login API on form submission', async () => {
    const mockResponse: AuthResponse = { statusCode: 200, token: 'mock_jwt_token' };
    (mockLogin as vi.Mock).mockResolvedValueOnce(mockResponse);

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'user@test.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'pw123' } });

    const button = screen.getByRole('button');
    expect(button).toHaveClass('login-button');

    fireEvent.submit(button);

    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith('user@test.com', 'pw123'));
  });

  // TODO: enable after implementing toast
  // it('shows error when login API returns 401', async () => {
  //   (mockLogin as vi.Mock).mockResolvedValueOnce({ statusCode: 401 });

  //   render(<LoginPage />);

  //   fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'invalid@example.com' } });
  //   fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'wrongpass' } });

  //   fireEvent.submit(screen.getByRole('button', { name: /LOG IN/i }));

  //   await waitFor(() => expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument());
  // });

  it('stores JWT token in localStorage on successful login', async () => {
    const mockResponse: AuthResponse = { statusCode: 200, token: 'mock_jwt_token' };
    (mockLogin as vi.Mock).mockResolvedValueOnce(mockResponse);

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'user@test.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'pw123' } });

    const button = screen.getByRole('button');
    expect(button).toHaveClass('login-button');

    fireEvent.submit(button);

    await waitFor(() => { expect(localStorage.getItem('jwt')).toBe('mock_jwt_token'); });
  });

  it('disables the login button when loading', async () => {
    (mockLogin as vi.Mock).mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve({ statusCode: 200, token: 'mockjwt_token' }), 2000)));

    render(<LoginPage />);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });

    const button = screen.getByRole('button');
    expect(button).toHaveClass('login-button');

    fireEvent.submit(button);

    expect(button).toHaveClass('disabled');
  });
});