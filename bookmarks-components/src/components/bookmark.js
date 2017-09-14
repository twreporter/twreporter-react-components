import React from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
import get from 'lodash/get'
import BookmarkIcon from '../../static/bookmark.svg'
// import { AUTHORS } from 'shared/constants'
import { date2yyyymmdd } from 'shared/utils'
import { media, truncate, screen } from 'shared/style-utils'
import { Link } from 'react-router'
import { colors, fonts } from 'shared/common-variables'
import { LINK_PREFIX } from 'shared/link-prefix'

const _ = {
  get,
}

const READ_MORE = '閱讀更多...'

// const authorsKey = ['writers', 'photographers', 'designers', 'engineers']

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

const BookmarkFrame = styled.div`
  margin: 0;
  margin-bottom: 15px;
`

const BookmarkContentContainer = styled.li`
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

const ReadMore = styled.div`
  font-size: 18px;
  text-align: left;
  color: #8c8c8c;
  font-size: ${fonts.size.large};
  cursor: pointer;
  margin-top: 1em;
`

const InfoRow = styled.div`
  margin-top: 27px;
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
/*
const AuthorInfo = styled.span`
  max-width: 50%;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const AuthorTitle = styled.div`
  width: 38px;
  text-align: center;
  margin-right: 1em;
  ${media.largeMobile`
    margin-right: .8em;
  `}
  vertical-align: top;
  display: inline-block;
`

const AuthorName = styled.span`
  vertical-align: top;
`
*/

const Date = styled.span`
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
  cursor: pointer;
`

// BookmarkContainer

const PageContainer = styled.div`
  box-sizing: border-box;
  padding: 50px 0;
  margin: 0;
`

const Column = styled.div`
  margin: 0 auto;
  box-sizing: border-box;
  width: 97%;
  max-width: 834px;
  ${screen.tabletOnly`
    width: 100%;
    max-width: 707px;
  `}
  ${screen.mobileOnly`
    width: 100%;
  `}
`

const StatusBar = styled.div`
  ${screen.mobileOnly`
    padding-left: 1em;
  `}
  box-sizing: border-box;
  padding-bottom: 25px;
  width: 100%;
`

const CountTitle = styled.span`
  font-size: ${fonts.size.xlarge};
  ${screen.mobileOnly`
    font-size: ${fonts.size.large};
  `}
  margin-right: 1em;
`
const CountNumber = styled.span`
  font-size: ${fonts.size.xlarge};
  ${screen.mobileOnly`
    font-size: ${fonts.size.large};
  `}
  font-weight: ${fonts.weight.bold};
`

const BookmarksContainer = styled.ul`
  margin: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
`

const CustomizedLink = ({ children, isExternal, slug, host }) => {
  if (isExternal) {
    return (
      <a href={`${host}/${LINK_PREFIX.INTERACTIVE_ARTICLE}/${slug}`}>
        {children}
      </a>
    )
  }
  return (
    <Link to={`${LINK_PREFIX.ARTICLE}/${slug}`}>
      {children}
    </Link>
  )
}

const BookmarkIconComp = styled(BookmarkIcon)`
  &:hover {
    path {
      fill: #99000a;
      transition: fill 200ms linear;
    }
  }
`

class Bookmark extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleBookmarkIconOnClick = this._handleBookmarkIconOnClick.bind(this)
  }

  _handleBookmarkIconOnClick(slug) {
    this.props.handleBookmarkIconOnClick(slug)
  }

  render() {
    const {
      thumbnail,
      category,
      title,
      desc,
      published_date,
      slug,
      is_external,
      host,
    } = _.get(this.props, 'bookmarkData', {})

    /* After consulting with designers, we reach the concensus that
       authorGroup is not necessary.

    const authorsObj = JSON.parse(authors)
    const keyToLabelMap = {
      writers: AUTHORS.WRITERS,
      photographers: AUTHORS.PHOTOGRAPHERS,
      designers: AUTHORS.DESIGNERS,
      engineers: AUTHORS.ENGINEERS,
    }

    const AuthorGroup = authorsKey.map((key) => {
      const contributorArr = authorsObj[key]
      const jobTitle = keyToLabelMap[key]
      if (contributorArr) {
        return contributorArr.map((a) => {
          return (
            <div>
              <AuthorTitle>{jobTitle}</AuthorTitle>
              <AuthorName>{a.name}</AuthorName>
            </div>
          )
        })
      }
    })
    <AuthorInfo>
      {AuthorGroup}
    </AuthorInfo>
    */
    return (
      <BookmarkFrame>
        <BookmarkContentContainer>
          <ImageBox>
            <Image src={thumbnail} />
          </ImageBox>
          <TextBox>
            <Category>{category}</Category>
            <CustomizedLink isExternal={is_external} slug={slug} host={host}>
              <Title>{title}</Title>
            </CustomizedLink>
            <Description>
              {desc}
            </Description>
            <CustomizedLink isExternal={is_external} slug={slug} host={host}>
              <ReadMore>{READ_MORE}</ReadMore>
            </CustomizedLink>
            <InfoRow>
              <Info>
                <Date>{date2yyyymmdd(published_date * 1000, '.')}</Date>
              </Info>
            </InfoRow>
          </TextBox>
          <RemoveBookMarkBtn>
            <BookmarkIconComp
              onClick={() => { this.handleBookmarkIconOnClick(slug) }}
            />
          </RemoveBookMarkBtn>
        </BookmarkContentContainer>
      </BookmarkFrame>
    )
  }
}

Bookmark.propTypes = {
  handleBookmarkIconOnClick: React.PropTypes.func.isRequired,
}

class BookmarkContainer extends React.Component {
  render() {
    const bookmarksJSX = this.props.bookmarkData.map((bookmark) => {
      return (
        <Bookmark
          key={`bookmark_${_.get(bookmark, 'id', 0)}`}
          bookmarkData={bookmark}
          handleBookmarkIconOnClick={this.props.handleBookmarkIconOnClick}
        />
      )
    })
    return (
      <PageContainer>
        <Column>
          <StatusBar>
            <CountTitle>全部</CountTitle>
            <CountNumber>{this.props.total}</CountNumber>
          </StatusBar>
          <BookmarksContainer>
            {bookmarksJSX}
          </BookmarksContainer>
        </Column>
      </PageContainer>
    )
  }
}

BookmarkContainer.defaultProps = {
  bookmarkData: [],
  total: 0,
}

BookmarkContainer.propTypes = {
  bookmarkData: React.PropTypes.array,
  total: React.PropTypes.number,
  handleBookmarkIconOnClick: React.PropTypes.func.isRequired,
}

CustomizedLink.propTypes = {
  children: React.PropTypes.element.isRequired,
  isExternal: React.PropTypes.bool.isRequired,
  slug: React.PropTypes.string.isRequired,
  host: React.PropTypes.string.isRequired,
}

export default BookmarkContainer
