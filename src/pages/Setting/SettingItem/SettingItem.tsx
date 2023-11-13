import React, { useEffect, useState } from 'react'
import { Col, Row, Space } from 'antd'
import { SharedButton, SharedInput, SharedSelect } from '~/common'
import Title from 'antd/es/typography/Title'
import { SettingDto, SettingType } from '~/interface/Setting.ts'

interface PageTitleProps {
  setting: SettingDto,
  value?: string
  defaultValue: string,
  onSaveSetting: (value: string) => void
}

export const SettingItem: React.FC<PageTitleProps> = React.memo((props) => {

  const [value, setValue] = useState<string>('')

  useEffect(() => {
    setValue(props.value ?? props.defaultValue)
  }, [])

  const save = () => {
    props.onSaveSetting(value)
  }

  const settingField = (type: string) => {
    switch (type) {
      case SettingType.INPUT : {
        return <SharedInput defaultValue={props.value ?? props.defaultValue}
                            onChange={(event) => setValue(event.target.value)}></SharedInput>
      }
      case SettingType.SWITCH: {
        return <SharedSelect className={'w-full'}
                             defaultValue={props.value ?? props.defaultValue}
                             options={[{ label: 'TRUE', value: 'true' }, { label: 'FALSE', value: 'false' }]}
                             onChange={setValue}></SharedSelect>
      }
      case SettingType.API: {
        const options = JSON.parse(props.setting.valueList ?? '[]')
        options.unshift({ label: 'Default', value: props.defaultValue })
        return <SharedSelect className={'w-full'}
                             defaultValue={props.value ?? props.defaultValue}
                             options={options} onChange={setValue}></SharedSelect>
      }
      case SettingType.SELECT : {
        return <SharedSelect className={'w-full'}
                             defaultValue={props.value ?? props.defaultValue}
                             options={JSON.parse(props.setting.valueList ?? '[]')} onChange={setValue}></SharedSelect>
      }
    }
  }

  return (
    <Space className={'w-full'} direction={'vertical'}>
      <Title level={5} className={'mb-0'}>{props.setting.name}</Title>
      <span className={'text-muted'}>{props.setting.description}</span>
      <Row gutter={32}>
        <Col flex={1}>{settingField(props.setting.type)}</Col>
        <Col><SharedButton type={'primary'} onClick={save}>Save</SharedButton></Col>
      </Row>
    </Space>
  )
})
