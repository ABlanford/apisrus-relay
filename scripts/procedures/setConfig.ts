import { types as T } from "../deps.ts";

export const setConfig: T.ExpectedExports.setConfig = async (
  _effects: T.Effects,
  _input: T.Config,
) => {
  return {
    result: {
      signal: "SIGTERM",
      "depends-on": {},
    },
  };
};
