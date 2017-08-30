import styled from 'styled-components'
import { screen } from 'shared/style-utils'
import { colors } from 'shared/common-variables'

const PostsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  ${screen.mobileOnly`
    flex-direction: column;
    justify-content: flex-start;
    a {
      border-bottom: solid 1px ${colors.lineGrey};
    }
    a:last-child {
      border-bottom: medium none currentcolor;
    }
  `}
`

export default PostsContainer
