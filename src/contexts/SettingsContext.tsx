import { createContext, useState, type PropsWithChildren } from 'react'

export interface SettingsContextType {
  theme: 'dark' | 'light'
  minDuration: number
  switchTheme: () => void
  setMinDuration: (newValue: number) => void
}

export const SettingsContext = createContext<SettingsContextType>({
  theme: 'dark',
  minDuration: 15,
  switchTheme: () => { },
  setMinDuration: () => { }
})

const SettingsContextProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<SettingsContextType['theme']>('dark')
  const [minDuration, setMinDuration] = useState(15)

  const switchThemeHandler = () => {
    setTheme(lastTheme => lastTheme === 'dark' ? 'light' : 'dark')
  }

  const context: SettingsContextType = {
    theme,
    minDuration,
    setMinDuration,
    switchTheme: switchThemeHandler
  }

  return (
    <SettingsContext.Provider value={context}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsContextProvider
