import { colors, fontSizes, fontWeight } from '../../../constants/style-variables'
import { screen } from 'shared/style-utils'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

import map from 'lodash/map'

const Container = styled.div`
  width: 100%;
  text-align: center;
  color: ${colors.white};
  margin-bottom: 30px;
`

const Title = styled.div`
  width: 100%;
  letter-spacing: 1.7px;
  font-weight: ${fontWeight.medium};
  font-size: ${fontSizes.colophonTitle.mobile};
  margin-bottom: 15px;
  ${screen.tabletAbove`
    font-size: ${fontSizes.colophonTitle.tablet};
    margin-bottom: 30px;
  `}
`

const JobBox = styled.div`
  width: 100%;
  letter-spacing: 1.5px;
  font-size: ${fontSizes.colophonContent.mobile};
  margin-bottom: .65em;
  :last-child {
    margin-bottom: 0;
  }
  ${screen.tabletAbove`
    font-size: ${fontSizes.colophonContent.tablet};
  `}
`
const JobTitle = styled.div`
  width: 50%;
  display: inline-block;
  font-weight: ${fontWeight.light};
  text-align: right;
  padding-right: 1em;
  white-space: nowrap;
  overflow: hidden;
`
const Members = styled.div`
  width: 50%;
  display: inline-block;
  font-weight: ${fontWeight.normal};
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
`
const Member = styled.span`
  margin-right: 1em;
  :last-child {
    margin-right: 0;
  }
`

function buildMember(member, index) {
  return <Member key={index}>{member}</Member>
}

function buildJobBox(data, index) {
  const { job, members } = data
  return (
    <JobBox key={index}>
      <JobTitle>{job}</JobTitle>
      <Members>{map(members, buildMember)}</Members>
    </JobBox>
  )
}

function Team(props) {
  return (
    <Container>
      <Title>製作團隊</Title>
      {map(props.team, buildJobBox)}
    </Container>
  )
}

Team.propTypes = {
  team: PropTypes.array.isRequired,
}

export default Team
