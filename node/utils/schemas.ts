function isVersionLower(currentVersion: string, newVersion: string) {
  const current = currentVersion.split('.').map(Number)
  const newV = newVersion.split('.').map(Number)

  for (let i = 0; i < Math.max(current.length, newV.length); i++) {
    if (current[i] > (newV[i] || 0)) {
      return false
    }

    if (current[i] < (newV[i] || 0)) {
      return true
    }
  }

  return false
}

function compareVersions(version1: string, version2: string) {
  const v1 = version1.split('.').map(Number)
  const v2 = version2.split('.').map(Number)

  for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
    if (v1[i] > v2[i]) return -1
    if (v1[i] < v2[i]) return 1
  }

  return 0
}

export function getOldVersions(versions: any[], manifest: string) {
  let versionArray: string[] = []

  versions.forEach((version) => {
    const splitted = version.split('-')

    if (
      splitted[0].match(/^\d/) &&
      !versionArray.includes(splitted) &&
      !isVersionLower(manifest, splitted[0])
    ) {
      versionArray = [...versionArray, splitted[0]]
    }
  })

  return versionArray.slice().sort(compareVersions)
}
