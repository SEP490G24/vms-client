import { Card, Form, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SharedButton, SharedFilterPeriod, SharedFilterScope, SharedInput, SharedSelect } from '~/common'
import { DateRadioRange, DepartmentDto, RoleDto } from '~/interface'
import { departmentService, roleService, UserFilterPayload } from '~/service'
import { DATE_TIME } from '~/constants'

interface FilterArgs {
  onFilter: (filterPayload: UserFilterPayload) => void
}

const Filter: React.FC<FilterArgs> = (args) => {
  const { t } = useTranslation()
  const [form] = Form.useForm()
  const [departments, setDepartments] = useState<DepartmentDto[]>([])
  const [roles, setRoles] = useState<RoleDto[]>([])
  const [valueDate, setValueDate] = useState<DateRadioRange>()
  const [siteFilter, setSiteFilter] = useState('')


  useEffect(() => {
    departmentService.filter({ siteId: siteFilter }).then((response) => setDepartments(response.data))
    roleService.getBySiteId([siteFilter]).then((response) => setRoles(response.data))
    form.resetFields(['departmentId', 'roleId'])
  }, [siteFilter])


  const onFinish = (values: any) => {
    const payload: UserFilterPayload = {
      departmentId: values['departmentId'],
      role: values['role'],
      siteId: values['siteId'],
      keyword: values['keyword'],
      createdOnStart: valueDate?.date?.['0']?.format(DATE_TIME.START_DAY),
      createdOnEnd: valueDate?.date?.['1']?.format(DATE_TIME.START_DAY)
    }
    args.onFilter(payload)
  }

  const onReset = () => {
    setValueDate(undefined)
    setSiteFilter('')
    form.resetFields()
    args.onFilter({})
  }

  return (
    <Card
      title={t('organization.user.search.title')}
      extra={
        <Space>
          <SharedButton onClick={onReset}>{t('common.label.reset')}</SharedButton>
          <SharedButton
            type={'primary'}
            // permissions={BUTTON_ROLE_MAP.R_USER_FIND}
            onClick={form.submit}
          >
            {t('common.label.search')}
          </SharedButton>
        </Space>
      }
      bordered={false}
      className='vms-card filter-card'
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        layout={'horizontal'}
        form={form}
        initialValues={{ layout: 'horizontal' }}
        colon={false}
        labelAlign='left'
        className='vms-form'
        onFinish={onFinish}
      >
        <SharedFilterScope siteId={siteFilter} onChangeSite={setSiteFilter} />
        {siteFilter &&
          <>
            <Form.Item label={t('common.field.department')} name='departmentId'>
              <SharedSelect options={departments.map((department) => {
                return { label: department.name, value: department.id, key: department.id }
              }) ?? []}
                            placeholder={t('common.placeholder.department')} />
            </Form.Item>
            <Form.Item label={t('common.field.role')} name='role'>
              <SharedSelect options={roles.map((role) => {
                return { label: role.code, value: role.code }
              })}
                            placeholder={t('common.placeholder.role')} />
            </Form.Item>
          </>
        }
        <Form.Item label={t('organization.user.search.counselor')} name='keyword'>
          <SharedInput
            placeholder={t('organization.user.search.counselor_placeholder')}
          />
        </Form.Item>
        <SharedFilterPeriod valueDate={valueDate} setValueDate={setValueDate} />
      </Form>
    </Card>
  )
}
export default Filter
