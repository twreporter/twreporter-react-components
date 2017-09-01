/* global __DEVELOPMENT__ */
import { storage, mainSite } from './configs'

export function date2yyyymmdd(time, separator) {
  if (!time) return ''
  const date = new Date(time)
  const year = date.getFullYear()
  const mon = date.getMonth() + 1
  const day = date.getDate()
  return [year, mon, day].join(separator)
}

export function replaceStorageUrlPrefix(url = '', isDev = __DEVELOPMENT__) {
  if (isDev || typeof url !== 'string') {
    return url
  }
  const { schema, hostname, bucket } = storage.google
  const toReplace = mainSite.url
  const toBeReplaced = `${schema}://${hostname}/${bucket}`

  return url.replace(toBeReplaced, toReplace)
}
