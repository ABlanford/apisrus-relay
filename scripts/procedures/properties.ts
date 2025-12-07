import { compat, types as T } from "../deps.ts";

export const properties: T.ExpectedExports.properties = async (effects) => {
  let streamName = "camera1";
  let hasCamera = false;

  try {
    const configStr = await effects.readFile({ path: "/data/config.json", volumeId: "main" });
    const config = JSON.parse(configStr);
    streamName = config.streamName || "camera1";
    hasCamera = !!config.cameraUrl;
  } catch {
    // Config not yet created
  }

  return {
    type: "object",
    value: {
      "HLS Stream URL": {
        type: "string",
        value: hasCamera ? `https://[your-start9-address]/${streamName}/` : "No camera configured",
        description: "Access your camera stream at this URL",
        copyable: true,
        qr: false,
        masked: false,
      },
      "Status": {
        type: "string", 
        value: hasCamera ? "Camera configured - stream active on demand" : "Add your camera RTSP URL in Config",
        description: "Current relay status",
        copyable: false,
        qr: false,
        masked: false,
      },
    },
  };
};
