import { SettingWrapper } from './styles.ts'
import { Card, Col, Menu, message, Row, Space } from 'antd'
import { v4 as uuid } from 'uuid'
import { useTranslation } from 'react-i18next'
import { ListView } from '~/components/ListView'
import { useEffect, useState } from 'react'
import { settingGroupService, settingService, settingSiteService } from '~/service'
import { SettingDto, SettingGroupDto, SettingSiteDto } from '~/interface/Setting.ts'
import { SettingItem } from '~/pages/Setting/SettingItem'
import { checkPermission } from '~/utils'
import { PERMISSION_ROLE_MAP, SCOPE_ROLE_MAP } from '~/role'
import { SharedSelect } from '~/common'
import { useSelector } from 'react-redux'
import { sitesSelector } from '~/redux'
import { AuthSection } from '~/auth'

const Setting = () => {

  const { t } = useTranslation()
  const [settingGroups, setSettingGroups] = useState<SettingGroupDto[]>([])
  const [settings, setSettings] = useState<SettingDto[]>([])
  const [settingSiteValues, setSettingSiteValues] = useState<SettingSiteDto>()
  const [settingGroupIdSelected, setSettingGroupIdSelected] = useState('')
  const [siteId, setSiteId] = useState()

  const { sites } = useSelector(sitesSelector)

  useEffect(() => {
    settingGroupService.findAll().then((response) => {
      const [firstElement] = response.data
      setSettingGroups(response.data)
      setSettingGroupIdSelected(firstElement.id)
    })
  }, [])

  useEffect(() => {
    settingGroupIdSelected && handleGroup(settingGroupIdSelected)
  }, [settingGroupIdSelected, siteId])

  const handleGroup = (groupId: any) => {
    if (!checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) || siteId) {
      settingService.findAll(groupId, siteId).then((response) => {
        setSettings(response?.data)
      })
      settingSiteService.findAllByGroupId(groupId, siteId).then((response) => {
        setSettingSiteValues(response?.data)
      })
    }
  }

  const handleSave = (settingId: number, value: string) => {
    settingSiteService.update({
      settingId,
      value
    }).then(() => message.success(t('common.message.success.save')))
      .catch(() => message.error(t('common.message.error.save')))
  }

  return (
    <SettingWrapper>
      <Space direction='vertical' size={24} style={{ width: '100%' }}>
        <Space direction={'vertical'} size={8}>
          <h2>{t('configuration.title')}</h2>
          {checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) &&
            <Row className={'w-full gap-2'} align={'middle'}>
              <Col flex={'none'}><span className={'text-muted'}>Site: </span></Col>
              <Col flex={'auto'}>
                <SharedSelect className={'w-full'} allowClear options={sites.map((site) => {
                  return { label: site.name, value: site.id, key: site.id }
                }) ?? []}
                              onChange={setSiteId}
                              placeholder={t('common.placeholder.site')}></SharedSelect>
              </Col>
            </Row>
          }
        </Space>
        <AuthSection permissions={PERMISSION_ROLE_MAP.R_SETTING_FIND}>
          {((checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) && siteId) || !checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION)) &&
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
                    {settings.map((setting) => <SettingItem key={uuid()} setting={setting}
                                                            defaultValue={setting.defaultValue}
                                                            value={settingSiteValues?.settings?.[setting.code]}
                                                            onSaveSetting={(value) => handleSave(setting.id, value)}
                    />)}
                  </ListView>
                </Card>
              </Col>
            </Row>
          }
        </AuthSection>
      </Space>
    </SettingWrapper>
  )
}

export default Setting
