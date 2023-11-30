import { Descriptions, Divider, Form } from 'antd'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CreateCustomerInfo } from '~/service'
import { CustomerDto } from '~/interface'
import DescriptionsItem from 'antd/es/descriptions/Item'

interface CreateCustomerFormArgs {
  customer?: CustomerDto
  onSave: (customer: CreateCustomerInfo) => void
  onClose: () => void
}

const Info: React.FC<CreateCustomerFormArgs> = (props) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
    if (props.customer) {
      form.setFieldsValue({
        visitorName: props.customer.visitorName,
        identificationNumber: props.customer.identificationNumber,
        phoneNumber: props.customer.phoneNumber,
        email: props.customer.email,
        provinceId: props.customer.provinceId,
        districtId: props.customer.districtId,
        communeId: props.customer.communeId,
        description: props.customer.description,
      })
    }
  }, [props.customer])


  return (
    <>
      <Divider orientation={'left'}>{t('common.field.customer_detail')}</Divider>
      <Descriptions bordered>
        <DescriptionsItem span={3}
                          label={t('common.field.visitorName')}>{props.customer?.visitorName}</DescriptionsItem>
        <DescriptionsItem span={3}
                          label={t('common.field.phoneNumber')}>{props.customer?.phoneNumber}</DescriptionsItem>
        <DescriptionsItem span={3}
                          label={t('common.field.identificationNumber')}>{props.customer?.identificationNumber}</DescriptionsItem>
        <DescriptionsItem span={3}
                          label={t('common.field.email')}>{props.customer?.email}</DescriptionsItem>
        <DescriptionsItem span={3}
                          label={t('common.field.province')}>{props.customer?.provinceName}</DescriptionsItem>
        <DescriptionsItem span={3}
                          label={t('common.field.district')}>{props.customer?.districtName}</DescriptionsItem>
        <DescriptionsItem span={3}
                          label={t('common.field.commune')}>{props.customer?.communeName}</DescriptionsItem>
      </Descriptions>
    </>
  )
}

export default Info
