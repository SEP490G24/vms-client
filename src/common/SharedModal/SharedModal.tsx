import React from 'react'
import { ModalWrapper } from './styles'
import { ModalGlobalStyle } from '~/themes'
import { Card, Space } from 'antd'
import { SharedButton } from '~/common'
import { useTranslation } from 'react-i18next'

interface SharedModalProps {
  className?: string;
  title?: string | React.ReactNode
  children: React.ReactNode
  labelCancel?: string | React.ReactNode
  labelOk?: string | React.ReactNode
  onCancel: () => void
  onOk: () => void
}

export const SharedModal: React.FC<SharedModalProps> = React.memo((props) => {

    const { t } = useTranslation()

    return (
      <ModalWrapper className={props.className}>
        <ModalGlobalStyle />
        <Card
          title={props.title}
          extra={
            <Space>
              <SharedButton onClick={props.onCancel}>{props.labelCancel ?? t('common.label.close')}</SharedButton>
              <SharedButton
                type='primary' onClick={props.onOk}>
                {props.labelOk ?? t('common.label.save')}
              </SharedButton>
            </Space>
          }
          style={{ padding: '10px' }}
        >
          {props.children}
        </Card>
      </ModalWrapper>
    )
  }
)
