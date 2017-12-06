import { screen } from 'shared/style-utils'
import { slideUpFadeInWhenFocus } from '../../../utils/style-mixins'
import Button from './button'
import DefaultContainer from '../container'
import FbIcon from '../../../../static/icon-facebook.svg'
import GithubIcon from '../../../../static/icon-github.svg'
import MailIcon from '../../../../static/icon-mail.svg'
import PropTypes from 'prop-types'
import React from 'react'
import Relateds from './relateds'
import styled from 'styled-components'
import Team from './team'
import TopicBox from './topic-box'

const relatedBoxWidth = {
  mobile: '100%',
  tablet: '414px',
  desktop: '537px',
  hd: '992px',
}

const paddingTop = {
  tablet: '79px',
  desktop: '79px',
  hd: '110px',
}

const Container = DefaultContainer.extend`
  width: 100%;
  ${screen.mobileOnly`
    padding: 66px 22px;
    height: 100%;
  `}
  ${screen.tabletAbove`
    padding: ${paddingTop.tablet} 45px 0 45px;
    display: flex;
    align-items: center;
  `}
  ${screen.desktopOnly`
    padding: ${paddingTop.desktop} 60px 0 60px;
  `}
  ${screen.hdAbove`
    padding: ${paddingTop.hd} 80px 0 80px;
  `}
`

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  ${screen.tabletAbove`
    width: 100%;
    flex-direction: row;
    align-items: stretch;
    max-height: 566px;
  `}
  ${screen.desktopOnly`
    max-height: 566px;
  `}
  ${screen.hdAbove`
    max-height: 790px;
  `}
`

const RealtedsBox = styled.div`
  ${screen.mobileOnly`
    width: ${relatedBoxWidth.mobile};
    height: 40%;
    margin-bottom: 25px;
  `}
  ${screen.tabletAbove`
    width: ${relatedBoxWidth.tablet};
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;
  `}
  ${screen.desktopAbove`
    width: ${relatedBoxWidth.desktop};
  `}
  ${screen.hdAbove`
    width: ${relatedBoxWidth.hd};
  `}
  ${props => slideUpFadeInWhenFocus(props.isFocus)}
`

const InfosBox = styled.div`
  width: ${relatedBoxWidth.mobile};
  min-width: 270px;
  height: auto;
  ${props => slideUpFadeInWhenFocus(props.isFocus)}
  ${screen.tabletAbove`
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    padding-bottom: 15px;
    height: 90%;
    ${props => slideUpFadeInWhenFocus(props.isFocus, 'flex')}
  `}
  ${screen.hdAbove`
    padding-top: 30px;
    height: 84%;
  `}
`

class Colophon extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (this.props.isFocus !== nextProps.isFocus)
  }
  render() {
    const { relateds, team, topicTitle, topicImage, topicLink, isFocus } = this.props
    return (
      <Container>
        <Wrapper>
          <RealtedsBox isFocus={isFocus}>
            <TopicBox topicTitle={topicTitle} topicImage={topicImage} to={topicLink} />
            <Relateds relateds={relateds} />
          </RealtedsBox>
          <InfosBox isFocus={isFocus}>
            <Team team={team} />
            <Button title="訂閱電子報" to="https://twreporter.us14.list-manage.com/subscribe/post?u=4da5a7d3b98dbc9fdad009e7e&id=e0eb0c8c32"><MailIcon /></Button>
            <Button title="分享" to="https://www.facebook.com/sharer/sharer.php?u=https://www.twreporter.org/i/high-risk-youth-life-is-a-struggle"><FbIcon /></Button>
            <Button title="開放原始碼" to="https://github.com/twreporter"><GithubIcon /></Button>
          </InfosBox>
        </Wrapper>
      </Container>
    )
  }
}

Colophon.propTypes = {
  isFocus: PropTypes.bool.isRequired,
  relateds: PropTypes.array.isRequired,
  team: PropTypes.array.isRequired,
  topicImage: PropTypes.object.isRequired,
  topicLink: PropTypes.string.isRequired,
  topicTitle: PropTypes.string.isRequired,
}

export default Colophon
