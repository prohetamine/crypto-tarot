/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react'
import styled from 'styled-components'
import icon from './../assets/icons/logo.svg'
import { AnimatePresence, motion } from 'framer-motion'
import background from './../assets/background.png'

export const LoadingContext = createContext(undefined)

const Body = styled(motion.div)`
  position: fixed;
  z-index: 99999;
  left: 0px; 
  top: 0px;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('${background}');
  background-size: cover;
  background-repeat: no-repeat;
`

const Icon = styled(motion.div)`
  width: 140px;
  height: 140px;
  background-image: url('${icon}');
`

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)

  return (
    <LoadingContext.Provider 
      value={{ 
        loading,
        setLoading
      }}
    >
      <AnimatePresence>
        {
          loading 
            ? (
              <Body
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Icon 
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                />
              </Body>
            ) 
            : null
        }
      </AnimatePresence>
      {children}
    </LoadingContext.Provider>
  )
}
