import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import concat from 'lodash/concat'
import get from 'lodash/get'
import { colors, fonts } from 'shared/common-variables'
import { absoluteCentering, arrayToCssShorthand, screen } from 'shared/style-utils'
import PageUpIcon from '../../static/page-up.svg'
import PageDownIcon from '../../static/page-down.svg'

const _ = {
  concat,
  get,
}

const options = {
  nOfCenterPages: 4,
  nOfMarginPages: 1,
  ellipsis: '…',
  currentPageBgColor: '',
}

const styles = {
  btnBoxSize: {
    mobile: 36,
    desktop: 28,
  },
  prevNextBtnPadding: [0, 20, 2, 20],
  ellipsisBoxPadding: [10, 6, 10, 6],
  containerMargin: [58, 'auto', 50, 'auto'],
}

const PaginationContainer = styled.div`
  margin: ${arrayToCssShorthand(styles.containerMargin)};
  text-align: center;
  height: ${styles.btnBoxSize.mobile}px;
  ${screen.tabletAbove`
    height: ${styles.btnBoxSize.desktop}px;
  `}
`

const Boxes = styled.div`
  display: inline-block;
  user-select: none;
`

const Box = styled.div`
  margin: 0 5px 0 5px;
  width: ${styles.btnBoxSize.desktop}px;
  height: ${styles.btnBoxSize.desktop}px;
  box-sizing: border-box;
  user-select: none;
  display: inline-block;
  font-size: ${fonts.size.base};
  cursor: pointer;
  color: ${colors.pageMain};
  position: relative;
  > span {
    ${absoluteCentering}
  }
`

const PageNumberBox = Box.extend`
  border: solid 1px ${colors.pageMain};
  border-radius: 50%;
  line-height: ${styles.btnBoxSize.desktop}px;
  background-color: ${props => (props.isCurrent ? colors.pageMain : 'transparent')};
  > span {
    color: ${props => (props.isCurrent ? colors.white : colors.pageMain)};
  }
  ${screen.mobileOnly`
    display: ${props => (props.isCurrent ? '' : 'none')};
  `}
`

const EllipsisBox = Box.extend`
  cursor: default;
  padding: ${arrayToCssShorthand(styles.ellipsisBoxPadding)};
  ${screen.mobileOnly`
    display: none;
  `}
`

const PrevNextBtn = Box.extend`
  padding: ${arrayToCssShorthand(styles.prevNextBtnPadding)};
  cursor: pointer;
  path {
    stroke: ${colors.pageMain};
  }
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

class Pagination extends React.PureComponent {
  constructor(props) {
    super(props)
    this._buildPagesArray = this._buildPagesArray.bind(this)
  }

  _buildPagesArray(currentPage, totalPages) {
    const { nOfMarginPages, nOfCenterPages, ellipsis } = options
    const pagesArrayMaxLength = nOfCenterPages + ((nOfMarginPages + 1) * 2)
    const _buildPageBox = index => (
      <PageNumberBox
        key={`page-num-box-${index}`}
        isCurrent={index === currentPage}
        onClick={this.props.handleClickPage}
      >
        <span>{index}</span>
      </PageNumberBox>
    )
    /* Case 1: display all pages (no ellipsis) */
    if (totalPages <= pagesArrayMaxLength) {
      const pagesArray = []
      for (let i = 1; i <= totalPages; i += 1) {
        pagesArray.push(_buildPageBox(i))
      }
      return pagesArray
    }
    /* Case 2: display ellipsis */
    const isCurrentPageInLeftRange = (currentPage <= nOfMarginPages + nOfCenterPages)
    const isCurrentPageInRightRange = (currentPage > totalPages - nOfMarginPages - nOfCenterPages)
    const leftEllipsisJSX = <EllipsisBox key="left-ellipsis">{ellipsis}</EllipsisBox>
    const rightEllipsisJSX = <EllipsisBox key="right-ellipsis">{ellipsis}</EllipsisBox>
    /* Build margin page boxes */
    const leftMarginJSX = []
    for (let i = 1; i <= nOfMarginPages; i += 1) {
      leftMarginJSX.push(_buildPageBox(i))
    }
    const rightMarginJSX = []
    for (let i = 1; i <= nOfMarginPages; i += 1) {
      const page = totalPages - nOfMarginPages + i
      rightMarginJSX.push(_buildPageBox(page))
    }
    /*
      Build center page boxes.
      Concat margin, center, and ellipsis.
    */
    const _buildCenterJSX = (startAt, length) => {
      const centerJSX = []
      const endAt = startAt + length - 1
      for (let i = startAt; i <= endAt; i += 1) {
        centerJSX.push(_buildPageBox(i))
      }
      return centerJSX
    }
    let ellipsisStatus
    if (isCurrentPageInLeftRange) {
      ellipsisStatus = 'right-ellipsis'
    } else if (isCurrentPageInRightRange) {
      ellipsisStatus = 'left-ellipsis'
    } else {
      ellipsisStatus = 'both-ellipsis'
    }
    switch (ellipsisStatus) {
      case 'right-ellipsis':
        return _.concat(leftMarginJSX, _buildCenterJSX(nOfMarginPages + 1, nOfCenterPages + 1), rightEllipsisJSX, rightMarginJSX)
      case 'left-ellipsis':
        return _.concat(leftMarginJSX, leftEllipsisJSX, _buildCenterJSX(totalPages - nOfMarginPages - nOfCenterPages, nOfCenterPages + 1), rightMarginJSX)
      case 'both-ellipsis':
      default:
        return _.concat(leftMarginJSX, leftEllipsisJSX, _buildCenterJSX(currentPage - Math.floor(nOfCenterPages / 2) + 1, nOfCenterPages), rightEllipsisJSX, rightMarginJSX)
    }
  }

  render() {
    const { currentPage, totalPages, handleClickPrev, handleClickNext } = this.props
    const pagesArrayJSX = this._buildPagesArray(currentPage, totalPages)
    const belowFirstPage = currentPage <= 1
    const aboveFinalPage = currentPage >= totalPages
    return (
      <PaginationContainer>
        <Boxes>
          {_.concat(
            belowFirstPage ? null : <PrevNextBtn key="prev-btn" onClick={handleClickPrev}><span><PageUpIcon /></span></PrevNextBtn>,
            pagesArrayJSX,
            aboveFinalPage ? null : <PrevNextBtn key="next-btn" onClick={handleClickNext}><span><PageDownIcon /></span></PrevNextBtn>)}
        </Boxes>
      </PaginationContainer>
    )
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  handleClickPrev: PropTypes.func.isRequired,
  handleClickPage: PropTypes.func.isRequired,
  handleClickNext: PropTypes.func.isRequired,
}

Pagination.defaultProps = {
  currentPage: 1,
}

export default Pagination
