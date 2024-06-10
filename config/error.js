
// c:\umc_study\config\error.js
export class BaseError extends Error {
  constructor({ isSuccess = false, status = 500, message = 'Internal server error' } = {}) {
      super(message);
      this.data = { isSuccess, status, message };
  }
}
