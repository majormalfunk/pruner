import { DateTime, Settings } from 'luxon'

// Format given date, either a string or Date() object.
export const formatDate = (date) => {

  Settings.defaultLocale = 'en-GB'

  const format = (dateTime) => {
    return dateTime.toFormat('dd.MM.yyyy HH:mm')
  }

  if (typeof date === 'string') {
    return format(DateTime.fromISO(date))
  }

  return format(DateTime.fromJSDate(date))
}