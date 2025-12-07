#!/bin/sh
set -e

MEDIAMTX_CONFIG="/data/mediamtx.yml"

# Parse camera URL and stream name
CAMERA_URL=""
STREAM_NAME="camera1"

# Try StartOS config first
if [ -f "/root/start9/config.yaml" ]; then
  CAMERA_URL=$(grep "camera-url:" "/root/start9/config.yaml" 2>/dev/null | sed 's/.*camera-url: *//' | tr -d '"' | tr -d "'" || echo "")
  STREAM_NAME=$(grep "stream-name:" "/root/start9/config.yaml" 2>/dev/null | sed 's/.*stream-name: *//' | tr -d '"' | tr -d "'" || echo "camera1")
fi

# Fallback to manual config file
if [ -z "$CAMERA_URL" ] && [ -f "/data/camera.conf" ]; then
  . /data/camera.conf
fi

# Generate MediaMTX config
cat > "$MEDIAMTX_CONFIG" << EOF
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

paths:
  all:
EOF

if [ -n "$CAMERA_URL" ] && [ "$CAMERA_URL" != "null" ]; then
  cat >> "$MEDIAMTX_CONFIG" << EOF
  ${STREAM_NAME}:
    source: "${CAMERA_URL}"
    sourceOnDemand: yes
EOF
  echo "Configured stream: $STREAM_NAME -> $CAMERA_URL"
else
  echo "No camera URL configured - running in demo mode"
fi

echo "Starting MediaMTX..."
exec /mediamtx "$MEDIAMTX_CONFIG"
