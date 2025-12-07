#!/bin/bash
set -e

echo "Starting FeedView Relay..."

MEDIAMTX_CONFIG="/data/mediamtx.yml"

# Check for manual config file
MANUAL_CONFIG="/data/camera.conf"

CAMERA_URL=""
STREAM_NAME="camera1"

if [ -f "$MANUAL_CONFIG" ]; then
  echo "Reading manual config from $MANUAL_CONFIG"
  source "$MANUAL_CONFIG"
fi

echo "Stream name: $STREAM_NAME"

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

if [ -n "$CAMERA_URL" ]; then
  cat >> "$MEDIAMTX_CONFIG" << EOF
  ${STREAM_NAME}:
    source: "${CAMERA_URL}"
    sourceOnDemand: yes
EOF
  echo "Configured stream: $STREAM_NAME -> $CAMERA_URL"
else
  echo "No camera configured. SSH in and create /data/camera.conf with:"
  echo "  CAMERA_URL=\"rtsp://admin:password@192.168.1.X:554/cam/realmonitor?channel=1&subtype=1\""
  echo "  STREAM_NAME=\"camera1\""
fi

exec /mediamtx "$MEDIAMTX_CONFIG"
