import { keyframes } from 'styled-components'

export const changeSize = (size, valueFrom, valueTo) => keyframes`
  from {
    ${size}: ${valueFrom};
  }
  to {
    ${size}: ${valueTo};
  }
`
