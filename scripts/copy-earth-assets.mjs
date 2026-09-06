import { copyFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const threeEntry = fileURLToPath(import.meta.resolve('three'))
const threeRoot = join(dirname(threeEntry), '..')
const sourceDir = join(threeRoot, 'examples', 'textures', 'planets')
const destinationDir = join(process.cwd(), 'public', 'assets', 'earth')

const files = [
  'earth_day_4096.jpg',
  'earth_normal_2048.jpg',
  'earth_specular_2048.jpg',
  'earth_clouds_1024.png',
]

await mkdir(destinationDir, { recursive: true })

for (const file of files) {
  await copyFile(
    join(sourceDir, file),
    join(destinationDir, file),
  )
}

console.log(
  `Prepared ${files.length} self-hosted Earth textures in public/assets/earth`,
)
