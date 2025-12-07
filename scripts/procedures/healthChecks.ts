import { types as T, healthUtil } from "../deps.ts";

export const health: T.ExpectedExports.health = {
  async "api"(effects, duration) {
    return healthUtil.checkWebUrl("http://feedview-relay.embassy:9997")(effects, duration).catch(healthUtil.catchError(effects))
  },
};
