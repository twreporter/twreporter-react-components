import Footer from './footer-components/src'
import Header from './header-components/src'
import IndexPageComposite from './index-components/src'
import ListingComposite from './listing-components/src'
import FetchingWrapper from './shared/components/is-fetching-wrapper'

const { TopicsList, List } = ListingComposite

const Wrapper = {
  FetchingWrapper,
}

export default {
  Footer,
  Header,
  IndexPageComposite,
  TopicsList,
  List,
  Wrapper,
}

export {
  Footer,
  Header,
  IndexPageComposite,
  TopicsList,
  List,
  Wrapper,
}
