import React from 'react'

const useForceUpdate = () => {
  return React.useReducer(() => ({}), {})[1] as () => void
}

export { useForceUpdate }
