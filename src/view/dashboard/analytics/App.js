import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo/client'
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import { useHistory } from 'react-router'
import GlobalPage from './pages/GlobalPage'
import TokenPage from './pages/TokenPage'
import PairPage from './pages/PairPage'
import { useGlobalData, useGlobalChartData } from './contexts/GlobalData'
import { isAddress } from './utils'
import AccountPage from './pages/AccountPage'
import AllTokensPage from './pages/AllTokensPage'
import AllPairsPage from './pages/AllPairsPage'
import PinnedData from './components/PinnedData'

import SideNav from './components/SideNav'
import AccountLookup from './pages/AccountLookup'
import { OVERVIEW_TOKEN_BLACKLIST, PAIR_BLACKLIST } from './constants'
import LocalLoader from './components/LocalLoader'
import { useLatestBlock } from './contexts/Application'
import bg from './bg.png'

import Web3 from 'web3'

import { isMobile } from 'react-device-detect'
import ThemeProvider, { GlobalStyle } from './Theme'
import LocalStorageContextProvider, { Updater as LocalStorageContextUpdater } from './contexts/LocalStorage'
import TokenDataContextProvider, { Updater as TokenDataContextUpdater } from './contexts/TokenData'
import GlobalDataContextProvider from './contexts/GlobalData'
import PairDataContextProvider, { Updater as PairDataContextUpdater } from './contexts/PairData'
import ApplicationContextProvider from './contexts/Application'
import UserContextProvider from './contexts/User'

const WarningWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const WarningBanner = styled.div`
  background-color: ${({ theme }) => theme.bg1};
  padding: 1.5rem;
  color: white;
  width: 100%;
  text-align: center;
  font-weight: 500;
`

const AppWrapper = styled.div`
  position: relative;
  width: 100%;
  background-image: url(${bg});
  background-size: 100% auto;
`
const ContentWrapper = styled.div`
  display: grid;
  // grid-template-columns: ${({ open }) => (open ? '220px 1fr 200px' : '220px 1fr 64px')};
  grid-template-columns: 1fr;
  @media screen and (max-width: 1400px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 1080px) {
    grid-template-columns: 1fr;
    max-width: 100vw;
    overflow: hidden;
    grid-gap: 0;
  }
`

const Right = styled.div`
  position: fixed;
  right: 0;
  bottom: 0rem;
  z-index: 99;
  width: ${({ open }) => (open ? '220px' : '64px')};
  height: ${({ open }) => (open ? 'fit-content' : '64px')};
  overflow: scroll;
  @media screen and (max-width: 1400px) {
    display: none;
  }
`

const Center = styled.div`
  height: 100%;
  z-index: 9999;
  transition: width 0.25s ease;
  background-color: ${({ theme }) => theme.onlyLight};
`

/**
 * Wrap the component with the header and sidebar pinned tab
 */
const LayoutWrapper = ({ children, savedOpen, setSavedOpen }) => {
  return (
    <>
      <ContentWrapper open={savedOpen}>
        <Center id="center">{children}</Center>
        {/* <Right open={savedOpen}>
          <PinnedData open={savedOpen} setSavedOpen={setSavedOpen} />
        </Right> */}
      </ContentWrapper>
    </>
  )
}

function ContextProviders({ children }) {
  return (
    <LocalStorageContextProvider>
      <ApplicationContextProvider>
        <TokenDataContextProvider>
          <GlobalDataContextProvider>
            <PairDataContextProvider>
              <UserContextProvider>{children}</UserContextProvider>
            </PairDataContextProvider>
          </GlobalDataContextProvider>
        </TokenDataContextProvider>
      </ApplicationContextProvider>
    </LocalStorageContextProvider>
  )
}

function Updaters() {
  return (
    <>
      <LocalStorageContextUpdater />
      <PairDataContextUpdater />
      <TokenDataContextUpdater />
    </>
  )
}

function Analytics() {
  const [savedOpen, setSavedOpen] = useState(false)
  const [bscLatestBlock, setBscLatestBlock] = useState()
  const globalData = useGlobalData()
  const globalChartData = useGlobalChartData()
  const latestBlock = useLatestBlock()
  // const headBlock = useHeadBlock() // show warning// //
  const web3 = new Web3(new Web3.providers.HttpProvider('https://bsc-dataseed.binance.org/'))

  useEffect(() => {
    async function getCurrentBlock() {
      const block = await web3.eth.getBlock('latest')
      setBscLatestBlock(block.number)
    }
    getCurrentBlock()
  }, [web3.eth])

  const blockDiff = bscLatestBlock - latestBlock
  const timeDiff = parseInt((blockDiff * 3) / 60)

  console.log('latestBlock = ', latestBlock);
  console.log('globalData = ', globalData);
  console.log('globalChartData = ', globalChartData);
  
  console.log(latestBlock &&
    globalData &&
    Object.keys(globalData).length > 0 &&
    globalChartData &&
    Object.keys(globalChartData).length > 0);

  return (
    <ContextProviders>
    <Updaters />
    <ThemeProvider>
      <>
        <GlobalStyle />
        <ApolloProvider client={client}>
          <AppWrapper>
            {timeDiff > 10 && (
              <WarningWrapper>
                <WarningBanner>
                  {`>> Site has synced to block ${latestBlock} / ${bscLatestBlock} (app. ${timeDiff} mins behind) <<`}
                </WarningBanner>
              </WarningWrapper>
            )}
            {/* <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
              <GlobalPage />
            </LayoutWrapper> */}
            {
            globalData &&
            Object.keys(globalData).length > 0 &&
            globalChartData &&
            Object.keys(globalChartData).length > 0 ? (<>
                  {/* <Route
                    exacts
                    strict
                    path="/dashboard/token/:tokenAddress"
                    render={({ match }) => {
                      if (OVERVIEW_TOKEN_BLACKLIST.includes(match.params.tokenAddress.toLowerCase())) {
                        return <Redirect to="/dashboard/home" />
                      }
                      if (isAddress(match.params.tokenAddress.toLowerCase())) {
                        return (
                          <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                            <TokenPage address={match.params.tokenAddress.toLowerCase()} />
                          </LayoutWrapper>
                        )
                      } else {
                        return <Redirect to="/dashboard/home" />
                      }
                    }}
                  />
                  <Route
                    exacts
                    strict
                    path="/dashboard/pair/:pairAddress"
                    render={({ match }) => {
                      if (PAIR_BLACKLIST.includes(match.params.pairAddress.toLowerCase())) {
                        return <Redirect to="/dashboard/home" />
                      }
                      if (isAddress(match.params.pairAddress.toLowerCase())) {
                        return (
                          <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                            <PairPage pairAddress={match.params.pairAddress.toLowerCase()} />
                          </LayoutWrapper>
                        )
                      } else {
                        return <Redirect to="/dashboard/home" />
                      }
                    }}
                  />
                  <Route
                    exacts
                    strict
                    path="/dashboard/account/:accountAddress"
                    render={({ match }) => {
                      if (isAddress(match.params.accountAddress.toLowerCase())) {
                        return (
                          <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                            <AccountPage account={match.params.accountAddress.toLowerCase()} />
                          </LayoutWrapper>
                        )
                      } else {
                        return <Redirect to="/dashboard/home" />
                      }
                    }}
                  />

                  <Route path="/dashboard/home">
                    <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                      <GlobalPage />
                    </LayoutWrapper>
                  </Route>

                  <Route path="/dashboard/tokens">
                    <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                      <AllTokensPage />
                    </LayoutWrapper>
                  </Route>

                  <Route path="/dashboard/pairs">
                    <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                      <AllPairsPage />
                    </LayoutWrapper>
                  </Route>

                  <Route path="/dashboard/accounts">
                    <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                      <AccountLookup />
                    </LayoutWrapper>
                  </Route>

                  <Redirect to="/dashboard/home" /> */}
                  <LayoutWrapper savedOpen={savedOpen} setSavedOpen={setSavedOpen}>
                      <GlobalPage />
                    </LayoutWrapper>
                  </>
            ) : (
              <LocalLoader fill="true" />
            )}
          </AppWrapper>
        </ApolloProvider>
        
        </>
    </ThemeProvider>
  </ContextProviders>
  )
}

export default Analytics
