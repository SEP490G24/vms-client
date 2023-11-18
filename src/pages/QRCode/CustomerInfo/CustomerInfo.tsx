import React from 'react'
import { useTranslation } from 'react-i18next'
import { CustomerDto } from '~/interface'
import { Card, Descriptions, Divider, QRCode, Space } from 'antd'
import DescriptionsItem from 'antd/es/descriptions/Item'


interface FilterArgs {
  checkInCode: string
  customerInfo: CustomerDto
}

const CustomerInfo: React.FC<FilterArgs> = (props) => {
  const { t } = useTranslation()

  return (
    <Card title={'QR Code Data'}>
      <Space direction={'vertical'} align={'center'}>
        <QRCode value={`${window.location.origin}/check-in/${props.checkInCode}`} />
        <Divider orientation={'center'}><strong>Customer Info</strong></Divider>
        <Descriptions className={'px-4'}>
          <DescriptionsItem label={t('common.field.name')} span={3}>
            {props.customerInfo.visitorName}
          </DescriptionsItem>
          <DescriptionsItem label={t('common.field.identificationNumber')} span={3}>
            {props.customerInfo.identificationNumber}
          </DescriptionsItem>
          <DescriptionsItem label={t('common.field.email')} span={3}>
            {props.customerInfo.email}
          </DescriptionsItem>
          <DescriptionsItem label={t('common.field.phoneNumber')} span={3}>
            {props.customerInfo.phoneNumber}
          </DescriptionsItem>
          <DescriptionsItem label={t('common.field.description')} span={3}>
            {props.customerInfo.description}
          </DescriptionsItem>
        </Descriptions>
      </Space>
    </Card>
  )
}
export default CustomerInfo
