import Link from 'react-router/lib/Link'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { arrayToCssShorthand, screen, linkHoverFadeOut, resetLinkStyle } from 'shared/style-utils'
import { colors, fonts } from 'shared/common-variables'
import Image from '../image'

const styles = {
  imgLandscape: {
    mobile: {
      width: 122,
      height: 92,
    },
    tablet: {
      width: 220,
      height: 125,
    },
    desktop: {
      width: 278,
      height: 125,
    },
  },
  textBlockPadding: {
    mobile: [10, 0, 10, 12],
    tablet: [11, 11, 11, 11],
    desktop: [11, 14, 11, 14],
  },
  postBoxPadding: {
    mobile: [12, 5],
  },
}

const PostBox = styled(Link)`
  display: flex;
  ${screen.mobileOnly`
    padding: ${arrayToCssShorthand(styles.postBoxPadding.mobile)};
    width: 100%;
  `}
  ${screen.tabletOnly`
    width: ${styles.imgLandscape.tablet.width}px;
  `}
  ${screen.desktopAbove`
    width: ${styles.imgLandscape.desktop.width}px;
  `}
  ${screen.tabletAbove`
    border: solid .5px ${colors.lineGrey};
    overflow: hidden;
    flex-direction: column;
  `}
  ${resetLinkStyle}
  ${linkHoverFadeOut}
`

const PostImage = styled.div`
  width: ${styles.imgLandscape.mobile.width}px;
  order: 1;
  ${screen.tabletAbove`
    width: ${styles.imgLandscape.tablet.width}px;
    order: 2;
  `}
  flex: 0 0 auto;
  > div {
    width: ${styles.imgLandscape.mobile.width}px;
    height: ${styles.imgLandscape.mobile.height}px;
    ${screen.tabletOnly`
      width: ${styles.imgLandscape.tablet.width}px;
      height: ${styles.imgLandscape.tablet.height}px;
    `}
    ${screen.desktopAbove`
      width: ${styles.imgLandscape.desktop.width}px;
      height: ${styles.imgLandscape.desktop.height}px;
    `}
  }
`
const PostText = styled.div`
  color: ${colors.textGrey};
  font-weight: ${fonts.weight.bold};
  font-size: ${fonts.size.medium};
  line-height: 1.5;
  flex: 1 1 auto;
  white-space: normal;
  order: 2;
  ${screen.tabletAbove`
    order: 1;
  `}
  padding: ${arrayToCssShorthand(styles.textBlockPadding.mobile)};
  ${screen.tabletOnly`
    padding: ${arrayToCssShorthand(styles.textBlockPadding.tablet)};
    line-height: 1.33;
  `}
  ${screen.desktopAbove`
    padding: ${arrayToCssShorthand(styles.textBlockPadding.desktop)};
    line-height: 1.25;
  `}
`

class PostItem extends PureComponent {
  render() {
    const { title, imgUrl, linkTo, linkTarget } = this.props
    return (
      <PostBox to={linkTo} target={linkTarget}>
        <PostImage>
          <div>
            <Image
              src={imgUrl}
              alt={title}
            />
          </div>
        </PostImage>
        <PostText>{title}</PostText>
      </PostBox>
    )
  }
}

PostItem.propTypes = {
  title: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
  linkTarget: PropTypes.oneOf(['_blank']),
}

PostItem.defaultProps = {
  linkTarget: null,
}

export default PostItem
