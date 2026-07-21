// Copyright (c) The Tachiyomi Open Source Project
// SPDX-License-Identifier: MPL-2.0

export function simpleLangName(code: string | undefined | null) {
  const normalizedCode = normalizeLanguageCode(code)
  if (normalizedCode === 'all') return 'All'

  const name = getDisplayLanguageName(normalizedCode, 'en')
  return name ? capitalize(name, 'en') : fallbackLanguageName(normalizedCode)
}

export function langName(code: string | undefined | null) {
  const normalizedCode = normalizeLanguageCode(code)
  if (normalizedCode === 'all') return 'All'

  const englishName = getDisplayLanguageName(normalizedCode, 'en')
  const nativeName = getDisplayLanguageName(normalizedCode, normalizedCode)

  if (englishName && nativeName) {
    return `${capitalize(englishName, 'en')} - ${capitalize(nativeName, normalizedCode)}`
  }

  return fallbackLanguageName(normalizedCode)
}

function normalizeLanguageCode(code: string | undefined | null) {
  if (typeof code !== 'string') return ''
  return code.trim()
}

function getDisplayLanguageName(code: string, locale: string) {
  if (!code) return null

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