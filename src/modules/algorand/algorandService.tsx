import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

dayjs.extend(utc);

export default class AlgorandService {
  static async getAlgorandOverview(
    favoriteFilter,
    assetFilter,
    poolFilter
  ) {
    const params = {
      favoriteFilter,
      assetFilter,
      poolFilter,
    };

    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/algorand/overview`,
      {
        params,
      },
    );

    return response.data;
  }

  static async getAlgorandStatistics() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/algorand/general-stats`,
    );

    return response.data;
  }
  
  static async getAlgorandShowcase() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/algorand/showcase`,
    );

    return response.data;
  }

  static async setAlgorandShowcase(assetId) {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.put(
      `/tenant/${tenantId}/algorand/${assetId}/set-showcase`,
    );

    return response.data;
  }

  static async getAlgorandFavorites() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/algorand/favorites`,
    );

    return response.data;
  }

  static async getAlgorandAssets() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/algorand/assets`,
    );

    return response.data;
  }

  static async getAlgorandPools() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/algorand/pools`,
    );

    return response.data;
  }

  static async getAlgorandAssetHistory(assetId) {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/algorand/asset/${assetId}`,
    );

    return response.data;
  }

  static async getAlgorandPoolHistory(address) {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/algorand/pool/${address}`,
    );

    return response.data;
  }

  static async toggleAlgorandFavorite(assetId) {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.put(
      `/tenant/${tenantId}/algorand/favorite/${assetId}/toggle`,
    );

    return response.data;
  }

  static async getAlgoPriceChartData() {
    const to = Math.floor(Date.now() / 1000);
    const from = to - 31536000;
    const url = `https://price.algoexplorerapi.io/price/algo-usd/history?since=${from}&until=${to}&interval=1D`;
    const { data: { history } } = await axios.get(url);
    return history;
  }

  static async getMarketCapChartData() {
    const url = `https://indexer.algoexplorerapi.io/stats/v2/economics?interval=1W`;
    const { data: { data } } = await axios.get(url);
    return data;
  }
}
