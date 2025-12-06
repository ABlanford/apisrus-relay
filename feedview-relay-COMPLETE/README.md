# FeedView Relay - Start9 Package

Convert your local RTSP security cameras into Lightning-payable HLS streams.

## What This Does

```
[Your Cameras] → RTSP → [Start9 + FeedView Relay] → HLS → [Internet] → [FeedView Marketplace]
                                                              ↓
                                                    [Viewers pay Lightning sats]
```

## Quick Start

### Option 1: Sideload (Testing)

1. Build the package:
   ```bash
   make x86  # or make arm for Raspberry Pi
   ```

2. On your Start9:
   - Go to **System → Manage → Sideload Service**
   - Upload `feedview-relay.s9pk`
   - Install and start the service

3. Configure your cameras in the service settings

### Option 2: Community Registry (Coming Soon)

Once published, install directly from the Start9 marketplace.

## Building

### Prerequisites

- Docker with buildx
- Start9 SDK (`start-sdk`)
- make

### Build Commands

```bash
# Build for Intel/AMD (x86_64)
make x86

# Build for Raspberry Pi / ARM (aarch64)
make arm

# Build for both architectures
make both

# Local testing with Docker
make dev
```

## Configuration

Add cameras in the StartOS UI:

| Field | Description |
|-------|-------------|
| Camera ID | Unique ID (lowercase, no spaces) |
| Display Name | Human-readable name |
| RTSP URL | Full URL with credentials |
| Enabled | Turn stream on/off |

### Example RTSP URLs

**Lorex/Dahua:**
```
rtsp://admin:password@192.168.1.100:554/cam/realmonitor?channel=1&subtype=1
```

**Hikvision:**
```
rtsp://admin:password@192.168.1.100:554/Streaming/Channels/101
```

## Stream Access

Once running, streams are available at:

- **LAN:** `https://[start9-address]:443/[camera-id]`
- **Tor:** `http://[tor-address]:8888/[camera-id]`

## Part of APIs R Us

FeedView Relay is part of the APIs R Us ecosystem - Bitcoin infrastructure for sovereign individuals.

- **FeedView Marketplace:** Sell access to your camera streams
- **SAT-GATE:** API metering and Lightning payments
- **Ground Protocol:** Cryptographic proof of authenticity

## License

MIT License - See LICENSE.md
