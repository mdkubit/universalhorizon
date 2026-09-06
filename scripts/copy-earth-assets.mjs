import { access, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const destinationDir = join(process.cwd(), 'public', 'assets', 'earth')
const baseUrl =
  'https://raw.githubusercontent.com/mrdoob/three.js/r185/examples/textures/planets'

const files = [
  'earth_day_4096.jpg',
  'earth_normal_2048.jpg',
  'earth_specular_2048.jpg',
  'earth_clouds_1024.png',
]

await mkdir(destinationDir, { recursive: true })

for (const file of files) {
  const destination = join(destinationDir, file)

  try {
    await access(destination)
    continue
  } catch {
    // Missing in a clean build. Fetch the pinned upstream asset once,
    // then Vite/Netlify will serve it locally from our own deployment.
  }

  const response = await fetch(`${baseUrl}/${file}`)

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${file}: ${response.status} ${response.statusText}`,
    )
  }

  const bytes = new Uint8Array(await response.arrayBuffer())
  await writeFile(destination, bytes)
}

console.log(
  `Prepared ${files.length} self-hosted Earth textures in public/assets/earth`,
)
