import React from 'react'
import { ModalWrapper } from './styles'
import { Space } from 'antd'
import { SharedButton } from '~/common'
import { useTranslation } from 'react-i18next'
import { ModalFooterRender } from 'antd/es/modal/interface'

interface SharedModalProps {
  open?: boolean;
  confirmLoading?: boolean;
  closable?: boolean;
  className?: string;
  width?: number
  title?: string | React.ReactNode
  extra?: string | React.ReactNode
  footer?: ModalFooterRender | React.ReactNode;
  children: React.ReactNode
  labelCancel?: string | React.ReactNode
  labelOk?: string | React.ReactNode
  onCancel: () => void
  onOk: () => void
}

export const SharedModal: React.FC<SharedModalProps> = React.memo((props) => {

    const { t } = useTranslation()

    return (
      <ModalWrapper
        width={props.width}
        open={props.open}
        confirmLoading={props.confirmLoading}
        closable={props.closable}
        onCancel={props.onCancel}
        onOk={props.onOk}
        className={'vms-modal ' + props.className}
        footer={props.footer}
        title={
          <Space className={'w-full justify-between'} align={'center'}>
            {props.title}
            {props.extra ?? <Space>
              <SharedButton onClick={props.onCancel}>{props.labelCancel ?? t('common.label.close')}</SharedButton>
              <SharedButton
                type='primary' onClick={props.onOk}>
                {props.labelOk ?? t('common.label.save')}
              </SharedButton>
            </Space>}
          </Space>
        }
      >
        {props.children}
      </ModalWrapper>
    )
  }
)
