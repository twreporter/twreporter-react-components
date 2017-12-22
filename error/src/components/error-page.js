import ErrorMessage from './error-message'
import Footer from 'footer'
import Header from 'header'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const Page = styled.div`
  background-color: #F1F1F1;
`

class ErrorPage extends React.PureComponent {
  _selectTitle(errorType) {
    switch (errorType) {
      case '404':
        return '404 - Page Not Found'
      case '500':
      default:
        return '500 - Internal Server Error'
    }
  }
  render() {
    const { params } = this.props
    const { errorType } = params
    return (
      <Page>
        <Helmet>
          <title>{this._selectTitle(errorType)}</title>
        </Helmet>
        <Header />
        <ErrorMessage errorType={errorType} />
        <Footer />
      </Page>
    )
  }
}

ErrorPage.propTypes = {
  params: PropTypes.shape({
    errorType: PropTypes.oneOf(['404', '500']),
  }),
}

ErrorPage.defaultProps = {
  params: {
    errorType: '500',
  },
}

export default ErrorPage
