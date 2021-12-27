import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class AlgorandService {
  static async getAlgorandStatistics() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/algorand/general-stats`,
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
}
