import { Cinemagraph, CinemagraphHelper } from './cinemagraph/src'
import FetchingWrapper from './shared/components/is-fetching-wrapper'
import Footer from './footer-components/src'
import Header from './header-components/src'
import IndexPageComposite from './index-components/src'
import ListingComposite from './listing-components/src'
import Pagination from './pagination/src'
import { FullpageSlides, FullpageSlidesConstants } from './fullpage-slides/src'
import FadeText from './fade-text-components/src'

const { TopicsList, List } = ListingComposite

const Wrapper = {
  FetchingWrapper,
}

export default {
  Cinemagraph,
  CinemagraphHelper,
  FadeText,
  Footer,
  FullpageSlides,
  FullpageSlidesConstants,
  Header,
  IndexPageComposite,
  List,
  Pagination,
  TopicsList,
  Wrapper,
}

export {
  Cinemagraph,
  CinemagraphHelper,
  FadeText,
  Footer,
  FullpageSlides,
  FullpageSlidesConstants,
  Header,
  IndexPageComposite,
  List,
  Pagination,
  TopicsList,
  Wrapper,
}
