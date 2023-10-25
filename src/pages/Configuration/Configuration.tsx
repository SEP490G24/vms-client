import { ConfigurationWrapper } from './styles.ts'
import { Card, Col, Divider, Menu, message, Row, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { ListView } from '~/components/ListView'
import { ConfigurationItem } from '~/pages/Configuration/ConfigurationItem'
import { useEffect, useState } from 'react'
import { settingGroupService, settingService, settingSiteService, SITE_ID } from '~/service'
import { SettingDto, SettingGroupDto, SettingSiteDto } from '~/interface/Setting.ts'

const Configuration = () => {

  const { t } = useTranslation()
  const [settingGroups, setSettingGroups] = useState<SettingGroupDto[]>([])
  const [settings, setSettings] = useState<SettingDto[]>([])
  const [settingSiteValues, setSettingSiteValues] = useState<SettingSiteDto>()

  useEffect(() => {
    settingGroupService.findAll().then((response) => {
      setSettingGroups(response?.data)
    })
  }, [])

  const handleGroup = (key: any) => {
    settingService.findAll(key).then((response) => {
      setSettings(response?.data)
    })
    settingSiteService.findAllBySiteIdAndGroupId(SITE_ID, key).then((response) => {
      setSettingSiteValues(response?.data)
    })
  }

  const handleSave = (settingId: number, value: string) => {
    settingSiteService.update({ siteId: SITE_ID, settingId, value }).then((response) => {
      console.log(response)
    }).then(() => message.success(t('common.message.success.save')))
  }

  return (
    <ConfigurationWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space>
          <h2>{t('configuration.title')}</h2>
          <Divider type='vertical' />
        </Space>
        <Row gutter={24} wrap={false}>
          <Col flex={'none'} style={{ width: 450 }}>
            <Card title={'Group Configuration'}>
              <Menu className={'w-full'}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    onSelect={({ key }) => handleGroup(key)}
                    mode={'inline'}
                    items={settingGroups.map((settingGroup) => {
                      return { key: settingGroup.id, label: settingGroup.name }
                    })}>
              </Menu>
            </Card>
          </Col>
          <Col flex={'auto'}>
            <Card title={'Configuration'}>
              <ListView className={'gap-4'}>
                {settings.map((setting, index) => <ConfigurationItem key={index} setting={setting}
                                                                     defaultValue={setting.defaultValue}
                                                                     value={settingSiteValues?.settings?.[setting.code]}
                                                                     onSaveSetting={(value) => handleSave(setting.id, value)}
                />)}
              </ListView>
            </Card>
          </Col>
        </Row>
      </Space>
    </ConfigurationWrapper>
  )
}

export default Configuration
