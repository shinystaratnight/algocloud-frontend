import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class AlgorandService {
  static async getAlgorandStats() {
    const tenantId = AuthCurrentTenant.get();

    const response = await authAxios.get(
      `/tenant/${tenantId}/algorand/general-stats`,
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
}
