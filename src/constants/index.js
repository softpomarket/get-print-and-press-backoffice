const url = import.meta.env.VITE_APP_API_URL;
const version = import.meta.env.VITE_APP_API_VERSION;

export const HTTP_BASKET_ORDER_FETCHING = "HTTP_BASKET_ORDER_FETCHING";
export const HTTP_BASKET_ORDER_SUCCESS = "HTTP_BASKET_ORDER_SUCCESS";
export const HTTP_BASKET_ORDER_FAILED = "HTTP_BASKET_ORDER_FAILED";

///////////////////////// Localization Begin /////////////////////////
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";
export const NETWORK_CONNECTION_MESSAGE = "NETWORK_CONNECTION_MESSAGE";

export const serverUrl = url;
export const apiVersion = version;

export const apiServerUrl = serverUrl;

export const imgDefaultUrl = `./assets/images/default/df-img.png`;
export const videoDefaultUrl = `./assets/images/default/df-vdo.png`;
export const imgDefaltCardCourse = `./assets/images/default/df-card-course-img.png`;
export const img404notfound = `./assets/images/notfound/404notfound.jpg`;

export const paginate = 10000; // limit 10 k
export const sortASC = "ASC";
export const sortDESC = "DESC";

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";

export const server = {
  // ------------------------ PROPERTIES -----------------------------------------------------
  GET_BANNERS_URL: `/api/${apiVersion}/back-office/banner`,
  GET_PRODUCT_URL: `/api/${apiVersion}/back-office/product`,
  GET_KNOWLEDGE_URL: `/api/${apiVersion}/back-office/blog-knowledge`,

  INSERT_BANNERS_URL: `/api/${apiVersion}/back-office/banner`,
  INSERT_PRODUCT_URL: `/api/${apiVersion}/back-office/product`,
  INSERT_KNOWLEDGE_URL: `/api/${apiVersion}/back-office/blog-knowledge`,

  UPDATE_PICKUP_URL: `/api/${apiVersion}/back-office/product`,
  UPDATE_BANNERS_URL: `/api/${apiVersion}/back-office/banner`,
  UPDATE_KNOWLEDGE_URL: `/api/${apiVersion}/back-office/blog-knowledge`,

  DELETE_PRODUCT_BY_ID_URL: `/api/${apiVersion}/back-office/product`,
  DELETE_BANNERS_URL: `/api/${apiVersion}/back-office/banner`,
  DELETE_KNOWLEDGE_URL: `/api/${apiVersion}/back-office/blog-knowledge`,

  // ------------------------ ERP ------------------------------------------------------------
  GET_ERP_SIGNIN_ID_URL: `/api/${apiVersion}/auth/sign-in`,
  GET_ERP_SIGNUP_ID_URL: `/api/auth/signup`,
  GET_ERP_SIGNOUT_ID_URL: `/api/auth/signOut`,
  GET_ERP_LIST_URL: ``,
};
