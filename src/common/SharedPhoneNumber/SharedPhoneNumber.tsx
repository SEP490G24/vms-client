import { Form, Input, InputRef } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { SharedInput, SharedSelect } from '~/common'
import { PhoneNumberWrapper } from './styles'
import { useTranslation } from 'react-i18next'

interface SharedInputProps {
  title?: string
  value?: string
  defaultValue?: {
    countryCode: string
    phone: string
  }
  onChangeCode: (e: string) => void
  onChangePhone: (e: string) => void
}

export const SharedPhoneNumber: React.FC<SharedInputProps> = React.memo(
  ({ title, value, defaultValue, onChangeCode, onChangePhone, ...rest }) => {
    const { t } = useTranslation()
    // const [countryCode] = useDataApi(
    //   {
    //     url: `${USER.BASE_PATH}`,
    //     method: AxiosMethod.GET,
    //     useToken: true,
    //     transfer: (data: any) => {
    //       if (data?.length > 0) {
    //         return data.map((item: any) => {
    //           return {
    //             value: item.name,
    //             label: item.name,
    //             key: item.code,
    //           }
    //         })
    //       }
    //     },
    //   },
    //   [],
    // )

    const countryCode = [{
      value: '09',
      label: '+84',
      key: '+84'
    },
      {
        value: '036',
        label: '+126',
        key: '+126'
      }]

    const [code, setCode] = useState<string>()
    const [middle, setMiddle] = useState<string>()

    useEffect(() => {
      setCode(defaultValue?.countryCode ?? '')
      setMiddle(defaultValue?.phone ?? '')
    }, [defaultValue])

    const phoneIngredientRefs = {
      middle: useRef<InputRef>(),
      last: useRef<InputRef>()
    }

    return (
      <PhoneNumberWrapper>
        {title && <p className='input-label'>{title}</p>}
        <Input style={{ display: 'none' }} {...rest}></Input>
        <div style={{ display: 'flex' }}>
          <Form.Item style={{ marginBottom: 'unset' }} name={'countryCode'} rules={[{ required: true }]}>
            <SharedSelect
              className='vms-select'
              value={code}
              style={{ width: 120 }}
              onSelect={() => phoneIngredientRefs.middle.current?.input?.focus()}
              onChange={(value) => {
                onChangeCode(value)
                setCode(value)
              }}
              options={countryCode}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 'unset', width: '100%', marginLeft: '5px' }}
            name={'phoneNumber'}
            rules={[{ required: true }]}
          >
            <SharedInput
              value={middle}
              myRef={phoneIngredientRefs.middle}
              inputMode={'tel'}
              placeholder={t('common.placeholder.phoneNumber')}
              maxLength={10}
              onChange={(e) => {
                onChangePhone(e.target.value)
                setMiddle(e.target.value)
              }}
            />
          </Form.Item>
        </div>
      </PhoneNumberWrapper>
    )
  }
)
