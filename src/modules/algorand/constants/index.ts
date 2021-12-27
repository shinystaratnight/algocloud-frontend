export const CHART_TYPES = {
  BAR: 'BAR',
  AREA: 'AREA'
};

export const CHART_VIEW = {
  VOLUME: 'Volume',
  LIQUIDITY: 'Liquidity',
  PRICE: 'Price',
}

export const DATA_FREQUENCY = {
  DAY: 'DAY',
  HOUR: 'HOUR',
}

export const FACTORY_ADDRESS = '0xaC653cE27E04C6ac565FD87F18128aD33ca03Ba2'

export const BUNDLE_ID = '1'

export const timeframeOptions = {
  WEEK: '1 week',
  MONTH: '1 month',
  // THREE_MONTHS: '3 months',
  // YEAR: '1 year',
  ALL_TIME: 'All time'
}

// token list urls to fetch tokens from - use for warnings on tokens and pairs
export const SUPPORTED_LIST_URLS__NO_ENS = [
  'https://tokens.thugs.fi/tokens.json'
]

// hide from overview list
export const OVERVIEW_TOKEN_BLACKLIST = [
  '0x222d13dceb7820ae1e928a8c527c4f8e4c0ffa8b',
  '0xd46e7f33f8788f87d6017074dc4e4d781d3df91e',
  '0x223b53b64aa5f87d2de194a15701fc0bc7474a31',
  '0x2c92d0390f95477c70cb7b4b92050b0db5d04a1e',
  '0x8d27dccb0fb3d6621fa4f4155d719f4af159286e'
]

// pair blacklist
export const PAIR_BLACKLIST = [
  '0xdb740f15629d07086b13fab14e49a674721199ff',
]

/**
 * For tokens that cause erros on fee calculations
 */
export const FEE_WARNING_TOKENS = []
