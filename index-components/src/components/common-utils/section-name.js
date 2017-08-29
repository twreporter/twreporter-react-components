import styled from 'styled-components'
import { finalMedia } from '../../utils/style-utils'
import { fonts } from '../../styles/common-variables'

const SectionName = styled.div`
  display: none;
  ${finalMedia.mobile`
    display: block;
    font-size: ${fonts.size.small};
    position: absolute;
    letter-spacing: 0.4px;
    z-index: 3;
    top: -8px;
    left: 0;
    right: 0;
    text-align: center;
    >span {
      color: #fff;
      padding-left: 5px;
      padding-right: 5px;
      background-color: #c3000b;
    }
  `}
`

export default SectionName
