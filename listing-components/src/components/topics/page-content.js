import styled from 'styled-components'
import { screen, resetLinkStyle } from 'shared/style-utils'

const styles = {
  contentWidth: {
    min: 300, // px
    mobile: 95, // %
    tablet: 700, // px
    desktop: 870, // px
  },
  titlePadding: 0,
  titleMargin: {
    mobile: [0, 0, 19, 0],
    tablet: [0, 0, 33, 0],
  },
}

const PageContent = styled.div`
  min-width: ${styles.contentWidth.min}px;
  width: ${styles.contentWidth.mobile}%;
  ${screen.tabletOnly`
    width: ${styles.contentWidth.tablet}px;
  `}
  ${screen.desktopAbove`
    width: ${styles.contentWidth.desktop}px;
  `}
  margin: 0 auto;
  ${resetLinkStyle}
`

export default PageContent
