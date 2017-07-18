import React from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
import { colors, fonts } from '../shared/common-variables'
import get from 'lodash/get'
import { date2yyyymmdd } from '../shared/utils'
import { media, truncate } from '../shared/style-utils'
import BookmarkIcon from '../../static/bookmark.svg'

const _ = {
  get,
}

const styles = {
  desktop: {
    imageWidth: 209, // px
    imageHeight: 209, // px
    imageBoxPadding: [32, 32, 35, 20], // px
    textBoxPadding: [32, 32, 35, 0], // px
  },
  tablet: {
    imageWidth: 181, // px
    imageHeight: 181, // px
    imageBoxPadding: [32, 32, 35, 20], // px
    textBoxPadding: [32, 32, 35, 0], // px
  },
  mobile: {
    imageHeight: 121, // px
    imageBoxPadding: [22, 22, 22, 22], // px
    textBoxPadding: [0, 21, 26, 21], // px
  },
}

const BookmarkContainer = styled.li`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background-color: ${colors.itemBgWhite};

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  ${media.largeMobile`
    flex-direction: column;
    align-items: center;
  `}
  margin: 0;
  margin-bottom: 15px;
  :last-of-type {
    margin-bottom: 0;
  }
`

const ImageBox = styled.div`
  padding: ${styles.desktop.imageBoxPadding.map(value => `${value}px`).join(' ')};
  ${media.tablet`
    padding: ${styles.tablet.imageBoxPadding.map(value => `${value}px`).join(' ')};
  `}
  ${media.largeMobile`
    padding: ${styles.mobile.imageBoxPadding.map(value => `${value}px`).join(' ')};
    width: 100%;
  `}
  box-sizing: border-box;
  flex-basis: auto;
  flex-grow: 0;
  line-height: 1;
`
const Image = styled.img`
  object-fit: cover;
  width: ${styles.desktop.imageWidth}px;
  height: ${styles.desktop.imageHeight}px;
  ${media.tablet`
    width: ${styles.tablet.imageWidth}px;
    height: ${styles.tablet.imageHeight}px;
  `}
  ${media.largeMobile`
    width: 100%;
    height: ${styles.mobile.imageHeight}px;
  `}
  line-height: 1;
`

const TextBox = styled.div`
  padding: ${styles.desktop.textBoxPadding.map(value => `${value}px`).join(' ')};
  min-height: ${styles.desktop.imageHeight + styles.desktop.imageBoxPadding[0] + styles.desktop.imageBoxPadding[2]}px;
  ${media.tablet`
    padding: ${styles.tablet.textBoxPadding.map(value => `${value}px`).join(' ')};
    min-height: ${styles.tablet.imageHeight + styles.tablet.imageBoxPadding[0] + styles.tablet.imageBoxPadding[2]}px;
  `}
  ${media.largeMobile`
    padding: ${styles.mobile.textBoxPadding.map(value => `${value}px`).join(' ')};
    min-height: 0;
    width: 100%;
  `}
  position: relative;
  flex-basis: auto;
  flex-grow: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`

const Category = styled.div`
  font-size: ${fonts.size.large};
  margin-bottom: .8em;
  ${media.largeMobile`
    font-size: ${fonts.size.base};
    margin-bottom: .5em;
  `}
  line-height: 1;
  box-sizing: border-box;
  color: ${colors.warmGrey};
  flex-basis: auto;
  flex-grow: 0;
`

const Title = styled.div`
  font-size: ${fonts.size.title.bookmark};
  line-height: 1.41;
  margin-bottom: 18px;
  ${media.largeMobile`
    font-size: ${fonts.size.title.bookmarkMobile};
    line-height: 1.55;
    margin-bottom: 0;
  `}
  font-weight: ${fonts.weight.bold};
  color: ${colors.bookmarkTextGrey};
  box-sizing: border-box;
  flex-basis: auto;
  flex-grow: 0;
`

const Description = styled.div`
  box-sizing: border-box;
  width: 98%;
  color: ${colors.bookmarkTextGrey};
  font-size: ${fonts.size.large};
  ${truncate('relative', 1.57, 2, colors.sectionWhite, 'justify')};
  flex-basis: auto;
  flex-grow: 0;
  ${media.largeMobile`
    flex-basis: 0;
    display: none;
  `}
`

const InfoRow = styled.div`
  margin-top: 33px;
  font-size: ${fonts.size.large};
  ${media.tablet`
    margin-top: 40px;
  `}
  ${media.largeMobile`
    margin-top: 29px;
    font-size: ${fonts.size.medium};
    
  `}
  width: 100%;
  line-height: 1;
  min-height: 1em;
  position: relative;
  flex-basis: auto;
  flex-grow: 1;
`

const Info = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
`

const AuthorInfo = styled.span`
  max-width: 50%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const AuthorTitle = styled.span`
  margin-right: 1em;
  ${media.largeMobile`
    margin-right: .8em;
  `}
  vertical-align: top;
`

const AuthorName = styled.span`
  vertical-align: top;
`

const Date = styled.span`
  margin-left: 2.2em;
  ${media.largeMobile`
    margin-left: 1em;
  `}
  vertical-align: top;
  font-weight: ${fonts.weight.light};
  color: ${colors.greyishBrown};
`

const RemoveBookMarkBtn = styled.div`
  bottom: ${styles.desktop.textBoxPadding[2]}px;
  right: ${styles.desktop.textBoxPadding[1]}px;
  ${media.tablet`
    bottom: ${styles.tablet.textBoxPadding[2]}px;
    right: ${styles.tablet.textBoxPadding[1]}px;
  `}
  ${media.largeMobile`
    bottom: ${styles.mobile.textBoxPadding[2]}px;
    right: ${styles.mobile.textBoxPadding[1]}px;
  `}
  position: absolute;
  line-height: 1;
  svg {
    width: 15px;
    height: auto;
  }
`

class Bookmark extends React.Component {
  render() {
    const {
      imgSrc,
      category,
      title,
      description,
      authorTitle,
      authorName,
      publishDate } = _.get(this.props, 'bookmarkData', {})
    return (
      <BookmarkContainer>
        <ImageBox>
          <Image src={imgSrc} />
        </ImageBox>
        <TextBox>
          <Category>{category}</Category>
          <Title>{title}</Title>
          <Description>
            {description}
          </Description>
          <InfoRow>
            <Info>
              <AuthorInfo>
                <AuthorTitle>{authorTitle}</AuthorTitle>
                <AuthorName>{authorName}</AuthorName>
              </AuthorInfo>
              <Date>{date2yyyymmdd(publishDate, '.')}</Date>
            </Info>
          </InfoRow>
        </TextBox>
        <RemoveBookMarkBtn>
          <BookmarkIcon />
        </RemoveBookMarkBtn>
      </BookmarkContainer>
    )
  }
}

export default Bookmark
