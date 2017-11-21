import ContentWrapper from './section-content-wrapper'
import { finalMedia } from '../../utils/style-utils'

const Section = ContentWrapper.extend`
  position: relative;
  padding-top: 100px;
  padding-bottom: 80px;
  ${finalMedia.mobile`
    padding-top: 30px;
    padding-bottom: 60px;
  `}
`

export default Section
