import { sdk } from './sdk'
import { hlsPort } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const uiMulti = sdk.MultiHost.of(effects, 'ui-multi')
  const uiMultiOrigin = await uiMulti.bindPort(hlsPort, {
    protocol: 'http',
  })
  const ui = sdk.createInterface(effects, {
    name: 'HLS Stream',
    id: 'hls',
    description: 'HLS video stream output',
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })

  const uiReceipt = await uiMultiOrigin.export([ui])
  return [uiReceipt]
})
