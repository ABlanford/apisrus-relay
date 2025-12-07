import { ExpectedExports, BackupExports, InstallExports } from '@start9labs/start-sdk'

export const install: InstallExports = async () => {
  return { configured: true }
}

export const backup: BackupExports = async () => {
  return []
}

export const expected: ExpectedExports = {
  main: {
    health: async () => ({ result: { type: 'ready' } }),
    'init-config': async () => ({ configured: true }),
  },
}
