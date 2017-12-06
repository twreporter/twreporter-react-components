import styled from 'styled-components'
import { colors } from '../../styles/common-variables'
import { breakPoints } from '../../utils/style-utils'

const HoverEffect = styled.div`
  cursor: pointer;
  text-decoration: none;
  color: ${colors.textGrey};
  @media (min-width: ${breakPoints.tabletMinWidth}) {
    &:hover {
      opacity: 0.7;
    }
    transition: 200ms opacity linear;  
  }
`
export default HoverEffect
