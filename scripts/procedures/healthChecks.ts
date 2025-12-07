import { types as T, compat } from "../deps.ts";

export const health: T.ExpectedExports.health = {
  async "api"(effects, duration) {
    return compat.checkPortListening(effects, 9997, {
      successMessage: "MediaMTX API is accessible",
      errorMessage: "MediaMTX API is not responding",
    });
  },
};
