import { types as T, healthUtil } from "../deps.ts";

export const health: T.ExpectedExports.health = {
  async "api"(effects, duration) {
    return healthUtil.checkWebUrl("http://localhost:9997/v3/paths/list")(effects, duration);
  },
};
