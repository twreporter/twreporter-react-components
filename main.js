import { Cinemagraph, CinemagraphHelper } from './cinemagraph'
import FetchingWrapper from './shared/components/is-fetching-wrapper'
import Footer from './footer'
import Header from './header'
import IndexPageComposite from './index-page'
import ListingComposite from './listing-page'
import Pagination from './pagination'
import FadeText from './fade-text'
import { FullpageSlides, FullpageSlidesConstants } from './fullpage-slides'

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
