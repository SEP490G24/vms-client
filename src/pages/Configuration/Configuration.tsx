import { ConfigurationWrapper } from './styles.ts'
import { Card, Col, Divider, Menu, MenuProps, Row, Space } from 'antd'
import { useTranslation } from 'react-i18next'
import { CalendarOutlined, MailOutlined } from '@ant-design/icons'
import { ListView } from '~/components/ListView'
import { ConfigurationItem } from '~/pages/Configuration/ConfigurationItem'

const Configuration = () => {

  const { t } = useTranslation()

  const profileNavs: MenuProps['items'] = [
    {
      key: 'info',
      label: t('user.profile.label'),
      icon: <MailOutlined className={'text-lg bg-[#f2f5f8] p-2 rounded'} />
    },
    {
      key: 'security',
      label: t('user.security.label'),
      icon: <CalendarOutlined className={'text-lg bg-[#f2f5f8] p-2 rounded'} />
    }
  ]

  const handleGroup = (key: string) => {
    console.log(key)
    // navigate(key)
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
                    items={profileNavs}>
              </Menu>
            </Card>
          </Col>
          <Col flex={'auto'}>
            <Card title={'Configuration'}>
              <ListView className={'gap-4'}>
                <ConfigurationItem configuration={{ name: 'Email Host', type: 'input' }}></ConfigurationItem>
                <ConfigurationItem configuration={{ name: 'Email Host', type: 'switch' }}></ConfigurationItem>
                <ConfigurationItem configuration={{ name: 'Email Host', type: 'select' }}></ConfigurationItem>
              </ListView>
            </Card>
          </Col>
        </Row>
      </Space>
    </ConfigurationWrapper>
  )
}

export default Configuration
