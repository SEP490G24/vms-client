import React, { useEffect, useState } from 'react'
import { Col, Row, Switch } from 'antd'
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
        return <Switch defaultChecked={props.configuration.value} onClick={setValue}></Switch>
      }
      case 'select' : {
        return <SharedSelect options={props.configuration.valueList?.map((option) => {
          return { label: option, value: option }
        }) ?? []} onChange={setValue}></SharedSelect>
      }
    }
  }

  return (
    <Row className={'w-full'} gutter={24} align={'middle'}>
      <Col span={4} className={'min-w-[240px]'}><Title level={5}> {props.configuration.name} </Title></Col>
      <Col flex={1}>{configurationField(props.configuration.type)}</Col>
      <Col><SharedButton type={'primary'} onClick={save}>Save</SharedButton></Col>
    </Row>
  )
})
