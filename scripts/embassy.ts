import { types as T } from "./deps.ts";

export { migration } from "./procedures/migrations.ts";
export { health } from "./procedures/healthChecks.ts";

export const setConfig: T.ExpectedExports.setConfig = async () => {
  return { result: { signal: "SIGTERM" as const, "depends-on": {} } };
};

export const getConfig: T.ExpectedExports.getConfig = async () => {
  return { result: { spec: {}, config: {} } };
};

export const properties: T.ExpectedExports.properties = async () => {
  return { result: { version: 2, data: {} } };
};
