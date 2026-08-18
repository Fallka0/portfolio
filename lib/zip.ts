/**
 * Minimal ZIP writer, store method only (no compression).
 *
 * The alternative was a dependency; this file is smaller than the lockfile
 * churn one would cost, and the archive it builds holds PDFs, which are
 * already deflate-compressed internally — running them through deflate again
 * buys a percent or two for real CPU on every request.
 *
 * Deliberately not implementing ZIP64: entries and totals are 32-bit here, so
 * this is only safe below 4GB and 65535 entries. The vault holds a handful of
 * PDFs well under a megabyte, and `buildZip` throws rather than emit an
 * archive that silently truncates.
 */

const LOCAL_SIG   = 0x04034b50
const CENTRAL_SIG = 0x02014b50
const EOCD_SIG    = 0x06054b50
const VERSION     = 20        // 2.0 — the floor for the store method
const MAX_U32     = 0xffffffff
const MAX_ENTRIES = 0xffff

let crcTable: Uint32Array | null = null

function crc32(buf: Uint8Array): number {
  if (!crcTable) {
    crcTable = new Uint32Array(256)
    for (let i = 0; i < 256; i++) {
      let c = i
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
      crcTable[i] = c >>> 0
    }
  }
  let crc = 0xffffffff
  for (let i = 0; i < buf.length; i++) crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8)
  return (crc ^ 0xffffffff) >>> 0
}

/** MS-DOS packed date/time, which is what the format stores. */
function dosDateTime(d: Date): { time: number; date: number } {
  // Pre-1980 cannot be represented; clamp rather than emit a negative year.
  const year = Math.max(1980, d.getFullYear())
  return {
    time: (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1),
    date: ((year - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate(),
  }
}

export interface ZipEntry { name: string; data: Uint8Array }

export function buildZip(entries: ZipEntry[], now: Date = new Date()): Buffer {
  if (entries.length > MAX_ENTRIES) throw new Error('zip: too many entries for a non-ZIP64 archive')

  const { time, date } = dosDateTime(now)
  const locals: Buffer[] = []
  const centrals: Buffer[] = []
  let offset = 0

  for (const entry of entries) {
    const name = Buffer.from(entry.name, 'utf8')
    const data = Buffer.from(entry.data)
    const crc  = crc32(data)

    if (offset > MAX_U32 || data.length > MAX_U32) {
      throw new Error('zip: archive too large for a non-ZIP64 archive')
    }

    const local = Buffer.alloc(30 + name.length)
    local.writeUInt32LE(LOCAL_SIG, 0)
    local.writeUInt16LE(VERSION, 4)
    local.writeUInt16LE(0x0800, 6)      // UTF-8 filename flag
    local.writeUInt16LE(0, 8)           // stored
    local.writeUInt16LE(time, 10)
    local.writeUInt16LE(date, 12)
    local.writeUInt32LE(crc, 14)
    local.writeUInt32LE(data.length, 18)
    local.writeUInt32LE(data.length, 22)
    local.writeUInt16LE(name.length, 26)
    local.writeUInt16LE(0, 28)          // no extra field
    name.copy(local, 30)

    const central = Buffer.alloc(46 + name.length)
    central.writeUInt32LE(CENTRAL_SIG, 0)
    central.writeUInt16LE(VERSION, 4)
    central.writeUInt16LE(VERSION, 6)
    central.writeUInt16LE(0x0800, 8)
    central.writeUInt16LE(0, 10)
    central.writeUInt16LE(time, 12)
    central.writeUInt16LE(date, 14)
    central.writeUInt32LE(crc, 16)
    central.writeUInt32LE(data.length, 20)
    central.writeUInt32LE(data.length, 24)
    central.writeUInt16LE(name.length, 28)
    central.writeUInt16LE(0, 30)        // extra
    central.writeUInt16LE(0, 32)        // comment
    central.writeUInt16LE(0, 34)        // disk number
    central.writeUInt16LE(0, 36)        // internal attrs
    central.writeUInt32LE(0, 38)        // external attrs
    central.writeUInt32LE(offset, 42)   // offset of the local header
    name.copy(central, 46)

    locals.push(local, data)
    centrals.push(central)
    offset += local.length + data.length
  }

  const centralSize = centrals.reduce((n, b) => n + b.length, 0)
  const eocd = Buffer.alloc(22)
  eocd.writeUInt32LE(EOCD_SIG, 0)
  eocd.writeUInt16LE(0, 4)
  eocd.writeUInt16LE(0, 6)
  eocd.writeUInt16LE(entries.length, 8)
  eocd.writeUInt16LE(entries.length, 10)
  eocd.writeUInt32LE(centralSize, 12)
  eocd.writeUInt32LE(offset, 16)        // central directory starts here
  eocd.writeUInt16LE(0, 20)             // no archive comment

  return Buffer.concat([...locals, ...centrals, eocd])
}
