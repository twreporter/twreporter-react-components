import { externalLinks, linkPrefix, mainSite } from 'shared/configs'

const currentYear = new Date().getFullYear().toString()

export const staticFilePrefix = `${mainSite.url}/images/footer/`
export const footerItemList = [
  {
    slug: 'about',
    text: '關於我們',
    link: `${mainSite.url}${linkPrefix.aboutus}`,
    target: '_blank',
    newFlag: true,
  },
  {
    slug: 'contact',
    text: '聯絡我們',
    link: `${mainSite.url}${linkPrefix.article}contact-footer`,
    target: '_blank',
  },
  {
    slug: 'authors',
    text: '作者群',
    link: `${mainSite.url}/authors`,
    target: '_self',
  },
  {
    slug: 'privacy',
    text: '隱私政策',
    link: `${mainSite.url}${linkPrefix.article}privacy-footer`,
    target: '_blank',
  },
  {
    slug: 'license',
    text: '許可協議',
    link: `${mainSite.url}${linkPrefix.article}license-footer`,
    target: '_blank',
  },
  {
    slug: 'donate',
    text: '捐款徵信',
    link: `${mainSite.url}${linkPrefix.article}credit-donate`,
    target: '_blank',
  },
  {
    slug: 'about',
    text: '加入我們',
    link: `${mainSite.url}${linkPrefix.article}hiring-job-description`,
    target: '_blank',
  },
  {
    slug: 'license',
    text: '常見問題',
    link: `${mainSite.url}${linkPrefix.article}about-us-questions`,
    target: '_blank',
  },
  {
    slug: 'subcribe',
    text: '訂閱電子報',
    link: externalLinks.newsLetter,
    target: '_blank',
  },
]

export const donatePage = {
  link: externalLinks.monthlyDonation,
  target: '_blank',
}

export const footerIconList = [
  {
    slug: 'facebook',
    text: 'Facebook',
    link: externalLinks.facebook,
    target: '_blank',
  },
  {
    slug: 'instagram',
    text: 'Instagram',
    link: externalLinks.instagram,
    target: '_blank',
  },
  {
    slug: 'line',
    text: 'Line',
    link: externalLinks.line,
    target: '_blank',
  },
  {
    slug: 'medium',
    text: 'Medium',
    link: externalLinks.medium,
    target: '_blank',
    logoInPureBlackWhite: true,
  },
  {
    slug: 'github',
    text: 'Github',
    link: externalLinks.github,
    target: '_blank',
    logoInPureBlackWhite: true,
  },
  {
    slug: 'rss',
    text: 'RSS',
    link: externalLinks.rss,
    target: '_blank',
  },
]

export const donateUSText = '贊助我們'
export const copyRightText = `Copyright © ${currentYear} The Reporter.`

