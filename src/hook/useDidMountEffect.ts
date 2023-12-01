import { useEffect, useRef } from 'react'

const useDidMountEffect = (effect: () => void, deps: any) => {
  const didMount = useRef(false)

  useEffect(() => {
    if (didMount.current) effect()
    else didMount.current = true
  }, deps)
}

export default useDidMountEffect
