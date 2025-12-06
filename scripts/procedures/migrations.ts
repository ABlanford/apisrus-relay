// FeedView Relay - Migration Scripts
// Handle upgrades between versions

import { types as T, compat } from "../deps.ts";

export const migration: T.ExpectedExports.migration = compat.migrations({
  // No migrations needed for initial version
});
