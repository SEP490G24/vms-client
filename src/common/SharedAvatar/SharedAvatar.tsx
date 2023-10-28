import React, { memo } from 'react'
import { Avatar, Upload } from 'antd'
import { EditCircleTwoTone } from '~/icon'
import { UploadChangeParam } from 'antd/es/upload/interface'
import { SharedAvatarWrapper } from './styles.ts'

interface SharedAvatarProps {
  url?: string
  name?: string
  onChange: (info: UploadChangeParam) => void
}

export const SharedAvatar: React.FC<SharedAvatarProps> = memo(
  ({ url, name, onChange }) => {

    return (
      <SharedAvatarWrapper className={'w-[96px] relative'}>
        {url ? <Avatar style={{ border: '1px solid #ccc' }} src={url} size={96} /> :
          <Avatar style={{ backgroundColor: '#002484', verticalAlign: 'middle' }}
                  size={96}>{name}</Avatar>}
        <Upload
          accept='image/png, image/jpeg'
          maxCount={1}
          showUploadList={false}
          onChange={onChange}
          beforeUpload={() => false}
        >
          <EditCircleTwoTone className={'btn-edit-icon'}></EditCircleTwoTone>
        </Upload>
      </SharedAvatarWrapper>
    )
  }
)
