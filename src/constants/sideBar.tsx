
import {
  PATH_HOME,
} from '~/routes/paths'
import {DesktopOutlined } from '~/icon'

export const SIDE_BARS = [
  {
    key: PATH_HOME,
    icon: <DesktopOutlined className={'text-[24px]'} />,
    title: 'Overview',
    path: PATH_HOME,
    children: [],
  },
]
