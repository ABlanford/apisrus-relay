import { sdk } from './sdk'
import { hlsPort } from './utils'

export const main = sdk.setupMain(async ({ effects, started }) => {
  console.info('Starting FeedView Relay!')

  return sdk.Daemons.of(effects, started).addDaemon('primary', {
    subcontainer: await sdk.SubContainer.of(
      effects,
      { imageId: 'main' },
      sdk.Mounts.of().mountVolume({
        volumeId: 'main',
        subpath: null,
        mountpoint: '/data',
        readonly: false,
      }),
      'feedview-relay-sub',
    ),
    exec: { command: ['/docker_entrypoint.sh'] },
    ready: {
      display: 'HLS Stream',
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, hlsPort, {
          successMessage: 'HLS server is ready',
          errorMessage: 'HLS server is not ready',
        }),
    },
    requires: [],
  })
})
