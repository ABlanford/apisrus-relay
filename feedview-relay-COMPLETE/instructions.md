# FeedView Relay - Setup Instructions

FeedView Relay converts your local security cameras into web-accessible HLS streams that can be sold on the FeedView marketplace for Lightning micropayments.

## Quick Start

1. **Install FeedView Relay** on your Start9 server
2. **Find your camera's RTSP URL** (see below)
3. **Configure your cameras** in the service settings
4. **Copy your HLS URL** and register it on FeedView

## Finding Your Camera's RTSP URL

### Lorex / Dahua Cameras

```
rtsp://USERNAME:PASSWORD@CAMERA_IP:554/cam/realmonitor?channel=CHANNEL&subtype=SUBTYPE
```

- **USERNAME**: Usually `admin`
- **PASSWORD**: Your camera password
- **CAMERA_IP**: Your camera or NVR's IP address (e.g., `192.168.1.100`)
- **CHANNEL**: Camera channel number (`1`, `2`, `3`, etc.)
- **SUBTYPE**: `0` for main stream (high quality), `1` for sub stream (lower bandwidth, recommended)

**Example:**
```
rtsp://admin:MyPassword123@192.168.1.100:554/cam/realmonitor?channel=1&subtype=1
```

### Hikvision Cameras

```
rtsp://USERNAME:PASSWORD@CAMERA_IP:554/Streaming/Channels/CHANNEL
```

- **CHANNEL**: `101` (main), `102` (sub) for camera 1; `201`, `202` for camera 2, etc.

### Other Cameras

Most IP cameras support RTSP. Check your camera's documentation or search for "[Your Camera Brand] RTSP URL".

## Testing Your RTSP URL

Before adding to FeedView Relay, test your URL in VLC:

1. Open VLC Media Player
2. Go to **Media → Open Network Stream**
3. Paste your RTSP URL
4. Click **Play**

If it works in VLC, it will work in FeedView Relay!

## Accessing Your HLS Streams

Once configured, your streams are available at:

- **LAN**: `https://[your-start9-address]:443/[camera-name]`
- **Tor**: `http://[your-tor-address]:8888/[camera-name]`

### Stream URLs

| Camera ID | HLS URL |
|-----------|---------|
| `demo` | `https://your-start9:443/demo` |
| `camera1` | `https://your-start9:443/camera1` |
| `camera2` | `https://your-start9:443/camera2` |

## Registering on FeedView Marketplace

1. Go to [FeedView Marketplace](https://feedview.apisrus.com)
2. Click **Register Camera**
3. Enter your camera details:
   - **Name**: e.g., "Downtown Traffic Cam"
   - **HLS URL**: Your Start9 stream URL
   - **Price**: Sats per hour
4. Start earning Lightning payments!

## Bandwidth Considerations

- **Sub stream** (`subtype=1`) uses ~500 Kbps - recommended for remote access
- **Main stream** (`subtype=0`) uses ~2-4 Mbps - use for high-quality local recording

For internet streaming, always use the sub stream to reduce bandwidth costs.

## Troubleshooting

### Stream not loading?

1. Check that your camera is online and accessible on your network
2. Verify the RTSP URL works in VLC first
3. Ensure your Start9 server can reach your camera (same network)
4. Check the FeedView Relay logs in StartOS

### High latency?

HLS has 4-10 second latency by design. This is normal for web-based streaming.

### Stream quality issues?

Use `subtype=1` (sub stream) for smoother playback over the internet.

## Support

- **Documentation**: https://apisrus.com/docs/feedview-relay
- **Community**: Start9 Community Forums
- **Issues**: https://github.com/apisrus/feedview-relay-startos/issues

---

*FeedView Relay is part of the APIs R Us ecosystem - Bitcoin infrastructure for the sovereign individual.*
