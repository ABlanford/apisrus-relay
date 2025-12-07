import { types as T } from "../deps.ts";

export const setConfig: T.ExpectedExports.setConfig = async (
  _effects: T.Effects,
  input: T.Config,
) => {
  return {
    result: {
      signal: "SIGTERM" as const,
      "depends-on": {},
    },
  };
};
