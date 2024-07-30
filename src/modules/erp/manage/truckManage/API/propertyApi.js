import { server } from "../../../../../constants";
import { httpClient } from "../../../../../utils/HttpClient";

// Property
const insertTruckFetch = async (param, body, accessToken) => {
  // Done
  try {
    const result = await httpClient.post(server.INSERT_TRUCK_URL, body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return result.data;
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

const getAllCategories = async () => {
  try {
    const result = await httpClient.get(server.GET_CATEGORY_URL);
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

const getTrucksFetch = async (param, body, accessToken) => {
  // Done
  try {
    const result = await httpClient.get(
      server.GET_TRUCKS_URL + `?keyword=${param.name}`,
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

const updateTruckFetch = async (param, body, accessToken) => {
  try {
    const result = await httpClient.put(
      server.UPDATE_TRUCK_URL + `/${param.id}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("UPDATE fetch", result);
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
const deletePickUpByIdFetch = async (param, body, accessToken) => {
  try {
    const result = await httpClient.delete(
      server.DELETE_PICKUP_BY_ID_URL + `/${param.id}`,
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

const deleteTruckByIdFetch = async (param, body, accessToken) => {
  try {
    const result = await httpClient.delete(
      server.DELETE_TRUCK_BY_ID_URL + `/${param.id}`,
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
  getTrucksFetch,
  getPropertiesFetch,
  getPropertiesByIdFetch,
  getAllCategories,

  // insert
  insertTruckFetch,
  insertPropertiesFetch,

  // update
  updatePropertiesFetch,
  updateTruckFetch,

  // delete
  deletePickUpByIdFetch,
  deleteTruckByIdFetch,
  deletePropertiesByIdFetch,
};
