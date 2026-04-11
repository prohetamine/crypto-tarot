/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react'

export const SelectIdContext = createContext(undefined)

export const SelectIdProvider = ({ children }) => {
  const [id, setId] = useState(0)

  return (
    <SelectIdContext.Provider 
      value={{ 
        id, 
        setId
      }}
    >
      {children}
    </SelectIdContext.Provider>
  )
}
