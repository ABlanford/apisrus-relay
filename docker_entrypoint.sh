#!/bin/bash
set -e

# Read config from StartOS (YAML format at /root/start9/config.yaml)
CONFIG_FILE="/root/start9/config.yaml"
MEDIAMTX_CONFIG="/data/mediamtx.yml"

# Parse camera URL and stream name from StartOS config
CAMERA_URL=""
STREAM_NAME="camera1"

if [ -f "$CONFIG_FILE" ]; then
  # Extract values using grep/sed (simple YAML parsing)
  CAMERA_URL=$(grep "camera-url:" "$CONFIG_FILE" 2>/dev/null | sed 's/.*camera-url: *//' | tr -d '"' | tr -d "'" || echo "")
  STREAM_NAME=$(grep "stream-name:" "$CONFIG_FILE" 2>/dev/null | sed 's/.*stream-name: *//' | tr -d '"' | tr -d "'" || echo "camera1")
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

# Add camera path if URL is configured
if [ -n "$CAMERA_URL" ] && [ "$CAMERA_URL" != "null" ] && [ "$CAMERA_URL" != "~" ]; then
  cat >> "$MEDIAMTX_CONFIG" << EOF
  ${STREAM_NAME}:
    source: "${CAMERA_URL}"
    sourceOnDemand: yes
EOF
  echo "Configured stream: $STREAM_NAME"
else
  echo "No camera URL configured - running in demo mode"
fi

echo "Starting MediaMTX..."
exec /mediamtx "$MEDIAMTX_CONFIG"
