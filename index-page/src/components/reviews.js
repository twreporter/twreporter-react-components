import BottomLink from './common-utils/bottom-link'
import CategoryName from './common-utils/category-name'
import ImgWrapper from './common-utils/img-wrapper'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import MobileListUtils from './common-utils/mobile-list'
import PropTypes from 'prop-types'
import React from 'react'
import SectionAnimationWrapper from './animations/section-animation-wrapper'
import SectionName from './common-utils/section-name'
import sectionStrings from '../constants/section-strings'
import Section from './common-utils/section'
import TRLink from './common-utils/twreporter-link'
import get from 'lodash/get'
import postPropType from './prop-types/post'
import styled from 'styled-components'
import { fonts, colors } from '../styles/common-variables'
import { getHref } from '../utils/getHref'
import { breakPoints, finalMedia, truncate } from '../utils/style-utils'

const _ = {
  get,
}

const mockup = {
  img: {
    sizes: {
      desktop: '312px',
      tablet: '160px',
      mobile: '279px',
    },
  },
}

const desktopMinWidth = breakPoints.desktopMinWidth
const tabletMaxWidth = breakPoints.tabletMaxWidth
const tabletMinWidth = breakPoints.tabletMinWidth
const mobileWidth = breakPoints.mobileMaxWidth
const maxSwipableItems = 3
const moreText = '更多評論文章'

const Container = Section.extend`
  background-color: white;
  @media(max-width: ${tabletMaxWidth}) {
    padding-top: 36px;
  }
`

const FlexBox = styled.div`
  display: flex;
  padding: 0 47px;
  justify-content: center;
  @media(max-width: ${tabletMaxWidth}) {
    padding: 0 35px;
  }
  @media(max-width: ${mobileWidth}) {
    display: none;
  }
`

const FlexItem = styled.div`
  width: 312px;
  &:nth-child(3) {
    margin-left: 32.6px;
  }
  &:nth-child(even) {
    margin-left: 32.6px;
  }
  ${finalMedia.desktop`
    width: 210px;
    &:nth-child(3) {
      margin-left: 30px;
    }
    &:nth-child(even) {
      margin-left: 30px;
    }
  `}
  ${finalMedia.tablet`
    width: 160px;
    &:nth-child(3) {
      margin-left: 20px;
    }
    &:nth-child(even) {
      margin-left: 20px;
    }
  `}
  ${finalMedia.mobile`
    margin-top: 10px;
    width: 100%;
  `}
`
const ImgFrame = styled.div`
  width: 100%;
  height: 202px;
  ${finalMedia.desktop`
    height: 138px;
  `}
  ${finalMedia.tablet`
    height: 102px;
  `}
  ${finalMedia.mobile`
    height: 186px;
  `}
`

const TextFrame = styled.div`
  margin: 12px auto 0 auto;
  width: 92%;
`

const Category = CategoryName.extend`
  line-height: 1.33;
  @media(max-width: ${mobileWidth}) {
    margin-top: 9px;
  }
`

const Title = styled.div`
  margin-top: 2px;
  font-size: ${fonts.size.title.base};
  font-weight: ${fonts.weight.bold};
  line-height: 1.5;
  ${finalMedia.tablet`
    width: 144px;
  `}
  color: ${colors.textGrey};
`

const Description = styled.div`
  margin-top: 8px;
  font-size: ${fonts.size.medium};
  color: ${colors.textGrey};
  ${finalMedia.tablet`
    width: 144px;
  `}
  ${finalMedia.mobile`
    font-size: ${fonts.size.large};
  `}
  ${truncate('relative', 1.5, 5, 'white')}
`

const More = styled.div`
  text-align: center;
  margin-top: 60px;
`

class Reviews extends React.PureComponent {
  render() {
    const { data, moreURI, useTinyImg } = this.props
    const ReviewsItem = data.map((post) => {
      const style = _.get(post, 'style', '')
      const href = getHref(_.get(post, 'slug', 'error'), style)
      return (
        <FlexItem
          key={_.get(post, 'id')}
        >
          <TRLink href={href} redirect={style === 'interactive'}>
            <ImgFrame>
              <ImgWrapper
                alt={_.get(post, 'hero_image.description')}
                src={_.get(post, ['hero_image', 'resized_targets', useTinyImg ? 'tiny' : 'mobile', 'url'])}
                srcSet={_.get(post, 'hero_image.resized_targets', '')}
                sizes={
                  `(min-width: ${desktopMinWidth}) ${mockup.img.sizes.desktop}, ` +
                  `(min-width: ${tabletMinWidth}) ${mockup.img.sizes.tablet}, ` +
                  `${mockup.img.sizes.mobile}`
                }
              />
            </ImgFrame>
            <TextFrame>
              <Category>
                {_.get(post, 'subtitle', '')}
              </Category>
              <Title>
                {_.get(post, 'title', '')}
              </Title>
              <Description>
                {_.get(post, 'og_description', '')}
              </Description>
            </TextFrame>
          </TRLink>
        </FlexItem>
      )
    })
    return (
      <Container
        mobileWidth={mobileWidth}
      >
        <SectionName
          mobileWidth={mobileWidth}
        >
          <span>{sectionStrings.review}</span>
        </SectionName>
        <FlexBox>
          {ReviewsItem}
        </FlexBox>
        <MobileListUtils
          maxWidth={mobileWidth}
        >
          <MobileFlexSwipeable.SwipableFlexItems
            alignItems={'flex-start'}
            mobileWidth={mobileWidth}
            maxSwipableItems={maxSwipableItems}
          >
            {ReviewsItem}
          </MobileFlexSwipeable.SwipableFlexItems>
        </MobileListUtils>
        <More>
          <BottomLink
            text={moreText}
            path={moreURI}
          />
        </More>
      </Container>
    )
  }
}

Reviews.defaultProps = {
  data: [],
  moreURI: 'categories/reviews',
  useTinyImg: false,
}

Reviews.propTypes = {
  data: PropTypes.arrayOf(postPropType()),
  moreURI: PropTypes.string,
  useTinyImg: PropTypes.bool,
}

export default SectionAnimationWrapper(Reviews)
