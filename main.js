import Confirmation from './confiramtion-components/src'
import Footer from './footer-components/src'
import Header from './header-components/src'
import Bookmark from './bookmarks-components/src'
import IndexPageComposite from './index-components/src'
import ListingComposite from './listing-components/src'
import FetchingWrapper from './shared/components/is-fetching-wrapper'
import Pagination from './pagination/src'

const { TopicsList, List } = ListingComposite

const Wrapper = {
  FetchingWrapper,
}

export default {
  Footer,
  Header,
  Bookmark,
  IndexPageComposite,
  TopicsList,
  List,
  Wrapper,
  Pagination,
  Confirmation,
}

export {
  Footer,
  Header,
  Bookmark,
  IndexPageComposite,
  TopicsList,
  List,
  Wrapper,
  Pagination,
  Confirmation,
}
