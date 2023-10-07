import { HomeWrapper } from './styles.ts'
import { Space } from 'antd'
import { SharedButton } from '~/common'
import { HomeStatistic } from './Statistics'
import { HomeChart } from './Charts'
import { HomeReport } from './Reports'
import { PageTitle } from '~/components'
import Title from 'antd/es/typography/Title'
import { authService } from '~/service'

const Home = () => {

  const downloadHandler = () => {
  }
  const searchHandler = () => {
  }

  return (
    <HomeWrapper>
      <Space className={'w-full'} direction={'vertical'} size={20}>
        <PageTitle title={'OVERVIEW'} />
        <Title level={5} className={'flex items-center mb-0'}>
          <span>The latest update (2023.07.12)</span>
          <SharedButton className={'w-[26px] h-[26px] ml-4 text-[14px]'} type='primary'
                        onClick={() => authService.doLogout()} />
        </Title>
        <HomeStatistic />
        <HomeChart />
        <HomeReport downloadHandler={downloadHandler} searchHandler={searchHandler} />
      </Space>
    </HomeWrapper>
  )
}

export default Home
