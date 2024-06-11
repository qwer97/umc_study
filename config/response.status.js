import { StatusCodes } from "http-status-codes";

export const status = {
    // success
    OK: { status: 200, isSuccess: true, code: 2000, message: 'Success' },

    // error
    NOT_FOUND: { status: 404, isSuccess: false, code: 4040, message: 'Not found' },
    INTERNAL_SERVER_ERROR: { status: 500, isSuccess: false, code: 5000, message: 'Internal server error' }
};
