import { useTranslation } from 'react-i18next'
import { SharedPageResults } from '~/common'
import { imagePng } from '~/assets'

const Forbidden = () => {
  const { t } = useTranslation()
  return (
    <SharedPageResults title={t('pageResults.forbidden.title')} imageSrc={imagePng.forbidden} />
  )
}
export default Forbidden
