import { Image, Result, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { SharedButton } from '~/common'
import { PATH_ROOT } from '~/routes/paths.ts'
import { authService } from '~/service'
import { imagePng } from '~/assets'
import { NotFoundWrapper } from './style.ts'
import { getAcceptedPrivateRoutes } from '~/routes'

const NotFound = () => {
  const navigate = useNavigate()
  const acceptedPrivateRoutes = getAcceptedPrivateRoutes()

  const { t } = useTranslation()

  return (
    <NotFoundWrapper>
      <Result
        // status={403}
        className={'h-full'}
        title={'Sorry, the page you visited does not exist.'}
        icon={<Image preview={false} width={456} height={456} src={imagePng.forbidden} />}
        extra={
          <Space>
            <SharedButton
              size={'large'}
              className='mx-3 bg-secondary-normal hover:border-secondary-hover active:bg-secondary-active text-white w-[106px]'
              onClick={async () => await authService.doLogout()}
            >
              {t('common.user.logout')}
            </SharedButton>
            {acceptedPrivateRoutes.length > 0 &&
              <SharedButton
                size={'large'}
                className='bg-primary-normal text-white w-[106px]'
                onClick={() => navigate(PATH_ROOT)}
              >
                Back to system
              </SharedButton>
            }
          </Space>
        }
      />
    </NotFoundWrapper>
  )
}
export default NotFound
