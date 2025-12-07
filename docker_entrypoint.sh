#!/bin/sh

printf "\n\n [i] Starting FeedView Relay...\n\n"

# Create data directory
mkdir -p /data

# Generate minimal MediaMTX config
cat > /data/mediamtx.yml << EOF
logLevel: info
logDestinations: [stdout]

api: yes
apiAddress: :9997

rtsp: yes
rtspAddress: :8554

hls: yes
hlsAddress: :8888
hlsAlwaysRemux: yes
hlsAllowOrigin: "*"

paths:
  all:
EOF

printf " [i] MediaMTX config created\n"
printf " [i] Starting MediaMTX...\n\n"

exec tini /mediamtx /data/mediamtx.yml
