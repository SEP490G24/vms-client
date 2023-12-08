export const REGEX = {
  PHONE: /(0[3|5|7|8|9])+([0-9]{8})\b/g,
  IDENTIFICATION_NUMBER: /([0-9]{12})\b/g,
  EMAIL: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  CODE: /^[a-zA-Z0-9_]{0,10}$/
}

export const DATE_TIME = {
  START_DAY: 'YYYY-MM-DDT00:00:00.000',
  END_DAY: 'YYYY-MM-DDT23:59:59.000'
}
export const DATE_TIME_COMMON = {
  START_DAY: 'DD/MM/YYYY'
}

export const DATE_TIME_HOUR = {
  START_DAY: 'YYYY-MM-DDTHH:mm:ss'
}
