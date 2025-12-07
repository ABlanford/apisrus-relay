import { setupManifest } from '@start9labs/start-sdk'
import { SDKImageInputSpec } from '@start9labs/start-sdk/base/lib/types/ManifestTypes'

export const manifest = setupManifest({
  id: 'feedview-relay',
  title: 'FeedView Relay',
  license: 'MIT',
  wrapperRepo: 'https://github.com/ABlanford/apisrus-relay',
  upstreamRepo: 'https://github.com/bluenviron/mediamtx',
  supportSite: 'https://github.com/ABlanford/apisrus-relay/issues',
  marketingSite: 'https://github.com/ABlanford/apisrus-relay',
  donationUrl: null,
  description: {
    short: 'RTSP to HLS video relay for camera feeds',
    long: 'FeedView Relay transcodes RTSP camera streams to HLS format for web-based viewing with Lightning micropayments.',
  },
  volumes: ['main'],
  images: {
    main: {
      source: { dockerTag: 'start9/feedview-relay/main:0.1.0' },
      arch: ['aarch64'],
    } as SDKImageInputSpec,
  },
  hardwareRequirements: {
    arch: ['aarch64'],
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
