import { AuthResponse, ErrorResponse } from '../models/ApiResponse';

import database from '../lib/database/Database';

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse | ErrorResponse> => {
    return database.login(email, password);
};