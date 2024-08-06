import { apiServerUrl, server } from "@/constants";
import { httpClient } from "@/utils/HttpClient";

const getErpSigninFetch = async (data) => {
  // Done
  try {
    const result = await httpClient.post(server.GET_ERP_SIGNIN_ID_URL, data, {
      headers: {
        Accept: "application/json",
      },
    });
    return result?.data ?? null;
  } catch (err) {
    return null;
  }
};

const getErpSignupFetch = async (data) => {
  // Done
  try {
    const result = await httpClient.post(server.GET_ERP_SIGNUP_ID_URL, data);
    return result?.data ?? null;
  } catch (err) {
    // status 404
    return null;
  }
};

const getErpSignOutFetch = async (accessToken) => {
  try {
    const result = await httpClient.delete(server.GET_ERP_SIGNOUT_ID_URL, {
      headers: {
        "x-access-token": accessToken,
      },
    });
    return result?.data ?? null;
  } catch (err) {
    return null;
  }
};

const getErpListFetch = async () => {
  // Done
  try {
    const result = await httpClient.get(server.GET_ERP_LIST_URL);
    return result?.data ?? null;
  } catch (err) {
    // status 404
    return null;
  }
};

export {
  // get
  getErpSigninFetch,
  getErpSignupFetch,
  getErpSignOutFetch,
  getErpListFetch,

  // insert

  // update

  // delete
};
