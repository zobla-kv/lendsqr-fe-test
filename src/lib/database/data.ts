import { AuthResponse, ErrorResponse } from "../../models/ApiResponse";

const JWT = 'jsonwebtoken123';

export const MESSAGES = {
  SOMETHING_WENT_WRONG: 'Something went wrong. Please try again.'
}

export const SERVER_ERROR: ErrorResponse = {
  statusCode: 500,
  message: MESSAGES.SOMETHING_WENT_WRONG
}

export const AUTH_SUCCESS: AuthResponse = {
  statusCode: 200,
  token: JWT
}

export const AUTH_INVALID_CREDENTIALS: ErrorResponse = {
  statusCode: 401,
  // not writing 'email' or 'password' in response message for better security
  message: 'Invalid credentials'
}

