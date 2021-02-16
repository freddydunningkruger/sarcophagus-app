import { makeNumeral } from "./bigNumbers"

const convertToUTC = date => {
  return Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  )
}

const getUTCDate = numDays => {
  let today = new Date()
  today.setDate(today.getDate() + numDays)
  const utc = convertToUTC(today)
  return utc
}

const getDatefromBigNumber = UtcBN => {
  const UTC = makeNumeral(UtcBN, 0).value() * 1000
  const dateFromUTC = new Date(UTC)
  const timeZoneOffset = dateFromUTC.getTimezoneOffset()
  dateFromUTC.setMinutes(dateFromUTC.getMinutes() + timeZoneOffset)
  return `${dateFromUTC.toLocaleDateString()} ${dateFromUTC.toLocaleTimeString()}`
}

const getCustomDate = (utc) => {
  if(!utc) return '00/00/0000 0:00:00 AM'
  const time = new Date(utc)
  const offset = time.getTimezoneOffset()
  time.setMinutes(time.getMinutes() + offset)
  return `${time.toLocaleDateString()}  ${time.toLocaleTimeString()}`
}

const getCustomDateUTC = (utc) => {
  const date = new Date(utc)
  const offset = date.getTimezoneOffset()
  date.setMinutes(date.getMinutes() + offset)
  return date
}

const getTimeRemaining = (endtime) => {
  // adds the time zone offset to date object (300 minutes)
  const timeZoneOffset = endtime.getTimezoneOffset()
  endtime.setMinutes(endtime.getMinutes() + timeZoneOffset)
  const total = endtime - Date.parse(new Date());
  const seconds = Math.floor( (total/1000) % 60 );
  const minutes = Math.floor( (total/1000/60) % 60 );
  const hours = Math.floor( (total/(1000*60*60)) % 24 );
  const days = Math.floor( total/(1000*60*60*24) );
  return `${days} days ${covertToTwoDigitString(hours)}:${covertToTwoDigitString(minutes)}:${covertToTwoDigitString(seconds)}`
}

const isTimePast = (time, window) => {
  const UTCTime = makeNumeral(time, 0).value() * 1000
  const UTCWindow= makeNumeral(window, 0).value() * 1000
  return Math.sign((UTCTime + UTCWindow) - Date.now().valueOf() <= 0)
}

const covertToTwoDigitString = (num) => {
  return num < 10 ? `0${num}` : num
}

export { convertToUTC, getUTCDate, getDatefromBigNumber, getCustomDateUTC, getTimeRemaining, getCustomDate, isTimePast }
