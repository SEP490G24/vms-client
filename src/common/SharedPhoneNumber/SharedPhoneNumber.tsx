import { Form, Input, InputRef } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { SharedInput, SharedSelect } from '~/common'
import { PhoneNumberWrapper } from './styles'
import { useTranslation } from 'react-i18next'
import { REGEX } from '~/constants'
import { Data } from '~/data'

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
    const COUNTRY_CODE = Object.entries(Data.COUNTRY_CODE).map((key, index) => {
      return {
        value: key[0],
        label: key[1],
        key: index
      }
    })

    const [code, setCode] = useState<string>(defaultValue?.countryCode ?? '')

    useEffect(() => {
      setCode(defaultValue?.countryCode ?? '')
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
          <Form.Item style={{ marginBottom: 'unset' }} name={'countryCode'}>
            <SharedSelect
              showSearch={true}
              placeholder={'+'}
              className='vms-select'
              value={code}
              style={{ width: 120 }}
              onSelect={() => phoneIngredientRefs.middle.current?.input?.focus()}
              onChange={(value) => {
                onChangeCode(value)
                setCode(value)
              }}
              options={COUNTRY_CODE}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 'unset', width: '100%', marginLeft: '5px' }}
            name={'phoneNumber'}
            rules={[{ pattern: REGEX.PHONE, message: t('common.error.phoneNumber_valid') }]}
          >
            <SharedInput
              myRef={phoneIngredientRefs.middle}
              inputMode={'tel'}
              placeholder={t('common.placeholder.phoneNumber')}
              maxLength={10}
              onChange={(e) => {
                onChangePhone(e.target.value)
              }}
            />
          </Form.Item>
        </div>
      </PhoneNumberWrapper>
    )
  }
)
