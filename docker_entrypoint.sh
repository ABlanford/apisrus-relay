#!/bin/sh
set -e

echo "FeedView Relay starting..."

# Create data directory if needed
mkdir -p /data

# Generate minimal MediaMTX config
cat > /mediamtx.yml << EOF
# MediaMTX Configuration

logLevel: info
logDestinations: [stdout]

# API for health checks (REQUIRED)
api: yes
apiAddress: :9997

# RTSP server
rtsp: yes
rtspAddress: :8554

# HLS output (browser-compatible)
hls: yes
hlsAddress: :8888
hlsAlwaysRemux: yes
hlsVariant: lowLatency
hlsSegmentCount: 3
hlsSegmentDuration: 1s
hlsAllowOrigin: "*"

# Paths - add camera sources here
paths:
  all:
    # Accept any incoming stream
    source: publisher
EOF

echo ""
echo "========================================="
echo "FeedView Relay is running!"
echo "========================================="
echo ""
echo "HLS streams available at: http://[your-start9]:8888/"
echo "API health check on port: 9997"
echo ""
echo "========================================="
echo ""

# Start MediaMTX in foreground
exec /mediamtx /mediamtx.yml
