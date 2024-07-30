import { server } from "../../../../../constants";
import { httpClient } from "../../../../../utils/HttpClient";

// Property Type
const insertPropertyImageFetch = async (param, body, accessToken) => {
  // Done
  try {
    const result = await httpClient.post(
      server.INSERT_PROPERTY_IMAGE_URL,
      body,
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

const deletePropertyImageByIdFetch = async (param, body, accessToken) => {
  try {
    const result = await httpClient.delete(
      server.DELETE_PROPERTY_IMAGE_BY_ID_URL + `/${param.id}`,
      {
        headers: {
          "x-access-token": accessToken,
        },
      }
    );
    return result.data;
  } catch (err) {
    // status 404
    return null;
  }
};

export {
  // get

  // insert
  insertPropertyImageFetch,

  // update

  // delete
  deletePropertyImageByIdFetch,
};
