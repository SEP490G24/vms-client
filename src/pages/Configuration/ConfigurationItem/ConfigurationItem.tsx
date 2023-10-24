import React, { useEffect, useState } from 'react'
import { Col, Row, Space } from 'antd'
import { SharedButton, SharedInput, SharedSelect } from '~/common'
import { ConfigurationDto } from '~/interface'
import Title from 'antd/es/typography/Title'

interface PageTitleProps {
  configuration: ConfigurationDto
}

export const ConfigurationItem: React.FC<PageTitleProps> = React.memo((props) => {

  const [value, setValue] = useState<string | boolean | number | undefined>()

  useEffect(() => {
    setValue(props.configuration.value)
  }, [props.configuration])

  const save = () => {
    console.log(value)
  }

  const configurationField = (type: string) => {
    switch (type) {
      case 'input' : {
          return <SharedInput defaultValue={props.configuration.value}
                              onChange={(event) => setValue(event.target.value)}></SharedInput>
      }
      case 'switch' : {
        return <SharedSelect className={'w-full'} options={[{ label: 'TRUE', value: 'true' }, { label: 'FALSE', value: 'false' }]} onChange={setValue}></SharedSelect>
      }
      case 'select' : {
        return <SharedSelect className={'w-full'} options={props.configuration.valueList?.map((option) => {
          return { label: option, value: option }
        }) ?? []} onChange={setValue}></SharedSelect>
      }
    }
  }

  return (
    <Space className={'w-full'} direction={'vertical'}>
      <Title level={5} className={'mb-0'}>{props.configuration.name} </Title>
      <span className={'text-muted'}>Description</span>
      <Row gutter={32}>
        <Col flex={1}>{configurationField(props.configuration.type)}</Col>
        <Col><SharedButton type={'primary'} onClick={save}>Save</SharedButton></Col>
      </Row>
    </Space>
  )
})
