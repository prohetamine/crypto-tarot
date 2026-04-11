import { Outlet } from 'react-router'
import * as Redstone from '@prohetamine/redstone'
import styled from 'styled-components'
import { BlockBody, LineVertical, MiddleSmallFont } from './global-components'
import { useContext } from 'react'
import { LanguageContext } from './lib/language.jsx'

const Body = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0px;
  width: 100%;
`

const Navigation = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
`

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 10px;
`

export const ShadowOverflow = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    gap: 0px;
    border-radius: 30px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.25);
    align-content: stretch;
    align-items: stretch;
`

const App = () => {
  const { isConnected, open } = Redstone.useApp()
      , lang = useContext(LanguageContext)
  
  return (
    <Body>
      <Navigation>
        <ShadowOverflow style={{ flexDirection: 'row' }}>
          <BlockBody onClick={() => open()} style={{ borderRadius: '30px 0px 0px 30px', cursor: 'pointer', userSelect: 'none' }}>
            <MiddleSmallFont>
              {isConnected ? lang.data.wallet : lang.data.connect}
            </MiddleSmallFont>
          </BlockBody>
          <LineVertical />
          <BlockBody onTap={() => lang.setLang(lang.lang === 'en' ? 'ru' : 'en')} style={{ borderRadius: '0px 30px 30px 0px', cursor: 'pointer', userSelect: 'none' }}>
            <MiddleSmallFont>
              {lang.lang === 'en' ? '🇷🇺' : '🇺🇸'}
            </MiddleSmallFont>
          </BlockBody>
        </ShadowOverflow>
      </Navigation>
      <Content>
        <Outlet />
      </Content>
    </Body>
  )
}

export default App
