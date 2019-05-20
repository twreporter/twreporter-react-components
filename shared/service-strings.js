import { externalLinks, linkType, searchConfigs, memberConfigs, bookmarkConfigs } from './configs.js'

export const SERVICE_LABELS = {
  SIGN_IN: '登入',
  SIGN_OUT: '登出',
  SEARCH: '搜尋',
  BOOKMARK: '書籤',
  DONATION: '贊助',
  SUBSCRIPTION: '訂閱',
}

export default {
  SIGN_IN: {
    label: SERVICE_LABELS.SIGN_IN,
    path: memberConfigs.path,
    type: linkType.internal,
  },
  SIGN_OUT: {
    label: SERVICE_LABELS.SIGN_OUT,
    path: memberConfigs.path,
    type: linkType.internal,
  },
  SEARCH: {
    label: SERVICE_LABELS.SEARCH,
    path: searchConfigs.path,
    type: linkType.internal,
  },
  BOOKMARK: {
    label: SERVICE_LABELS.BOOKMARK,
    path: bookmarkConfigs.path,
    type: linkType.internal,
  },
  DONATION: {
    label: SERVICE_LABELS.DONATION,
    path: externalLinks.donation,
    type: linkType.external,
  },
  SUSBSCRIPTION: {
    label: SERVICE_LABELS.SUBSCRIPTION,
    path: externalLinks.newsLetter,
    type: linkType.external,
  },
}
