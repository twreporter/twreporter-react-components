export function date2yyyymmdd(time, separator) {
  if (!time) return ''
  const date = new Date(time)
  const year = date.getFullYear()
  const mon = date.getMonth() + 1
  const day = date.getDate()
  return [year, mon, day].join(separator)
}
