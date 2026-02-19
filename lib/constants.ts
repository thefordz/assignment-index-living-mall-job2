export const API_KEY = process.env.API_KEY as string;

export const LIMIT_REQUEST_CONFIG = {
  GET: 20,
  POST: 5,
  PUT: 5,
  DELETE: 5,
};
export const DEFAULT_LIMIT_REQUEST = 5;
export const LIMIT_TIME = 60 * 1000;
