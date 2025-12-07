import { compat, types as T } from "../deps.ts";

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
