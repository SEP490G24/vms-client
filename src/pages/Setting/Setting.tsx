import { SettingWrapper } from './styles.ts'
import { Card, Col, Divider, Menu, message, Row, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { ListView } from '~/components/ListView'
import { useEffect, useState } from 'react'
import { settingGroupService, settingService, settingSiteService, SITE_ID } from '~/service'
import { SettingDto, SettingGroupDto, SettingSiteDto } from '~/interface/Setting.ts'
import { SettingItem } from '~/pages/Setting/SettingItem'

const Setting = () => {

  const { t } = useTranslation()
  const [settingGroups, setSettingGroups] = useState<SettingGroupDto[]>([])
  const [settings, setSettings] = useState<SettingDto[]>([])
  const [settingSiteValues, setSettingSiteValues] = useState<SettingSiteDto>()
  const [settingGroupIdSelected, setSettingGroupIdSelected] = useState('')

  useEffect(() => {
    settingGroupService.findAll().then((response) => {
      const [firstElement] = response.data
      setSettingGroups(response.data)
      setSettingGroupIdSelected(firstElement.id)
    })
  }, [])

  useEffect(() => {
    settingGroupIdSelected && handleGroup(settingGroupIdSelected)
  }, [settingGroupIdSelected])

  const handleGroup = (key: any) => {
    settingService.findAll(key).then((response) => {
      setSettings(response?.data)
    })
    settingSiteService.findAllBySiteIdAndGroupId(SITE_ID, key).then((response) => {
      setSettingSiteValues(response?.data)
    })
  }

  const handleSave = (settingId: number, value: string) => {
    settingSiteService.update({
      settingId,
      value
    }).then(() => message.success(t('common.message.success.save')))
      .catch(() => message.error(t('common.message.error')))
  }

  return (
    <SettingWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('configuration.title')}</h2>
          <Divider type='vertical' />
        </Space>
        <Row gutter={24} wrap={false}>
          <Col span={5}>
            <Card title={'Group Setting'}>
              <Menu className={'w-full'}
                    defaultSelectedKeys={['1']}
                    onSelect={({ key }) => setSettingGroupIdSelected(key)}
                    mode={'inline'}
                    items={settingGroups.map((settingGroup) => {
                      return { key: settingGroup.id, label: settingGroup.name }
                    })}>
              </Menu>
            </Card>
          </Col>
          <Col flex={'auto'}>
            <Card title={'Setting'}>
              <ListView className={'gap-4'}>
                {settings.map((setting) => <SettingItem key={setting.id} setting={setting}
                                                        defaultValue={setting.defaultValue}
                                                        value={settingSiteValues?.settings?.[setting.code]}
                                                        onSaveSetting={(value) => handleSave(setting.id, value)}
                />)}
              </ListView>
            </Card>
          </Col>
        </Row>
      </Space>
    </SettingWrapper>
  )
}

export default Setting
