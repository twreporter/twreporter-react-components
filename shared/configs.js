export const categoryConfigs = [
  {
    text: '人權．社會',
    name: 'humanRightsAndSociety',
    path: 'human_rights_and_society',
  },
  {
    text: '環境．教育',
    name: 'environmentAndEducation',
    path: 'environment_and_education',
  },
  {
    text: '政經．產業',
    name: 'politicsAndEconomy',
    path: 'politics_and_economy',
  },
  {
    text: '文化．藝術',
    name: 'cultureAndArt',
    path: 'culture_and_art',
  },
  {
    text: '生活．醫療',
    name: 'livingAndMedicalCare',
    path: 'living_and_medical_care',
  },
  {
    text: '國際．兩岸',
    name: 'international',
    path: 'international',
  },
]

/* Contains the set value  */
export const breakpoints = {
  medium: {
    min: 768,
  },
  large: {
    min: 1024,
  },
  xlarge: {
    min: 1440,
  },
}

export const pageThemes = {
  bright: 'BRIGHT',
  dark: 'DARK',
  hpu: 'header-upon',
}

export const searchConfigs = {
  path: 'search',
}

export const memberConfigs = {
  path: 'signin',
}

export const bookmarkConfigs = {
  path: 'bookmarks',
}

// external: html a tag
// internal: react-router Link
// redirect: react-router router.push() or browserHistory.push()
export const linkType = {
  external: 'external',
  internal: 'internal',
  redirect: 'redirect',
}

export const linkPrefix = {
  article: '/a/',
  interactiveArticle: '/i/',
  categories: '/categories/',
  tag: '/tag/',
  topic: '/topic/',
  topics: '/topics/',
  author: '/author/',
  authors: '/authors',
}

export const channelConfigs = {
  review: {
    text: '評論',
    type: 'link',
    prefix: linkPrefix.categories,
    path: 'reviews',
  },
  topics: {
    text: '專題',
    type: 'link',
    prefix: '/',
    path: 'topics',
  },
  photography: {
    text: '攝影',
    type: 'link',
    prefix: '/',
    path: 'photography',
  },
  infographic: {
    text: '多媒體',
    type: 'link',
    prefix: linkPrefix.categories,
    path: 'infographic',
  },
  categories: {
    text: '議題',
    type: 'submenu',
    prefix: '/',
    path: '?section=categories',
  },
  hiring: {
    text: '徵才中',
    type: 'link',
    prefix: '/a/',
    path: 'hiring-job-description',
    styles: {
      color: '#c71b0a',
    },
  },
}

export const channels = ['review', 'topics', 'photography', 'infographic', 'categories']

export const externalLinks = {
  monthlyDonation: 'https://twreporter.backme.tw/checkout/175/3788',
  onceDonation: 'https://twreporter.backme.tw/checkout/175/3789',
  github: 'https://github.com/twreporter',
  line: 'http://line.me/ti/p/%40nbs5015j',
  facebook: 'https://www.facebook.com/twreporter/',
  rss: 'https://www.twreporter.org/a/rss2.xml',
  instagram: 'https://www.instagram.com/twreporter/',
  ccLicense: 'https://creativecommons.org/licenses/by-nc-nd/3.0/tw/',
  newsLetter: 'https://twreporter.us14.list-manage.com/subscribe/post?u=4da5a7d3b98dbc9fdad009e7e&id=e0eb0c8c32',
}

export const storage = {
  google: {
    schema: 'https',
    hostname: 'storage.googleapis.com',
    bucket: 'twreporter-multimedia',
  },
}

export const mainSite = {
  url: 'https://www.twreporter.org',
}
