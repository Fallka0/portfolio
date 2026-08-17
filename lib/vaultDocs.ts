/**
 * Maps a public document id to a file inside /private/docs. The client only ever
 * sees the id, and the lookup is an allow-list, so an id like `../../.env` can
 * never reach the filesystem.
 */
export const VAULT_FILES: Record<string, { file: string; download: string }> = {
  'bm-zeugnis': {
    file: 'berufsmaturitaet-zeugnis.pdf',
    download: 'Pantelei_Mykyta_Berufsmaturitaet_Zeugnis.pdf',
  },
  'inf-zeugnis': {
    file: 'informatik-zeugnis.pdf',
    download: 'Pantelei_Mykyta_Informatik_Zeugnis.pdf',
  },
  'uek-187': {
    file: 'uek-187-ict-arbeitsplatz.pdf',
    download: 'Pantelei_Mykyta_ueK_187.pdf',
  },
  'uek-106': {
    file: 'uek-106-datenbanken.pdf',
    download: 'Pantelei_Mykyta_ueK_106.pdf',
  },
  'uek-335': {
    file: 'uek-335-mobile-applikation.pdf',
    download: 'Pantelei_Mykyta_ueK_335.pdf',
  },
  'uek-210': {
    file: 'uek-210-public-cloud.pdf',
    download: 'Pantelei_Mykyta_ueK_210.pdf',
  },
  'uek-294': {
    file: 'uek-294-frontend.pdf',
    download: 'Pantelei_Mykyta_ueK_294.pdf',
  },
  'uek-295': {
    file: 'uek-295-backend.pdf',
    download: 'Pantelei_Mykyta_ueK_295.pdf',
  },
}

export type VaultDocId = keyof typeof VAULT_FILES
