import { AuthResponse, ErrorResponse } from "../../models/ApiResponse";

import * as data from './data';

interface IDatabase {
  login(email: string, password: string): Promise<AuthResponse | ErrorResponse>;
}

// Backend simulation
class Database implements IDatabase {

  constructor() {}

  async login(email: string, password: string): Promise<AuthResponse | ErrorResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        
        if (!this._verifyUserCredentials(email, password)) {
          resolve(data.AUTH_INVALID_CREDENTIALS);
        }

        // server error 500 that will never trigger 
        // eslint-disable-next-line no-constant-condition
        if (false) {
          reject(data.SERVER_ERROR);
        }

        resolve(data.AUTH_SUCCESS);
      }, 2000)
    })
  }

  private _verifyUserCredentials(email: string, password: string): boolean {
    return (email === 'test' && password === '123');
  }
}

// export as Singleton
export default new Database();