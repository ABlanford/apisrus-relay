#!/bin/bash
set -e

echo "Starting FeedView Relay..."

# StartOS puts config at /root/start9/config.yaml
CONFIG_FILE="/root/start9/config.yaml"
MEDIAMTX_CONFIG="/data/mediamtx.yml"

# Default values
CAMERA_URL=""
STREAM_NAME="camera1"

# Read config if it exists
if [ -f "$CONFIG_FILE" ]; then
  echo "Reading config from $CONFIG_FILE"
  CAMERA_URL=$(grep "camera-url:" "$CONFIG_FILE" 2>/dev/null | sed 's/.*camera-url:[[:space:]]*//' | tr -d '"' | tr -d "'" || echo "")
  STREAM_NAME=$(grep "stream-name:" "$CONFIG_FILE" 2>/dev/null | sed 's/.*stream-name:[[:space:]]*//' | tr -d '"' | tr -d "'" || echo "camera1")
  
  # Handle null/empty values
  if [ "$CAMERA_URL" = "null" ] || [ "$CAMERA_URL" = "~" ]; then
    CAMERA_URL=""
  fi
  if [ -z "$STREAM_NAME" ] || [ "$STREAM_NAME" = "null" ]; then
    STREAM_NAME="camera1"
  fi
fi

echo "Stream name: $STREAM_NAME"
echo "Camera URL configured: $([ -n "$CAMERA_URL" ] && echo "yes" || echo "no")"

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
if [ -n "$CAMERA_URL" ]; then
  cat >> "$MEDIAMTX_CONFIG" << EOF
  ${STREAM_NAME}:
    source: "${CAMERA_URL}"
    sourceOnDemand: yes
EOF
  echo "Added stream path: $STREAM_NAME"
fi

echo "Starting MediaMTX..."
exec /mediamtx "$MEDIAMTX_CONFIG"
