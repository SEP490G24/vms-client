import React, { memo } from 'react'
import { Pagination } from 'antd'

interface SharedPaginationProps {
  current: number
  defaultCurrent?: number
  total: number
  disabled?: boolean
  pageSize: number
  onChangePage?: (page: number, pageSize: number) => void
  showSizeChanger?:boolean
  size?: 'default' | 'small' | 'middle';
}
export const SharedPagination: React.FC<SharedPaginationProps> = memo(
  ({ current, defaultCurrent, disabled, total, pageSize = 10, onChangePage ,showSizeChanger, size}) => {
    return (
      <Pagination
        size={size}
        current={current}
        defaultCurrent={defaultCurrent}
        total={total}
        disabled={disabled}
        pageSize={pageSize}
        onChange={onChangePage}
        showSizeChanger={showSizeChanger}
        responsive
      />
    )
  },
)
