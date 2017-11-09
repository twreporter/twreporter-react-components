import { Cinemagraph, CinemagraphHelper } from './cinemagraph/src'
import FetchingWrapper from './shared/components/is-fetching-wrapper'
import Footer from './footer-components/src'
import Header from './header-components/src'
import IndexPageComposite from './index-components/src'
import ListingComposite from './listing-components/src'
import Pagination from './pagination/src'
import FadeText from './fade-text-components/src'
import { FullpageSlides, FullpageSlidesConstants } from './fullpage-slides/src'

const { TopicsList, List } = ListingComposite

const Wrapper = {
  FetchingWrapper,
}

export default {
  CinemagraphHelper,
  Cinemagraph,
  Footer,
  FullpageSlides,
  FullpageSlidesConstants,
  Header,
  IndexPageComposite,
  List,
  Pagination,
  FadeText,
  TopicsList,
  Wrapper,
}

export {
  CinemagraphHelper,
  Cinemagraph,
  Footer,
  FullpageSlides,
  FullpageSlidesConstants,
  Header,
  IndexPageComposite,
  List,
  Pagination,
  FadeText,
  TopicsList,
  Wrapper,
}
