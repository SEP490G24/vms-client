export interface ConfigurationDto {
  id: string
  name: string
  code: string
  type: string
  valueList?: string[],
  group?: string,
  value?: any,
  defaultValue?: any
}

