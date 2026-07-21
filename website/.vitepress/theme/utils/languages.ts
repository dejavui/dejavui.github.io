// Copyright (c) The Tachiyomi Open Source Project
// SPDX-License-Identifier: MPL-2.0

export function simpleLangName(code: string) {
  if (code === 'all') return 'All'

  const name = getDisplayLanguageName(code, 'en')
  return name ? capitalize(name, 'en') : fallbackLanguageName(code)
}

export function langName(code: string) {
  if (code === 'all') return 'All'

  const englishName = getDisplayLanguageName(code, 'en')
  const nativeName = getDisplayLanguageName(code, code)

  if (englishName && nativeName) {
    return `${capitalize(englishName, 'en')} - ${capitalize(nativeName, code)}`
  }

  return fallbackLanguageName(code)
}

function getDisplayLanguageName(code: string, locale: string) {
  try {
    const displayNames = new Intl.DisplayNames([locale], { type: 'language' })
    return displayNames.of(code) ?? null
  } catch {
    return null
  }
}

function fallbackLanguageName(code: string) {
  const normalized = code.trim().replace(/[_-]+/g, ' ')

  if (!normalized) return 'Unknown'
  if (normalized.toLowerCase() === 'none') return 'None'
  if (normalized.toLowerCase() === 'other') return 'Other'

  return normalized
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function capitalize(string: string, locale: string) {
  return string.charAt(0).toLocaleUpperCase(locale) + string.substring(1)
}