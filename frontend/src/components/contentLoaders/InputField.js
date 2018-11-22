import React from 'react'
import styled, { css } from 'styled-components'

import { shimmerKeyframe } from '_contentLoaders'

const InputField = styled.div`
  width: 100%;
  height: 50px;
  margin-bottom: 1rem;
  background-size: 100% 50px;
  position: relative;
  borderRadius: '5px'
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  animation-fill-mode: forwards;
  animation: ${props => css`${shimmerKeyframe('-100vw', '100vw')}`} 2s linear infinite;
`

export { InputField }