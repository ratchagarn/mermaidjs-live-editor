import { decode } from 'js-base64'

export function ensureDecodeParamData(data, fallbackData) {
  try {
    return decode(data)
  } catch {
    return decode(fallbackData)
  }
}
