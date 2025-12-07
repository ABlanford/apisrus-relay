import { types as T, checkPortListening } from "../deps.ts";

export const health: T.ExpectedExports.health = {
  async "api"(effects, duration) {
    return checkPortListening(effects, 9997, {
      successMessage: "MediaMTX API is accessible",
      errorMessage: "MediaMTX API is not responding",
    });
  },
};
