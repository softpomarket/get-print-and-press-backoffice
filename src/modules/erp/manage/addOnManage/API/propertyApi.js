import { server } from "../../../../../constants";
import { httpClient } from "../../../../../utils/HttpClient";

// Property
const insertAddOnFetch = async (param, body, accessToken) => {
  // Done
  try {
    const result = await httpClient.post(server.INSERT_ADDON_URL, body, {
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

const insertPickUpFetch = async (param, body, accessToken) => {
  // Done
  try {
    const result = await httpClient.post(server.INSERT_PICKUP_URL, body, {
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

const getAddOnFetch = async (param, body, accessToken) => {
  // Done
  try {
    const result = await httpClient.get(
      server.GET_ADDON_URL + `?keyword=${param.name}`,
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

const getPickUpFetch = async (param, body, accessToken) => {
  // Done
  try {
    const result = await httpClient.get(
      server.GET_PICKUPS_URL + `?keyword=${param.name}`,
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

const updateAddOnFetch = async (param, body, accessToken) => {
  try {
    const result = await httpClient.put(
      server.UPDATE_ADDON_URL + `/${param.id}`,
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

const updatePickUpFetch = async (param, body, accessToken) => {
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
    console.log("UODATE fetch", result);
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

const deleteAddOnByIdFetch = async (param, body, accessToken) => {
  try {
    const result = await httpClient.delete(
      server.DELETE_ADDON_BY_ID_URL + `/${param.id}`,
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
  getPickUpFetch,
  getPropertiesFetch,
  getPropertiesByIdFetch,
  getAddOnFetch,

  // insert
  insertPickUpFetch,
  insertAddOnFetch,
  insertPropertiesFetch,

  // update
  updatePropertiesFetch,
  updatePickUpFetch,
  updateAddOnFetch,

  // delete
  deletePickUpByIdFetch,
  deleteAddOnByIdFetch,
  deletePropertiesByIdFetch,
};
