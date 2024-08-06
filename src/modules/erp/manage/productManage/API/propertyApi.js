import { server } from "@/constants";
import { httpClient } from "@/utils/HttpClient";

// Property
const insertProductFetch = async (param, body, accessToken) => {
  // Done
  try {
    const result = await httpClient.post(server.INSERT_PRODUCT_URL, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return result;
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

const getProductFetch = async (param, body, accessToken) => {
  // Done
  try {
    const result = await httpClient.get(
      server.GET_PRODUCT_URL + `?title=${param.name}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (result.data.status) {
      return result.data;
    } else {
      return null;
    }
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

const updateProductFetch = async (param, body, accessToken) => {
  try {
    const result = await httpClient.put(
      server.UPDATE_PICKUP_URL + `/${param.id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return result.data;
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
const deleteProductByIdFetch = async (param, body, accessToken) => {
  try {
    const result = await httpClient.delete(
      server.DELETE_PRODUCT_BY_ID_URL + `/${param.id}`,
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
  getProductFetch,
  getPropertiesFetch,
  getPropertiesByIdFetch,

  // insert
  insertProductFetch,
  insertPropertiesFetch,

  // update
  updatePropertiesFetch,
  updateProductFetch,

  // delete
  deleteProductByIdFetch,
  deletePropertiesByIdFetch,
};
