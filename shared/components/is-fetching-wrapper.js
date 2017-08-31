import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: relative;
`

const FetchingBlock = styled.div`
  position: relative;
  display: ${props => (props.isFetching ? 'block' : 'none')};
  min-height: 100vh;
  width: 100%;
`

const TransitionBlock = styled.div`
  transition: opacity 1s ease-in-out;
  opacity: ${(props) => { return props.isFetching ? 0 : 1 }};
`

const FetchingWrapper = (WrappedComponent) => {
  class Wrapper extends React.PureComponent {
    render() {
      // TODO make client customize FetchingBlock
      const { isFetching, /* fetchingBlockStyles, */ ...rest } = this.props
      return (
        <Container>
          <FetchingBlock
            isFetching={isFetching}
          />
          <TransitionBlock
            isFetching={isFetching}
          >
            <WrappedComponent
              {...rest}
            />
          </TransitionBlock>
        </Container>
      )
    }
  }

  Wrapper.defaultProps = {
    isFetching: false,
    // fetchingBlockStyles: '',
  }

  Wrapper.propTypes = {
    isFetching: PropTypes.bool,
    // fetchingBlockStyles:  PropTypes.string,
  }

  return Wrapper
}

export default FetchingWrapper

