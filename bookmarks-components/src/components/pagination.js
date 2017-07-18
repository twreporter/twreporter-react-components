import React from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
import concat from 'lodash/concat'
import { colors, fonts } from '../shared/common-variables'
import { media } from '../shared/style-utils'
import PageUpIcon from '../../static/page-up.svg'
import PageDownIcon from '../../static/page-down.svg'

const _ = {
  concat,
}

const options = {
  nOfCenterPages: 4,
  nOfMarginPages: 1,
  prevBtnIcon: <PageUpIcon />,
  nextBtnIcon: <PageDownIcon />,
  ellipsis: '…',
  currentPageBgColor: '',
}

const styles = {
  numberBoxPadding: [14, 13, 14, 13],
  prevNextBtnPadding: [0, 20, 2, 20],
  ellipsisBoxPadding: [10, 6, 10, 6],
}

const PaginationContainer = styled.div`
  margin-top: 60px;
  text-align: center;
`

const Boxes = styled.div`
  display: inline-block;
  user-select: none;
`

const Box = styled.div`
  margin: 0 5px 0 5px;
  box-sizing: border-box;
  user-select: none;
  display: inline-block;
  padding: ${styles.numberBoxPadding.map(value => `${value}px`).join(' ')};
  font-size: ${fonts.size.large};
  cursor: pointer;
`

const PageNumberBox = Box.extend`
  ${media.mobile`
    display: none;
  `}
`

const CurrentPageBox = Box.extend`
  color: white;
  background-color: red;
  ${media.mobile`
    color: inherit;
    background-color: inherit;
  `}
`

const EllipsisBox = Box.extend`
  cursor: default;
  padding: ${styles.ellipsisBoxPadding.map(value => `${value}px`).join(' ')};
  ${media.mobile`
    display: none;
  `}
`

const PrevNextBtn = styled.div`
  box-sizing: border-box;
  user-select: none;
  display: inline-block;
  padding: ${styles.prevNextBtnPadding.map(value => `${value}px`).join(' ')};
  font-size: ${fonts.size.xlarge};
  background-color: ${colors.sectionWhite};
  cursor: pointer;
`

/*
Pages Array:

           left-range
          |-----------|
                 right-range
                |-----------|
        < 1  2  3 4[5]6  7  8  >
        < 1  2  3 4[5]6 ... 9  >
        < 1 ... 4[5]6 7  8  9  >
        < 1 ... 24[25]26 27 ... 30 >
        < 1 ... 25[26]27 28 29  30 >
        < 1 ... 4[5]6 7 ... 30 >
         |-|               |-|
     left-margin          right-margin
                |-----|
                 center
            |-|         |-|
      left-ellipsis  right-ellipsis

  let margin = x, center = y
  pages array length = 2x + y + 2
*/

class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      totalPage: 22,
    }
    this._handleClickNext = this._handleClickNext.bind(this)
    this._handleClickPrev = this._handleClickPrev.bind(this)
    this._handleClickPageBox = this._handleClickPageBox.bind(this)
    this._buildPagesArray = this._buildPagesArray.bind(this)
  }

  _handleClickNext(event) {
    event.preventDefault()
    this.setState({
      currentPage: this.state.currentPage + 1,
    })
  }

  _handleClickPrev(event) {
    event.preventDefault()
    this.setState({
      currentPage: this.state.currentPage - 1,
    })
  }

  _handleClickPageBox(event) {
    event.preventDefault()
    const pageIndex = parseInt(event.target.dataset.page, 10)
    this.setState({
      currentPage: pageIndex,
    })
  }

  _buildPagesArray(currentPage, totalPage) {
    const { nOfMarginPages, nOfCenterPages, ellipsis } = options
    const pagesArrayMaxLength = nOfCenterPages + ((nOfMarginPages + 1) * 2)
    const _buildPageBox = index => (index !== currentPage ?
      <PageNumberBox key={`page${index}`} data-page={index} onClick={this._handleClickPageBox}>{index}</PageNumberBox> :
      <CurrentPageBox key={`page${index}`}>{index}</CurrentPageBox>)
    if (totalPage <= pagesArrayMaxLength) {
      /* display all pages (no ellipsis) */
      const pagesArray = []
      for (let i = 1; i <= totalPage; i += 1) {
        pagesArray.push(_buildPageBox(i))
      }
      return pagesArray
    }
    const isCurrentPageInLeftRange = (currentPage <= nOfMarginPages + nOfCenterPages)
    const isCurrentPageInRightRange = (currentPage > totalPage - nOfMarginPages - nOfCenterPages)
    const ellipsisJSX = <EllipsisBox>{ellipsis}</EllipsisBox>
    const leftMarginJSX = []
    for (let i = 1; i <= nOfMarginPages; i += 1) {
      leftMarginJSX.push(_buildPageBox(i))
    }
    const rightMarginJSX = []
    for (let i = 1; i <= nOfMarginPages; i += 1) {
      const page = totalPage - nOfMarginPages + i
      rightMarginJSX.push(_buildPageBox(page))
    }
    let ellipsisStatus
    if (isCurrentPageInLeftRange) {
      ellipsisStatus = 'right-ellipsis'
    } else if (isCurrentPageInRightRange) {
      ellipsisStatus = 'left-ellipsis'
    } else {
      ellipsisStatus = 'both-ellipsis'
    }
    const _buildCenterJSX = (startAt, length) => {
      const centerJSX = []
      const endAt = startAt + length - 1
      for (let i = startAt; i <= endAt; i += 1) {
        centerJSX.push(_buildPageBox(i))
      }
      return centerJSX
    }
    switch (ellipsisStatus) {
      case 'right-ellipsis':
        return _.concat([], leftMarginJSX, _buildCenterJSX(nOfMarginPages + 1, nOfCenterPages + 1), ellipsisJSX, rightMarginJSX)
      case 'left-ellipsis':
        return _.concat([], leftMarginJSX, ellipsisJSX, _buildCenterJSX(totalPage - nOfMarginPages - nOfCenterPages, nOfCenterPages + 1), rightMarginJSX)
      case 'both-ellipsis':
      default:
        return _.concat([], leftMarginJSX, ellipsisJSX, _buildCenterJSX(currentPage - Math.floor(nOfCenterPages / 2) + 1, nOfCenterPages), ellipsisJSX, rightMarginJSX)
    }
  }

  render() {
    const { currentPage, totalPage } = this.state
    const pagesArrayJSX = this._buildPagesArray(currentPage, totalPage)
    const belowFirstPage = currentPage <= 1
    const aboveFinalPage = currentPage >= totalPage
    return (
      <PaginationContainer>
        <Boxes>
          {_.concat(
            [],
            belowFirstPage ? null : <PrevNextBtn onClick={belowFirstPage ? null : this._handleClickPrev}>{options.prevBtnIcon}</PrevNextBtn>,
            pagesArrayJSX,
            aboveFinalPage ? null : <PrevNextBtn onClick={aboveFinalPage ? null : this._handleClickNext}>{options.nextBtnIcon}</PrevNextBtn>)}
        </Boxes>
      </PaginationContainer>
    )
  }
}


// Pagination.propTypes = {
//   currentPage: PropTypes.number.isRequired,
//   totalPage: PropTypes.number.isRequired,
// }

export default Pagination
