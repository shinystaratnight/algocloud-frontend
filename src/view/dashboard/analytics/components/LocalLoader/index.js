import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { useDarkModeManager } from '../../contexts/LocalStorage'
import logo1 from '../../assets/logo_white.png';
import logo2 from '../../assets/logo.png';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Loader = styled.div`
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  img {
    animation: ${rotate} 2000ms linear infinite;
  }
  & > * {
    width: 256px;
  }
  height: 100vh;
`

const LocalLoader = ({ fill }) => {
  const [darkMode] = useDarkModeManager()

  return (
    <Loader fill={fill}>
      <img src={darkMode ? logo1 : logo2} alt="loading-icon" />
    </Loader>
  )
}

export default LocalLoader
