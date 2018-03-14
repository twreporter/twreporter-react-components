import CategoryName from './common-utils/category-name'
import FadeInFadeOut from './animations/fadein-fadeout'
import ImgWrapper from './common-utils/img-wrapper'
import MobileFlexSwipeable from './mobile-flex-swipeable'
import PropTypes from 'prop-types'
import React from 'react'
import Swipeable from 'react-swipeable'
import SwipableMixin from './common-utils/swipable-mixin'
import styled from 'styled-components'
import Section from './common-utils/section'
import SectionName from './common-utils/section-name'
import TRLink from './common-utils/twreporter-link'
import browserHistory from 'react-router/lib/browserHistory'
import get from 'lodash/get'
import postPropType from './prop-types/post'
import sectionStrings from '../constants/section-strings'
import { fonts, colors } from '../styles/common-variables'
import { getHref } from '../utils/getHref'
import { itemWidthPct } from '../constants/mobile-mockup-specification'
import { truncate, breakPoints } from '../utils/style-utils'

const _ = {
  get,
}

const mobileWidth = breakPoints.mobileMaxWidth

const CarouselContainer = Section.extend`
  padding-top: 0;
  background: ${colors.sectionWhite};
  @media (min-width: ${breakPoints.tabletMinWidth}) {
    display: none;
  }
`

const TextFrame = styled.div`
  height: 240px;
  position: relative;
`

const Category = styled(CategoryName)`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 74px;
  text-align: center;
`

const Title = styled.div`
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: ${itemWidthPct}%;
  font-size: ${fonts.size.title.medium};
  font-weight: ${fonts.weight.bold};
  color: ${colors.textGrey};
  position: absolute;
`

const TitleSpan = styled.span`
  width: 100%;
  height: 3.99;
  ${truncate('absolute', 1.33, 3, `${colors.sectionWhite}`, 'center')};
`

const Description = styled.div`
  top: 150px;
  left: 50%;
  font-size: ${fonts.size.large};
  transform: translateX(-50%);
  width: ${itemWidthPct}%;
  text-align: left;
  color: ${colors.textGrey};
  ${truncate('absolute', 1.43, 3, 'white')};
`

const ImgFrame = styled.div`
  height: 186px;
`

class EditorPicksMobile extends SwipableMixin {
  constructor(props) {
    super(props)
    this.redirect = this._redirect.bind(this)
  }

  _redirect(href) {
    browserHistory.push(`/${href}`)
  }

  render() {
    const onSwiping = (e, deltaX, deltaY, absX, absY) => {
      // In order to avoid slightly vibrating while swiping left and right,
      // we set a threshold to prevent scrolling.
      // 10 is the the threshold value we set after manually testing.
      if (absY < 10) {
        e.preventDefault()
      }
    }

    const ImageComp = (post) => {
      const style = _.get(post, 'style', '')
      const href = getHref(_.get(post, 'slug', 'error'), style)
      const heroImg = _.get(post, 'hero_image')
      return (
        <TRLink
          href={href}
          redirect={style === 'interactive'}
        >
          <ImgFrame>
            <ImgWrapper
              alt={_.get(heroImg, 'description')}
              src={_.get(heroImg, 'resized_targets.mobile.url')}
              srcSet={_.get(heroImg, 'resized_targets', '')}
            />
          </ImgFrame>
        </TRLink>
      )
    }

    const { data } = this.props
    const flexItems = data.map((post) => {
      return (
        <MobileFlexSwipeable.FlexItem
          key={_.get(post, 'id')}
          mobileWidth={mobileWidth}
        >
          {ImageComp(post)}
        </MobileFlexSwipeable.FlexItem>
      )
    })

    const textFrameContent = data.map((post, index) => {
      const style = _.get(post, 'style', '')
      const href = getHref(_.get(post, 'slug', 'error'), style)
      return (
        <FadeInFadeOut
          key={_.get(post, 'id')}
          isSelected={index === this.state.selected}
        >
          <Category>{_.get(post, 'categories[0].name', '')}</Category>
          <Title>
            <TRLink
              href={href}
              redirect={style === 'interactive'}
            >
              <TitleSpan>{_.get(post, 'title', '')}</TitleSpan>
            </TRLink>
          </Title>
          <Description>{_.get(post, 'og_description', '')}</Description>
        </FadeInFadeOut>
      )
    })

    return (
      <CarouselContainer
        mobileWidth={mobileWidth}
      >
        <Swipeable
          onSwipedRight={this.onSwipedRight}
          onSwipedLeft={this.onSwipedLeft}
          onSwiping={onSwiping}
        >
          <SectionName
            mobileWidth={mobileWidth}
          >
            <span>{sectionStrings.editorPick}</span>
          </SectionName>
          <TextFrame>
            {textFrameContent}
          </TextFrame>
          <MobileFlexSwipeable.FlexList
            selected={this.state.selected}
            mobileWidth={mobileWidth}
          >
            {flexItems}
          </MobileFlexSwipeable.FlexList>
        </Swipeable>
      </CarouselContainer>
    )
  }
}

EditorPicksMobile.defaultProps = {
  data: [],
}

EditorPicksMobile.propTypes = {
  data: PropTypes.arrayOf(postPropType()),
}

export default EditorPicksMobile
