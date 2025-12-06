// FeedView Relay - Properties Script
// Returns runtime properties for StartOS UI

import { types as T, compat } from "../deps.ts";

export const properties: T.ExpectedExports.properties = async (effects) => {
  // Read the current config to show stream URLs
  let configContent = "";
  try {
    configContent = await effects.readFile({
      volumeId: "main",
      path: "config.yaml"
    });
  } catch {
    configContent = "";
  }

  // Parse camera IDs from config (simplified)
  const cameraMatches = configContent.match(/^\s{2}(\w+):/gm) || [];
  const cameraIds = cameraMatches
    .map(m => m.trim().replace(":", ""))
    .filter(id => id !== "cameras");

  // Build properties object
  const properties: Record<string, { type: string; value: string; description: string; copyable: boolean; qr: boolean; masked: boolean }> = {};

  properties["Stream Base URL"] = {
    type: "string",
    value: "https://[your-start9-address]:443/",
    description: "Base URL for all HLS streams",
    copyable: true,
    qr: false,
    masked: false
  };

  for (const cameraId of cameraIds) {
    properties[`Stream: ${cameraId}`] = {
      type: "string",
      value: `/${cameraId}`,
      description: `HLS stream path for ${cameraId}`,
      copyable: true,
      qr: true,
      masked: false
    };
  }

  return {
    version: 2,
    data: properties
  };
};
