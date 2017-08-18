import { Link } from 'react-router'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { arrayToCssShorthand, screen, linkHoverFadeOut, resetLinkStyle } from 'shared/style-utils'
import { colors, fonts } from 'shared/common-variables'

const styles = {
  imgLanscape: {
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
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  ${screen.mobileOnly`
    padding: ${arrayToCssShorthand(styles.postBoxPadding.mobile)};
    width: 100%;
  `}
  ${screen.tabletOnly`
    width: ${styles.imgLanscape.tablet.width}px;
  `}
  ${screen.desktopAbove`
    width: ${styles.imgLanscape.desktop.width}px;
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
  width: ${styles.imgLanscape.mobile.width}px;
  order: 1;
  ${screen.tabletAbove`
    width: ${styles.imgLanscape.tablet.width}px;
    order: 2;
  `}
  flex: 0 0 auto;
  img {
    object-fit: cover;
    width: ${styles.imgLanscape.mobile.width}px;
    height: ${styles.imgLanscape.mobile.height}px;
    ${screen.tabletOnly`
      width: ${styles.imgLanscape.tablet.width}px;
      height: ${styles.imgLanscape.tablet.height}px;
    `}
    ${screen.desktopAbove`
      width: ${styles.imgLanscape.desktop.width}px;
      height: ${styles.imgLanscape.desktop.height}px;
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
          <img src={imgUrl} alt={title} />
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
