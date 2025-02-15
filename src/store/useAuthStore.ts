import { create } from 'zustand';

import { login } from '../../src/api/AuthApi';
import { AuthResponse, ErrorResponse } from '../../src/models/ApiResponse';

import { toast } from 'react-hot-toast';
import { toastMessages } from '../constants/constants';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
  setState: (updates: Partial<AuthState>) => void;
  login: (email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: !!localStorage.getItem('jwt'),
  token: localStorage.getItem('jwt'),
  loading: false,
  error: null,
  setState: (updates) => set((state) => ({ ...state, ...updates })),
  login: async (email, password) => {
    try {
      const authResponse = await login(email, password);

      if ((authResponse as ErrorResponse).statusCode === 401) {
        toast.error(toastMessages.invalidCredentials)
        set({ error: (authResponse as ErrorResponse).message, loading: false });
        return;
      }

      const token = (authResponse as AuthResponse).token;
      localStorage.setItem('jwt', token);

      toast.success(toastMessages.loggedIn);
      set({ isAuthenticated: true, token, loading: false });
    } catch (err) {
      toast.error(toastMessages.somethingWentWrong);
    }
    finally {
      set({ loading: false });
    }
  },
}));
