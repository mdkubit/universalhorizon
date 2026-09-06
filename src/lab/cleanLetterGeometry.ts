import * as THREE from 'three'

/**
 * Removes collapsed triangles from raster-derived ExtrudeGeometry before
 * lighting/bloom. Preserves material groups and recomputes normals/bounds.
 */
export function cleanLetterGeometry(geometry: THREE.BufferGeometry) {
  if (geometry.index) {
    throw new Error('Expected non-indexed letter extrusion')
  }

  const position = geometry.getAttribute('position')
  const kept: number[] = []
  const groups: { start: number; count: number; materialIndex: number }[] = []

  const a = new THREE.Vector3()
  const b = new THREE.Vector3()
  const c = new THREE.Vector3()

  for (const group of geometry.groups) {
    const start = kept.length

    for (let index = group.start; index < group.start + group.count; index += 3) {
      a.fromBufferAttribute(position, index)
      b.fromBufferAttribute(position, index + 1)
      c.fromBufferAttribute(position, index + 2)

      const areaSquared = b.sub(a).cross(c.sub(a)).lengthSq()

      if (!Number.isFinite(areaSquared) || areaSquared <= 1e-20) {
        continue
      }

      kept.push(index, index + 1, index + 2)
    }

    if (kept.length > start) {
      groups.push({
        start,
        count: kept.length - start,
        materialIndex: group.materialIndex ?? 0,
      })
    }
  }

  for (const [name, attribute] of Object.entries(geometry.attributes)) {
    const values: number[] = []

    for (const index of kept) {
      for (let component = 0; component < attribute.itemSize; component += 1) {
        values.push(attribute.array[index * attribute.itemSize + component])
      }
    }

    geometry.setAttribute(
      name,
      new THREE.Float32BufferAttribute(values, attribute.itemSize, attribute.normalized),
    )
  }

  geometry.clearGroups()
  for (const group of groups) {
    geometry.addGroup(group.start, group.count, group.materialIndex)
  }

  geometry.computeVertexNormals()
  geometry.computeBoundingBox()
  geometry.computeBoundingSphere()

  return geometry
}
