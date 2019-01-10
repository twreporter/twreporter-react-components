import { colors, fontSizes, fontWeight } from '../../../constants/style-variables'
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

const config = {
  host: process.env.NODE_ENV === 'production' ? 'https://www.twreporter.org' : 'http://testtest.twreporter.org:3000',
}

/* -----------Bookmark------------- */

const HOST = config.host

const WidgetFrame = styled.iframe`
  width: 25px;
  height: 22px;
  border: none;
  overflow: hidden;
  ${screen.mobileOnly`
    position: absolute;
    right: 0;
  `};
`

/* -------------------------------- */

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

const Container = styled(DefaultContainer)`
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
  position: relative;
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

const WidgetContainer = styled.div`
  position: relative;
  width: 100%;
  display: block;
  text-align: center;
  ${screen.mobileOnly`
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    width: 90px;
  `};
`

const IconContainer = styled.div`
  margin: 0 auto;
  ${screen.mobileOnly`
    display: inline-block;
    position: absolute;
    right: 8px;
  `};
`

const WidgetTitle = styled.div`
  color: ${colors.white};
  letter-spacing: 1.7px;
  font-weight: ${fontWeight.light};
  font-size: 14px;
  position: relative;
  margin: 0 auto;
  margin-bottom: 10px;
  display: inline-block;
  ${screen.mobileOnly`
    position: absolute;
    left: 0;
  `};
  ${screen.tabletAbove`
    font-weight: ${fontWeight.medium};
    font-size: ${fontSizes.colophonTitle.tablet};
    margin-bottom: 20px;
    display: block;
  `}
`

class Colophon extends React.Component {
  componentDidMount() {
    const { bookmarkPostMessage } = this.context
    const postMessage = (id) => {
      const bookmarkElement = document.getElementById(id)
      bookmarkElement.onload = () => {
        bookmarkElement.contentWindow.postMessage(JSON.stringify(bookmarkPostMessage), `${HOST}`)
      }
    }
    postMessage('desktopBookmarkIcon')
  }

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
            <WidgetContainer>
              <WidgetTitle>書籤</WidgetTitle>
              <IconContainer>
                <WidgetFrame
                  id="desktopBookmarkIcon"
                  title="bookmark-widget"
                  src={`${HOST}/widgets-bookmark-desktop`}
                  scrolling="no"
                />
              </IconContainer>
            </WidgetContainer>
          </InfosBox>
        </Wrapper>
      </Container>
    )
  }
}

Colophon.contextTypes = {
  bookmarkPostMessage: PropTypes.object,
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
