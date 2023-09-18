import React from 'react'
import { Empty } from 'antd'

interface SharedEmptyProps {
  description?: React.ReactNode;
  children?: React.ReactNode | string;
  image?: React.ReactNode;
}

export const SharedEmpty: React.FC<SharedEmptyProps> = React.memo((props) => {
  return (
    <Empty
      image={props.image ?? 'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'}
      imageStyle={{ height: 60 }}
      description={props.description}
    >
      {props.children}
    </Empty>
  )
})
