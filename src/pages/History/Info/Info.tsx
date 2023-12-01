import { Descriptions, Divider, Space } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { HistoryDto, PageableResponse } from '~/interface'
import DescriptionsItem from 'antd/es/descriptions/Item'

interface HistoryFormArgs {
  history?: HistoryDto
  onClose: () => void
  historyDetailTable?: PageableResponse<HistoryDto>
}

const Info: React.FC<HistoryFormArgs> = (props) => {
  const { t } = useTranslation()
console.log('Detail', props.history)
  console.log('Detail table', props.historyDetailTable)
  return (
    <Space className={'w-full'} direction={'vertical'}
           size={32}>
      <Divider orientation={'left'}>Ticket Info</Divider>
      {props.history && <Descriptions bordered>
        <DescriptionsItem
          label={t('common.field.title')}>{props.history.code}</DescriptionsItem>

      </Descriptions>}
      <Space className={'w-full justify-center'}
             direction={'horizontal'}
             size={16}>

      </Space>
    </Space>
  )
}

export default Info
