import React from 'react'
import { Form, FormProps, Radio, Switch } from 'antd'
import { FieldType, FormField } from '~/interface/FormField.ts'
import { ListView } from '~/components/ListView'
import { SharedCheckbox, SharedInput } from '~/common'
import { SharedSelect } from '~/common/SharedSelect'

interface FormGeneratorProps extends FormProps {
  formFields?: FormField[];
  children: any
}

const FormGenerator = (props: FormGeneratorProps) => {

  let subComponentList = Object.keys(FormGenerator)

  let subComponents = subComponentList.map((key) => {
    return React.Children.map(props.children, (child) =>
      child.type.name === key ? child : null
    )
  })

  return (
    <Form
      labelCol={props.labelCol}
      wrapperCol={props.wrapperCol}
      layout={props.layout}
      form={props.form}
      initialValues={props.initialValues}
      onFinish={props.onFinish}
      colon={props.colon}
      className={props.className}
      labelAlign={props.labelAlign}
    >
      <ListView>
        {subComponents.map((component) => component)}
      </ListView>
    </Form>
  )
}

interface FormGeneratorItemProps {
  nested?: string
  formField: FormField;
  children?: React.ReactNode;
}

const Item = (props: FormGeneratorItemProps) => {
  const { formField, nested } = props

  const render = () => {
    switch (formField.type) {
      case FieldType.Input.toString():
        return <SharedInput placeholder={formField.placeholder} />
      case FieldType.Checkbox.toString():
        return <SharedCheckbox defaultChecked={formField.optionConfigs?.['defaultChecked']} />
      case FieldType.Select.toString():
        return <SharedSelect placeholder={formField.placeholder}
                             options={formField.optionConfigs?.['options']}
                             filterOption={formField.optionConfigs?.['filterOption']}
                             showSearch={formField.optionConfigs?.['showSearch']} />
      case FieldType.Radio.toString():
        return <Radio defaultChecked={formField.optionConfigs?.['defaultChecked']} />
      case FieldType.Switch.toString():
        return <Switch checked={formField.optionConfigs?.['checked']} />
    }
  }

  return (
    <Form.Item label={formField.label} name={nested ? `${nested}.${formField.key}` : formField.key}>
      {render()}
    </Form.Item>
  )
}
FormGenerator.Item = Item

export default FormGenerator
