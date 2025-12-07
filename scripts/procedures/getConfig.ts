import { compat, types as T } from "../deps.ts";

export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
  "camera-url": {
    "type": "string",
    "name": "Camera RTSP URL",
    "description": "The RTSP URL of your Lorex DVR camera. Example: rtsp://admin:password@192.168.1.100:554/cam/realmonitor?channel=1&subtype=1",
    "nullable": true,
    "masked": true,
    "copyable": true,
  },
  "stream-name": {
    "type": "string",
    "name": "Stream Name",
    "description": "A short name for your stream (no spaces). This will be the URL path.",
    "nullable": false,
    "default": "camera1",
    "pattern": "^[a-zA-Z0-9_-]+$",
    "pattern-description": "Only letters, numbers, underscores, and hyphens allowed",
  },
});
