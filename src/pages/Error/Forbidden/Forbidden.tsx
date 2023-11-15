import { Image, Result, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { SharedButton } from '~/common'
import { PATH_ROLE_MAP } from '~/role'
import { PATH_DASHBOARD } from '~/routes/paths.ts'
import { authService } from '~/service'
import { imagePng } from '~/assets'
import { ForbiddenWrapper } from '~/pages/Error/Forbidden/style.ts'

const Forbidden = () => {
  const navigate = useNavigate()

  const { t } = useTranslation()

  return (
    <ForbiddenWrapper>
      <Result
        // status={403}
        className={'h-full'}
        title={'Sorry, you are not authorized to access this page.'}
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
            <SharedButton
              size={'large'}
              permissions={PATH_ROLE_MAP['PATH_DASHBOARD']}
              className='bg-primary-normal text-white w-[106px]'
              onClick={() => navigate(PATH_DASHBOARD)}
            >
              Dashboard
            </SharedButton>
          </Space>
        }
      />
    </ForbiddenWrapper>
  )
}
export default Forbidden
