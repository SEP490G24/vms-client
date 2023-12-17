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
import { SCOPE_ROLE_MAP } from '~/role'
import { SharedButton, SharedSelect } from '~/common'
import { useSelector } from 'react-redux'
import { sitesSelector } from '~/redux'

const Setting = () => {

  const { t } = useTranslation()
  const [settingGroups, setSettingGroups] = useState<SettingGroupDto[]>([])
  const [settings, setSettings] = useState<SettingDto[]>([])
  const [settingSiteValues, setSettingSiteValues] = useState<SettingSiteDto>()
  const [settingGroupIdSelected, setSettingGroupIdSelected] = useState('')
  const [siteId, setSiteId] = useState<string>()
  const [load, setLoad] = useState(false)
  const { sites } = useSelector(sitesSelector)

  useEffect(() => {
    settingGroupService.findAll().then((response) => {
      const [firstElement] = response.data
      setSettingGroups(response.data)
      if (!settingGroupIdSelected) {
        setSettingGroupIdSelected(firstElement.id)
      }
    })
  }, [load])

  useEffect(() => {
    if (checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION)) setSiteId(sites?.[0]?.id)
  }, [sites])

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

  const handleSetDefault = () => {
    settingService.setDefault(siteId).then(() => {
      message.success(t('common.message.success.save'))
      setLoad(!load)
    }).catch((error) => message.error(error.data.message))
  }
  const handleSave = (settingId: number, value: string) => {
    settingSiteService.update({
      siteId: siteId,
      settingId,
      value
    }).then(() => message.success(t('common.message.success.save')))
      .catch((error) => message.error(error.data.message))
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
                <SharedSelect className={'w-full'} bordered={false} options={sites.map((site) => {
                  return { label: site.name, value: site.id, disabled: !site.enable }
                }) ?? []}
                              value={siteId}
                              onChange={setSiteId}
                              placeholder={t('common.placeholder.site')}></SharedSelect>
              </Col>
            </Row>
          }
        </Space>
        {/*<AuthSection permissions={PERMISSION_ROLE_MAP.R_SETTING_FILTER}>*/}
        {((checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION) && siteId) || !checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION)) &&
          <Row gutter={24} wrap={false}>
            <Col span={5}>
              <Card title={'Group Setting'}

              >
                <Menu className={'w-full'}
                      defaultSelectedKeys={[settingGroupIdSelected]}
                      onSelect={({ key }) => setSettingGroupIdSelected(key)}
                      mode={'inline'}
                      items={settingGroups.map((settingGroup) => {
                        return { key: settingGroup.id, label: settingGroup.name }
                      })}>
                </Menu>
              </Card>
            </Col>
            <Col flex={'auto'}>
              <Card title={'Setting'}
                    extra={<SharedButton
                      // permissions={PERMISSION_ROLE_MAP.R_USER_CREATE}
                      type='primary'
                      onClick={handleSetDefault}
                    >
                      {t('common.button.setting_default')}
                    </SharedButton>}>
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
        {/*</AuthSection>*/}
      </Space>
    </SettingWrapper>
  )
}

export default Setting
