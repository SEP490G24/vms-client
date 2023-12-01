export const REGEX = {
  PHONE: /(0|[3|5|7|8|9])+([0-9]{7,8})\b/g,
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  CODE: /^[a-zA-Z0-9]{0,10}$/,
  NAME: /^.{0,50}$/,
  DESCRIPTION: /^.{0,250}$/
}

export const DATE_TIME = {
  START_DAY: 'YYYY-MM-DDT00:00:00.000'
}

export const DATE_TIME_HOUR = {
  START_DAY: 'YYYY-MM-DDTHH:mm:ss'
}
