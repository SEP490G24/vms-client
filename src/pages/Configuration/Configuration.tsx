import { ConfigurationWrapper } from './styles.ts'
import { Card, Col, Divider, Menu, MenuProps, Row, Space, Switch } from 'antd'
import { useTranslation } from 'react-i18next'
import { CalendarOutlined, MailOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { ListView } from '~/components/ListView'
import { SharedButton, SharedInput } from '~/common'
import Title from 'antd/es/typography/Title'

const Configuration = () => {
  const navigate = useNavigate()

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

  const handleNavigate = (key: string) => {
    navigate(key)
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
                    onSelect={({ key }) => handleNavigate(key)}
                    mode={'inline'}
                    items={profileNavs}>
              </Menu>
            </Card>
          </Col>
          <Col flex={'auto'}>
            <Card title={'Configuration'}>
              <ListView className={'gap-4'}>
                <Row className={'w-full'} gutter={24} align={'middle'}>
                  <Col span={4} className={'min-w-[240px]'}><Title level={5}> Use Card </Title></Col>
                  <Col flex={1}><SharedInput></SharedInput></Col>
                  <Col><SharedButton type={'primary'}>Save</SharedButton></Col>
                </Row>
                <Row className={'w-full'} gutter={24} align={'middle'}>
                  <Col span={4}><strong> Use Card </strong></Col>
                  <Col flex={1}><Switch></Switch></Col>
                  <Col><SharedButton type={'primary'}>Save</SharedButton></Col>
                </Row>
                <Row className={'w-full'} gutter={24} align={'middle'}>
                  <Col span={4}><strong> Use Card </strong></Col>
                  <Col flex={1}><Switch></Switch></Col>
                  <Col><SharedButton type={'primary'}>Save</SharedButton></Col>
                </Row>
              </ListView>
            </Card>
          </Col>
        </Row>
      </Space>
    </ConfigurationWrapper>
  )
}

export default Configuration
