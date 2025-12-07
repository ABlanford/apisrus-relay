import { setupManifest } from '@start9labs/start-sdk'

export const manifest = setupManifest({
  id: 'feedview-relay',
  title: 'FeedView Relay',
  version: '0.1.0',
  releaseNotes: 'Initial release - RTSP to HLS transcoding relay',
  license: 'MIT',
  wrapperRepo: 'https://github.com/ABlanford/apisrus-relay',
  upstreamRepo: 'https://github.com/bluenviron/mediamtx',
  supportSite: 'https://github.com/ABlanford/apisrus-relay/issues',
  marketingSite: 'https://github.com/ABlanford/apisrus-relay',
  donationUrl: null,
  description: {
    short: 'RTSP to HLS video relay for camera feeds',
    long: 'FeedView Relay transcodes RTSP camera streams to HLS format for web-based viewing. Designed for sovereign camera infrastructure with Lightning micropayments.',
  },
  assets: [],
  volumes: ['main'],
  images: {
    main: {
      source: {
        dockerBuild: {
          dockerFilePath: './Dockerfile',
          workdir: '.',
        },
      },
      arch: ['aarch64'],
      emulateMissingAs: null,
    },
  },
  hardwareRequirements: {
    arch: ['aarch64'],
    ram: null,
    device: {},
  },
  alerts: {},
  dependencies: {},
})
