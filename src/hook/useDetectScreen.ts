import { useEffect, useState } from 'react'

export enum ScreenType {
  MOBILE, TABLET, DESKTOP
}

const useDetectScreen = () => {
  const [screen, setScreen] = useState<ScreenType>(ScreenType.DESKTOP)

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setScreen(ScreenType.MOBILE)
    } else if (window.innerWidth <= 1024) {
      setScreen(ScreenType.TABLET)
    } else setScreen(ScreenType.DESKTOP)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
  })

  return { screen }

}

export { useDetectScreen }
