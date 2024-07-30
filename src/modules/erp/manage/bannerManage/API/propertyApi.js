import { server } from "../../../../../constants";
import { httpClient } from "../../../../../utils/HttpClient";

// Property

const insertBannersFetch = async (body, accessToken) => {
  // Done
  try {
    const result = await httpClient.post(server.INSERT_BANNERS_URL, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return result?.data ?? null;
  } catch (err) {
    // status 404
    return null;
  }
};

const insertPropertiesFetch = async (param, body, accessToken) => {
  // Done
  try {
    const result = await httpClient.post(server.INSERT_PROPERTIES_URL, body, {
      headers: {
        "x-access-token": accessToken,
      },
    });
    return result?.data ?? null;
  } catch (err) {
    // status 404
    return null;
  }
};

const getPropertiesFetch = async (param, body, accessToken) => {
  // Done
  try {
    const result = await httpClient.get(
      server.GET_PROPERTIES_URL +
        `?propertyTypeId=${param.propertyTypeId}&name=${param.name}&isActive=${param.isActive}&page=${param.page}&size=${param.size}`,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    if (result.data.isSuccess) {
      return result.data.formData;
    } else {
      return null;
    }
  } catch (err) {
    // status 404
    return null;
  }
};

const getBannersFetch = async (param, accessToken) => {
  try {
    console.log(accessToken);
    const result = await httpClient.get(
      `${server.GET_BANNERS_URL}?keyword=${param.keyword}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("API", result);

    if (result.data.status) {
      return result.data.results;
    } else {
      return null;
    }
  } catch (err) {
    // status 404
    return null;
  }
};

const getPropertiesByIdFetch = async (param, body, accessToken) => {
  try {
    const result = await httpClient.get(
      server.GET_PROPERTIES_BY_ID_URL + `/${param.id}`,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    if (result.data.isSuccess) {
      return result.data.formData;
    } else {
      return null;
    }
  } catch (err) {
    // status 404
    return null;
  }
};

const updatePropertiesFetch = async (param, body, accessToken) => {
  try {
    const result = await httpClient.put(
      server.UPDATE_PROPERTIES_URL + `/${param.id}`,
      body,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    return result?.data ?? null;
  } catch (err) {
    // status 404
    return null;
  }
};

const updateBannersFetch = async (param, body, accessToken) => {
  try {
    console.log("param", param);
    console.log("body", body);
    const result = await httpClient.put(
      `${server.UPDATE_BANNERS_URL}/${param.id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Update", result);

    if (result.data.status) {
      return result.data.status;
    } else {
      return null;
    }
  } catch (err) {
    // status 404
    return null;
  }
};

const deleteBannerByIdFetch = async (param, body, accessToken) => {
  try {
    const result = await httpClient.delete(
      server.DELETE_BANNERS_URL + `/${param.id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return result?.data ?? null;
  } catch (err) {
    // status 404
    return null;
  }
};

const deletePropertiesByIdFetch = async (param, body, accessToken) => {
  try {
    const result = await httpClient.delete(
      server.DELETE_PROPERTIES_BY_ID_URL + `/${param.id}`,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    return result?.data ?? null;
  } catch (err) {
    // status 404
    return null;
  }
};

export {
  // get
  getPropertiesFetch,
  getBannersFetch,
  getPropertiesByIdFetch,

  // insert
  insertBannersFetch,
  insertPropertiesFetch,

  // update
  updatePropertiesFetch,
  updateBannersFetch,

  // delete
  deletePropertiesByIdFetch,
  deleteBannerByIdFetch,
};
