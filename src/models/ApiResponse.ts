interface ApiResponse {
  statusCode: number;
}

export interface AuthResponse extends ApiResponse {
  token: string;
};

export interface ErrorResponse extends ApiResponse {
  message: string;
};