import axios from "axios";

export const BASE_API_URL = 'https://mainnet.analytics.tinyman.org/api/v1';

export const getPairs = async () => {
  const url = `${BASE_API_URL}/pools/?limit=20&ordering=-liquidity&with_statistics=true&verified_only=true`;
  const { data: { results } } = await axios.get(url);
  return results;
}

export const getTokens = async () => {
  const url = `${BASE_API_URL}/assets/?limit=20&is_pool_member=true&with_statistics=true&verified_only=true`;
  const { data: { results } } = await axios.get(url);
  return results;
}

export const getTransactions = async () => {
  const url = `${BASE_API_URL}/operations/?limit=20&type__in=swap%2Cmint%2Cburn`;
  const { data: { results } } = await axios.get(url);
  return results;
}

export const getPairPrices = async (from, to) => {
  const url = `https://api.v3.tinychart.org/asset/${from}/${to}/prices/?start=1637453741&end=100000000000000`;
  const { data: { candles } } = await axios.get(url);
  return candles;
}

export const getMarketCapChartData = async () => {
  const url = `https://indexer.algoexplorerapi.io/stats/v2/economics?interval=1W`;
  const { data: { data } } = await axios.get(url);
  return data;
}

export const getAlgoPriceChartData = async () => {
  const url = `https://price.algoexplorerapi.io/price/algo-usd/history?since=1568732400&until=1637681658&interval=1D`;
  const { data: { history } } = await axios.get(url);
  return history;
}