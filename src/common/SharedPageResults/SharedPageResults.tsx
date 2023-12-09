import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { PageResultsWrapper } from '~/common/SharedPageResults/styles.ts'
import { Image, Result, Space } from 'antd'
import { SharedButton } from '~/common'
import { authService } from '~/service'
import { PATH_ROOT } from '~/routes/paths.ts'
import { useNavigate } from 'react-router-dom'
import { getAcceptedPrivateRoutes } from '~/routes'

interface Props {
  title: string
  imageSrc: string
}

export const SharedPageResults: React.FC<Props> = memo((props) => {
    const navigate = useNavigate()
    const acceptedPrivateRoutes = getAcceptedPrivateRoutes()

    const { t } = useTranslation()

    return (
      <PageResultsWrapper>
        <Result
          className={'h-3/4'}
          title={<strong className={'text-xl'}>{props.title}</strong>}
          icon={<Image preview={false} width={800} src={props.imageSrc} />}
          extra={
            <Space>
              <SharedButton
                size={'large'}
                className='mx-3 bg-secondary-normal hover:border-secondary-hover active:bg-secondary-active text-white'
                onClick={async () => await authService.doLogout()}
              >
                {t('pageResults.logout')}
              </SharedButton>
              {acceptedPrivateRoutes.length > 0 &&
                <SharedButton
                  size={'large'}
                  className='bg-primary-normal text-white'
                  onClick={() => navigate(PATH_ROOT)}
                >
                  {t('pageResults.backToSystem')}
                </SharedButton>
              }
            </Space>
          }
        />
      </PageResultsWrapper>
    )
  }
)
