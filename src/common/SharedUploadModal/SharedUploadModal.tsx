import React, { useState } from 'react'
import { UploadModalWrapper } from './styles'
import { Form, Space, Upload, UploadFile, UploadProps } from 'antd'
import { SharedButton } from '~/common'
import { useTranslation } from 'react-i18next'
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons'
import { baseUploadTemplate } from '~/utils'
import { RcFile } from 'antd/es/upload'

interface SharedModalProps {
  open?: boolean;
  confirmLoading?: boolean;
  width?: number
  className?: string;
  title?: string | React.ReactNode
  labelCancel?: string | React.ReactNode
  labelOk?: string | React.ReactNode
  onCancel: () => void
  onOk: (file: RcFile) => void
  onDownloadSample: () => void
}

export const SharedUploadModal: React.FC<SharedModalProps> = React.memo((props) => {

    const { t } = useTranslation()
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const [file, setFile] = useState<RcFile>()

    const handleChange: UploadProps['onChange'] = (info) => {
      switch (info.file.status) {
        case 'removed':
          setFileList([])
          setFile(undefined)
          break
        case 'uploading':
          setFileList([baseUploadTemplate(info.file.url, info.file.name)])
          setFile(info.file.originFileObj)
          break
      }
    }

    const onDownload = () => {
      file && props.onOk(file)
    }

    return (
      <UploadModalWrapper
        open={props.open}
        confirmLoading={props.confirmLoading}
        width={props.width}
        footer={null}
        closable={false}
        onOk={onDownload}
        onCancel={props.onCancel}
        title={props.title} className={props.className}
      >
        <Space className={'w-full'} direction={'vertical'}>
          <Form className={'mb-2'} labelCol={{ span: 4 }}>
            <Form.Item className={'mb-2'} label='Select file:' name='photos'>
              <Upload onChange={handleChange} multiple={false} maxCount={1} showUploadList={true}
                      fileList={fileList}>
                <SharedButton icon={<UploadOutlined />}>{t('common.label.import_data')}</SharedButton>
              </Upload>
              <p className={'text-muted mt-2'}>* File must least than 3mb</p>
            </Form.Item>
          </Form>
          <div className={'text-blue-600 cursor-pointer w-fit'} onClick={props.onDownloadSample}>
            <DownloadOutlined /> <span className={'ml-3'}>Download sample file</span>
          </div>
        </Space>
      </UploadModalWrapper>
    )
  }
)
