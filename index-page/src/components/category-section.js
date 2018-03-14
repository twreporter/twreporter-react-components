/* eslint-disable no-param-reassign */
import BottomLink from './common-utils/bottom-link'
import ImgWrapper from './common-utils/img-wrapper'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import MobileListUtils from './common-utils/mobile-list'
import PropTypes from 'prop-types'
import React from 'react'
import Section from './common-utils/section'
import SectionAnimationWrapper from './animations/section-animation-wrapper'
import SectionName from './common-utils/section-name'
import TRLink from './common-utils/twreporter-link'
import get from 'lodash/get'
import postPropType from './prop-types/post'
import sectionStrings from '../constants/section-strings'
import styled from 'styled-components'
import { breakPoints, finalMedia } from '../utils/style-utils'
import { getHref } from '../utils/getHref'
import { fonts, colors } from '../styles/common-variables'

const _ = {
  get,
}

const desktopMinWidth = breakPoints.desktopMinWidth
const tabletMinWidth = breakPoints.tabletMinWidth
const mobileWidth = breakPoints.mobileMaxWidth
const backgroundColor = '#e2e2e2'

const mockup = {
  mobile: {
    titleWidth: 209,
    titleFrameWidth: 237,
  },
  img: {
    sizes: {
      desktop: '202px',
      tablet: '210px',
      mobile: '308px',
    },
  },
}

const Container = styled.div`
  background-color: ${backgroundColor};
`

const SectionWrapper = Section.extend`
  background-color: initial;
  padding-bottom: 10px;
`

const FlexBox = styled.div`
  display: flex;
  flex-wrap:wrap;
  width: 1002px;
  margin: 0 auto;
  justify-content: center;
  ${finalMedia.desktop`
    width: 690px;
  `}
  ${finalMedia.tablet`
    width: 690px;
  `}
  ${finalMedia.mobile`
    display: none;
  `}
`

const FlexItem = styled.div`
  background-color: white;
  position: relative;
  margin-bottom: 70px;
  padding-bottom: 20px;
  width: 314px;
  &:nth-child(3n+2) {
    margin-right: 30px;
    margin-left: 30px;
  }
  ${finalMedia.desktop`
    width: 210px;
  `}
  ${finalMedia.tablet`
    width: 210px;
    &:nth-child(3n+2) {
      margin-right: 20px;
      margin-left: 20px;
    }
  `}
  ${finalMedia.mobile`
    width: 100%;
    height: 100%;
    margin-bottom: 0;
  `}
`

const ImgFrame = styled.div`
  height: 202px;
  ${finalMedia.desktop`
    height: 138px;
  `}
  ${finalMedia.tablet`
    height: 138px;
  `}
  ${finalMedia.mobile`
    height: 186px;
  `}
`

const CategoryName = styled.div`
  background-color: ${backgroundColor};
  width: 100%;
  color: ${colors.textGrey};
  font-weight: ${fonts.weight.bold};
  line-height: 1.4;
  text-align: center;
  font-size: ${fonts.size.title.base};
  padding-bottom: 8px;
`

const TextFrame = styled.div`
  background: white;
  padding: 16px 0 20px 0;
  min-height: 94px;
`

const Title = styled.div`
  font-weight: ${fonts.weight.bold};
  font-size: ${fonts.size.title.base};
  color: ${colors.textGrey};
  line-height: 1.4;
  width: 92%;
  margin: 0 auto;
  @media (max-width: ${mobileWidth}) {
    width: ${(mockup.mobile.titleWidth / mockup.mobile.titleFrameWidth) * 100}%;
  }
`

const More = styled.div`
  position: absolute;
  left: 50%;
  bottom: -16px;
  padding-top: 16px;
  transform: translateX(-50%);
  text-align: center;
  width: 101%;
  background-color: ${backgroundColor};
  @media (max-width: ${mobileWidth}) {
    bottom: -24px;
  }
`

class Category extends React.PureComponent {
  render() {
    const { data, useTinyImg } = this.props
    const items = data.map((item) => {
      const style = _.get(item, 'style', '')
      const href = getHref(_.get(item, 'slug', 'error'), style)
      return (
        <FlexItem
          key={_.get(item, 'id')}
        >
          <CategoryName>
            {_.get(item, 'listName')}
          </CategoryName>
          <TRLink href={href} redirect={style === 'interactive'}>
            <ImgFrame>
              <ImgWrapper
                alt={_.get(item, 'hero_image.description')}
                src={_.get(item, ['hero_image', 'resized_targets', useTinyImg ? 'tiny' : 'mobile', 'url'])}
                srcSet={_.get(item, 'hero_image.resized_targets', '')}
                sizes={
                  `(min-width: ${desktopMinWidth}) ${mockup.img.sizes.desktop}, ` +
                  `(min-width: ${tabletMinWidth}) ${mockup.img.sizes.tablet}, ` +
                  `${mockup.img.sizes.mobile}`
                }
              />
            </ImgFrame>
            <TextFrame>
              <Title>
                {_.get(item, 'title')}
              </Title>
            </TextFrame>
          </TRLink>
          <More>
            <BottomLink
              text={`更多${_.get(item, 'listName')}`}
              path={_.get(item, 'moreURI')}
            />
          </More>
        </FlexItem>
      )
    })
    return (
      <Container>
        <SectionWrapper
          mobileWidth={mobileWidth}
        >
          <SectionName
            mobileWidth={mobileWidth}
          >
            <span>{sectionStrings.category}</span>
          </SectionName>
          <FlexBox>
            {items}
          </FlexBox>
          <MobileListUtils
            maxWidth={mobileWidth}
          >
            <MobileFlexSwipeable.SwipableFlexItems
              alignItems="stretch"
              mobileWidth={mobileWidth}
              maxSwipableItems={_.get(this.props, 'data.length', 1) - 1}
              categorySection
            >
              {items}
            </MobileFlexSwipeable.SwipableFlexItems>
          </MobileListUtils>
        </SectionWrapper>
      </Container>
    )
  }
}

Category.defaultProps = {
  data: [],
  useTinyImg: false,
}

Category.propTypes = {
  data: PropTypes.arrayOf(
    postPropType({
      listName: PropTypes.string.isRequired,
      moreURI: PropTypes.string.isRequired,
    }),
  ),
  useTinyImg: PropTypes.bool,
}

export default SectionAnimationWrapper(Category)
