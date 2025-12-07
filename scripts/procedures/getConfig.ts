import { compat, types as T } from "../deps.ts";

export const setConfig: T.ExpectedExports.setConfig = compat.setConfig(async (effects, config) => {
  const cameraUrl = config["camera-url"] as string | null;
  const streamName = config["stream-name"] as string;

  let pathsConfig = `
paths:
  all:
`;

  if (cameraUrl) {
    pathsConfig += `
  ${streamName}:
    source: "${cameraUrl}"
    sourceOnDemand: yes
`;
  }

  const mediamtxConfig = `
logLevel: info
logDestinations: [stdout]

api: yes
apiAddress: :9997

rtsp: yes
rtspAddress: :8554

hls: yes
hlsAddress: :8888
hlsAlwaysRemux: yes
hlsAllowOrigins: ["*"]

${pathsConfig}
`;

  await effects.writeFile({
    path: "/data/mediamtx.yml",
    toWrite: mediamtxConfig,
    volumeId: "main",
  });

  await effects.writeFile({
    path: "/data/config.json",
    toWrite: JSON.stringify({ cameraUrl: cameraUrl ? "configured" : null, streamName }),
    volumeId: "main",
  });

  return { signal: "SIGTERM" as const, "depends-on": {} };
});
