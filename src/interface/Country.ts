export interface Province {
  id: string
  name: string
}

export interface District {
  provinceId: string,
  id: string,
  name: string
}

export interface Commune {
  districtId: string,
  id: string,
  name: string
}
