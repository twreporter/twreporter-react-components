import Link from 'react-router/lib/Link'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { colors, fonts } from 'shared/common-variables'
import { arrayToCssShorthand, screen, resetLinkStyle } from 'shared/style-utils'
import RightArrowIcon from '../../static/arrow-right.svg'

const styles = {
  goToTopicMargin: [20, 'auto', 0, 'auto'],
  goToTopicPadding: [14, 0, 14, 0],
  sectionMargin: {
    mobile: [0, 0, 35, 0],
    tablet: [0, 0, 42, 0],
    desktop: [0, 0, 60, 0],
  },
  titleMargin: {
    mobile: [0, 0, 24, 0],
    tablet: [0, 0, 42, 0],
  },
  titlePadding: [16, 0, 16, 0],
}

const StyledLink = styled(Link)`
  ${resetLinkStyle}
  display: block;
  margin: ${arrayToCssShorthand(styles.goToTopicMargin)};
`

const SectionTitle = styled.div`
  width: 100%;
  border-bottom: 2px solid ${colors.lineGrey};
  padding: ${arrayToCssShorthand(styles.titlePadding)};
  color: ${colors.textGrey};
  font-size: ${fonts.size.large};
  font-weight: ${fonts.weight.bold};
  line-height: 1;
  margin: ${arrayToCssShorthand(styles.titleMargin.mobile)};
  ${screen.tabletAbove`
    margin: ${arrayToCssShorthand(styles.titleMargin.tablet)};
  `}
`
const SectionContent = styled.div`
  width: 100%;
  margin: ${arrayToCssShorthand(styles.sectionMargin.mobile)};
  ${screen.tabletOnly`
    margin: ${arrayToCssShorthand(styles.sectionMargin.tablet)};
  `}
  ${screen.desktopAbove`
    margin: ${arrayToCssShorthand(styles.sectionMargin.desktop)};
  `}
`

const GoToTopic = styled.div`
  color: ${colors.linkBlue};
  text-align: center;
  line-height: 1;
  padding: ${arrayToCssShorthand(styles.goToTopicPadding)};
  span {
    display: inline-block;
    max-width: 400px;
    ${screen.mobileOnly`
      max-width: 290px;
    `}
    white-spacing: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-space: .1px;
    font-size: ${fonts.size.medium};
    font-weight: ${fonts.weight.medium};
  }
  svg {
    height: ${fonts.size.medium};
    vertical-align: baseline;
    margin-left: .5em;
  }
`

const TopSectionContent = props => (
  <SectionContent>
    {props.children}
    {!props.topicName ? null : <StyledLink to={props.topicUrl}><GoToTopic><span>{`更多${props.topicName}文章`}</span><RightArrowIcon /></GoToTopic></StyledLink>}
  </SectionContent>
)

TopSectionContent.propTypes = {
  children: PropTypes.node.isRequired,
  topicUrl: PropTypes.string.isRequired,
  topicName: PropTypes.string,
}

TopSectionContent.defaultProps = {
  topicName: '',
}

const ListSectionContent = props => (
  <SectionContent>
    {props.children}
  </SectionContent>
)

ListSectionContent.propTypes = {
  children: PropTypes.node.isRequired,
}

export { TopSectionContent, ListSectionContent, SectionTitle }
