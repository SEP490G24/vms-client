import React from 'react'
import { ConfirmResultsWrapper } from './styles.ts'
import DescriptionsItem from 'antd/es/descriptions/Item'
import { Badge, Descriptions } from 'antd'

interface ConfirmResultsWrapperArgs {
}

const ConfirmResults: React.FC<ConfirmResultsWrapperArgs> = () => {
  // const { t } = useTranslation()


  return (
    <ConfirmResultsWrapper>
      <Descriptions bordered>
        <DescriptionsItem label={'Product'} span={3}>
          Cloud Database
        </DescriptionsItem>
        <DescriptionsItem label={'Room'} span={3}>
          Room Meeting 2
        </DescriptionsItem>
        <DescriptionsItem label={'Order time'} span={3}>
          2018-04-24 18:00:00
        </DescriptionsItem>
        <DescriptionsItem label={'Status'} span={3}>
          <Badge status='processing' text='Running' />
        </DescriptionsItem>
      </Descriptions>
    </ConfirmResultsWrapper>
  )
}

export default ConfirmResults
