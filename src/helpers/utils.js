import { decode } from 'js-base64'

export function ensureDecodeParamData(data, fallbackData) {
  try {
    return decode(data)
  } catch {
    return decode(fallbackData)
  }
}

export function numberRange(value, min, max) {
  if (value > max) {
    return max
  } else if (value < min) {
    return min
  } else {
    return value
  }
}
