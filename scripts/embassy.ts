import { types as T, compat, util } from "./deps.ts";

export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
  "rtsp-url": {
    type: "string",
    name: "RTSP Camera URL",
    description: "The RTSP URL of your camera (e.g., rtsp://admin:password@192.168.1.100:554/cam/realmonitor?channel=1&subtype=0)",
    nullable: false,
    default: "rtsp://admin:password@192.168.1.100:554/cam/realmonitor?channel=1&subtype=0",
  },
  "stream-name": {
    type: "string",
    name: "Stream Name",
    description: "Name for this camera stream (used in the HLS URL path)",
    nullable: false,
    default: "cam1",
    pattern: "^[a-zA-Z0-9_-]+$",
    "pattern-description": "Must contain only letters, numbers, underscores, and hyphens",
  },
});

export const setConfig: T.ExpectedExports.setConfig = async (effects, config) => {
  const rtspUrl = config["rtsp-url"];
  const streamName = config["stream-name"];
  
  // Write config file for MediaMTX
  const mediamtxConfig = `
paths:
  ${streamName}:
    source: ${rtspUrl}
    sourceOnDemand: yes
`;
  
  await effects.writeFile({
    volumeId: "main",
    path: "mediamtx-paths.yml",
    toWrite: mediamtxConfig,
  });
  
  return { signal: "SIGTERM", "depends-on": {} };
};

export const properties: T.ExpectedExports.properties = async (effects) => {
  return {
    type: "object",
    value: {
      "HLS Stream URL": {
        type: "string",
        value: "http://<your-start9-address>:8888/<stream-name>/stream.m3u8",
        description: "Use this URL in FeedView to access your camera",
        copyable: true,
        masked: false,
        qr: false,
      },
      "API URL": {
        type: "string", 
        value: "http://<your-start9-address>:9997/v3/paths/list",
        description: "MediaMTX API for listing available streams",
        copyable: true,
        masked: false,
        qr: false,
      },
    },
  };
};

export const health: T.ExpectedExports.health = {
  api: async (effects, duration) => {
    try {
      const result = await util.checkPortListening(effects, 9997, {
        successMessage: "MediaMTX API is accessible",
        errorMessage: "MediaMTX API is not responding",
      });
      return result;
    } catch (e) {
      return {
        status: "starting",
        message: "Waiting for MediaMTX to start...",
      };
    }
  },
};

export const migration: T.ExpectedExports.migration = compat.migrations
  .fromMapping({}, "0.3.5.0")
  .build();
