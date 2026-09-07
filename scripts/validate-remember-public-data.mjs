import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')
const snapshotPath = join(root, 'public', 'data', 'remember-v0.1.json')

function fail(message) {
  console.error(`Remember public-data validation failed: ${message}`)
  process.exit(1)
}

if (!existsSync(snapshotPath)) {
  fail('public/data/remember-v0.1.json is missing')
}

let data
try {
  data = JSON.parse(readFileSync(snapshotPath, 'utf8'))
} catch (error) {
  fail(`snapshot JSON could not be parsed: ${error instanceof Error ? error.message : String(error)}`)
}

if (data?.schema_version !== 'remember-public-snapshot-v0.1.0') {
  fail('unexpected or missing schema_version')
}

if (!data?.generated_from?.manifest || !data?.generated_from?.collection || !data?.generated_from?.review) {
  fail('generated_from provenance is incomplete')
}

const requiredImages = [
  data?.hero?.image,
  ...(Array.isArray(data?.wings) ? data.wings.map((wing) => wing.image) : []),
  data?.featured?.image,
  data?.closing?.image,
]

for (const publicPath of requiredImages) {
  if (typeof publicPath !== 'string' || !publicPath.startsWith('/assets/')) {
    fail(`invalid asset reference: ${String(publicPath)}`)
  }

  const diskPath = join(root, 'public', publicPath.slice(1))
  if (!existsSync(diskPath)) {
    fail(`referenced asset is missing: ${publicPath}`)
  }
}

const allowedStatuses = new Set(['public', 'public_redacted'])
for (const entry of data?.timeline ?? []) {
  if (!allowedStatuses.has(entry.status)) {
    fail(`timeline entry ${entry.public_id ?? '(unknown)'} has non-public status ${entry.status}`)
  }
}

if (!allowedStatuses.has(data?.featured?.status)) {
  fail('featured record is not in a public presentation state')
}

const allowedRepresentations = data?.featured?.representations ?? []
const unexpectedRepresentations = allowedRepresentations.filter(
  (value) => value !== 'metadata' && value !== 'summary',
)

if (unexpectedRepresentations.length > 0) {
  fail(`featured record exposes unauthorized representation(s): ${unexpectedRepresentations.join(', ')}`)
}

const wingIds = new Set()
for (const wing of data?.wings ?? []) {
  if (!wing?.id || wingIds.has(wing.id)) {
    fail(`duplicate or missing archive wing id: ${String(wing?.id)}`)
  }
  wingIds.add(wing.id)
}

console.log(
  `Remember public-data snapshot validated: ${data.wings.length} wings, ${data.timeline.length} timeline entries, metadata + summary boundary intact.`,
)
