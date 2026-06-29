import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import Database from 'better-sqlite3'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, '..', 'data')
const dbPath = join(dataDir, 'rfq-qcr.db')

mkdirSync(dataDir, { recursive: true })

export const db = new Database(dbPath)

db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    company TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`)

export type UserRow = {
  id: string
  full_name: string
  company: string
  email: string
  password_hash: string
  created_at: string
}

export type PublicUser = {
  id: string
  fullName: string
  company: string
  email: string
  createdAt: string
}

export function toPublicUser(row: UserRow): PublicUser {
  return {
    id: row.id,
    fullName: row.full_name,
    company: row.company,
    email: row.email,
    createdAt: row.created_at,
  }
}
