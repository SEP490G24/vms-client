import { useTranslation } from 'react-i18next'
import { SharedPageResults } from '~/common'
import { imagePng } from '~/assets'

const NotFound = () => {

  const { t } = useTranslation()

  return (
    <SharedPageResults title={t('pageResults.notFound.title')} imageSrc={imagePng.notFound} />
  )
}
export default NotFound
