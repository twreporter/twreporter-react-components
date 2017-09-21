import { zIndex } from '../../constants/style-variables'
import styled from 'styled-components'

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${zIndex.content};
  font-style: normal;
`

export default ContentContainer
