import { createContext, useState, type PropsWithChildren } from 'react'

interface MinDurationContextType {
  minDuration: number
  setMinDuration: (newValue: number) => void
}

export const MinDurationContext = createContext<MinDurationContextType>({
  minDuration: 15,
  setMinDuration: () => { }
})

const MinDurationContextProvider = ({ children }: PropsWithChildren) => {
  const [minDuration, setMinDuration] = useState(15)

  const context: MinDurationContextType = { minDuration, setMinDuration }

  return (
    <MinDurationContext.Provider value={context} >
      {children}
    </MinDurationContext.Provider>
  )
}

export default MinDurationContextProvider
