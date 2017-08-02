import { keyframes } from 'styled-components'

export const changeSize = (size, valueFrom, valueTo) => keyframes`
  from {
    ${size}: ${valueFrom};
  }
  to {
    ${size}: ${valueTo};
  }
`

export const changeOpacity = (valueFrom, valueTo) => keyframes`
  from {
    opacity: ${valueFrom};
  }
  to {
    opacity: ${valueTo};
  }
`
