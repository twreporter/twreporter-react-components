import PropTypes from 'prop-types'
import React from 'react'
import browserHistory from 'react-router/lib/browserHistory'
import styled from 'styled-components'
import SearchIcon from '../static/search.svg'
import { colors } from '../styles/common-variables'

const mobileWidth = '400px'

const Conatiner = styled.span`
  height: 62px;
  display: flex;
  align-items: center;
  float: right;
`

const SearchIconContainer = styled.div`
  width: 20px;
  height: 20px;
  box-sizing: border-box;
  display: block;
  vertical-align: middle;
  margin-right: ${props => (props.isToggled ? '10px' : '0px')};
  cursor: pointer;
`

const Input = styled.input`
  width: ${props => (props.display ? '140px' : '0px')};
  border: none;
  border-bottom: ${props => (props.display ? '1px solid #808080' : 'none')};
  box-shadow: none;
  color: ${colors.textGrey};
  @media (max-width: ${mobileWidth}) {
    width: ${props => (props.display ? '130px' : '0px')};
  }
  @media (max-width: 320px) {
    width: ${props => (props.display ? '116px' : '0px')};
  }
  outline: none;
  transition: 300ms all linear;
`
class SearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
    }
    this.handleInputChange = this._handleInputChange.bind(this)
    this.handleSubmit = this._handleSubmit.bind(this)
  }

  _handleInputChange(e) {
    e.preventDefault()
    this.setState({
      inputValue: e.target.value,
    })
  }

  _handleSubmit(e) {
    e.preventDefault()
    browserHistory.push(`/search?q=${this.state.inputValue}`)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          display={this.props.isToggled}
          ref="searchInput"
          type="text"
          placeholder="搜尋報導者文章"
          onChange={this.handleInputChange}
        />
      </form>
    )
  }
}

SearchInput.defaultProps = {
  isToggled: null,
}

SearchInput.propTypes = {
  isToggled: PropTypes.bool,
}


class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isToggled: false,
    }
    this.onToggle = this._onToggle.bind(this)
  }

  _onToggle() {
    this.setState({
      isToggled: !this.state.isToggled,
    })
  }

  render() {
    return (
      <Conatiner>
        <SearchIconContainer
          onClick={this.onToggle}
          isToggled={this.state.isToggled}
        >
          <SearchIcon width="20px" height="20px" />
        </SearchIconContainer>
        <SearchInput
          isToggled={this.state.isToggled}
        />
      </Conatiner>
    )
  }
}

export default SearchBox
