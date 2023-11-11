import { useEffect, useState } from 'react'
import { fetchProvince, locationsSelector } from '~/redux/slices/locationSlice.ts'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '~/redux'
import { Commune, District } from '~/interface'
import { locationService } from '~/service'

const useLocation = (provinceId: number, districtId: number) => {
  const dispatch = useAppDispatch()
  let { provinces } = useSelector(locationsSelector)
  const [districts, setDistricts] = useState<District[]>([])
  const [communes, setCommunes] = useState<Commune[]>([])

  useEffect(() => {
    !provinces.length && dispatch(fetchProvince() as any)
  }, [])

  useEffect(() => {
    provinceId &&
    locationService.findAllDistrictByProvinceId(provinceId).then((response) => {
      setDistricts(response.data)
    })
  }, [provinceId])

  useEffect(() => {
    districtId &&
    locationService.findAllCommuneByDistrictId(districtId).then((response) => {
      setCommunes(response.data)
    })
  }, [districtId])
  return { communes, districts, provinces }
}

export { useLocation }
