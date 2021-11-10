import authAxios from 'src/modules/shared/axios/authAxios';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

export default class SuperadminService {

  static async fetchUsers(filter, orderBy, limit, offset) {
    const params = {
      filter,
      orderBy,
      limit,
      offset,
    };

    const response = await authAxios.get(
      `/superadmin/user`,
      {
        params,
      },
    );

    return response.data;
  }

  static async updateUser(id) {
    const response = await authAxios.put(
      `/superadmin/user/${id}/toggle-status`,
      {},
    );

    return response.data;
  }

}
