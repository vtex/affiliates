/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-extend-native */
interface ComboboxItemType {
  value: string
  name: string
}

interface Map<K, V> {
  hasPartialKey(searchTerm: string): boolean
  hasPartialValue(searchTerm: string): boolean
  getByPartialKey(partialKey: string): ComboboxItemType[]
}

Map.prototype.hasPartialKey = function (searchTerm: string) {
  for (const key of this.keys()) {
    if (typeof key === 'string' && key.includes(searchTerm)) {
      return true
    }
  }

  return false
}

Map.prototype.hasPartialValue = function (searchTerm: string) {
  for (const value of this.values()) {
    if (typeof value === 'string' && value.includes(searchTerm)) {
      return true
    }
  }

  return false
}

Map.prototype.getByPartialKey = function (partialKey: string) {
  const result = []

  for (const entrie of this.entries()) {
    if (entrie[0].includes(partialKey) || entrie[1].includes(partialKey)) {
      result.push({ value: entrie[0], name: entrie[1] })
    }
  }

  return result
}
