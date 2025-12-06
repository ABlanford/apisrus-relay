// FeedView Relay - Get Configuration Script
// Returns current configuration for StartOS UI

import { types as T, compat } from "../deps.ts";

export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
  "cameras": {
    "type": "list",
    "name": "Camera Streams",
    "description": "Configure your RTSP camera streams to convert to HLS",
    "range": "[0,10]",
    "default": [],
    "subtype": "object",
    "spec": {
      "id": {
        "type": "string",
        "name": "Camera ID",
        "description": "Unique identifier for this camera (lowercase, no spaces)",
        "nullable": false,
        "pattern": "^[a-z0-9-]+$",
        "pattern-description": "Must be lowercase letters, numbers, and hyphens only"
      },
      "name": {
        "type": "string",
        "name": "Display Name",
        "description": "Human-readable name for this camera",
        "nullable": false
      },
      "rtsp_url": {
        "type": "string",
        "name": "RTSP URL",
        "description": "Full RTSP URL including credentials (e.g., rtsp://admin:password@192.168.1.100:554/...)",
        "nullable": false,
        "masked": true
      },
      "enabled": {
        "type": "boolean",
        "name": "Enabled",
        "description": "Enable or disable this camera stream",
        "default": true
      }
    }
  },
  "demo_stream": {
    "type": "boolean",
    "name": "Enable Demo Stream",
    "description": "Include a demo stream (Big Buck Bunny) for testing",
    "default": true
  }
});
