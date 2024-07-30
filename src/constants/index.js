const url = process.env.REACT_APP_API_URL
const version = process.env.REACT_APP_API_VERSION

export const HTTP_BASKET_ORDER_FETCHING = "HTTP_BASKET_ORDER_FETCHING";
export const HTTP_BASKET_ORDER_SUCCESS = "HTTP_BASKET_ORDER_SUCCESS";
export const HTTP_BASKET_ORDER_FAILED = "HTTP_BASKET_ORDER_FAILED";

///////////////////////// Localization Begin /////////////////////////
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";
export const NETWORK_CONNECTION_MESSAGE = "NETWORK_CONNECTION_MESSAGE";

export const serverUrl = url
export const apiVersion = version

export const apiServerUrl = serverUrl; // + "" "/api/${apiVersion}"

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
  GET_ADDON_URL: `/api/${apiVersion}/back-office/add-on`,
  GET_PRODUCT_URL: `/api/${apiVersion}/back-office/product`,
  GET_CATEGORY_URL: `/api/${apiVersion}/truck/category`,
  GET_TRUCKS_URL: `/api/${apiVersion}/back-office/truck`,
  GET_PROPERTIES_URL: `/api/properties`,
  GET_PROPERTIES_BY_ID_URL: `/api/properties`,
  GET_HOMEPAGE_PROPERTIES_URL: `/api/homePage/properties`,
  GET_PROPERTY_DETAIL_PAGE_URL: `/api/propertyDetailPage`,

  INSERT_BANNERS_URL: `/api/${apiVersion}/back-office/banner`,
  INSERT_PRODUCT_URL: `/api/${apiVersion}/back-office/product`,
  INSERT_ADDON_URL: `/api/${apiVersion}/back-office/add-on`,
  INSERT_TRUCK_URL: `/api/${apiVersion}/back-office/truck`,
  INSERT_PROPERTIES_URL: `/api/properties`,

  UPDATE_PROPERTIES_URL: `/api/properties`,
  UPDATE_PICKUP_URL: `/api/${apiVersion}/back-office/pick-up`,
  UPDATE_ADDON_URL: `/api/${apiVersion}/back-office/add-on`,
  UPDATE_TRUCK_URL: `/api/${apiVersion}/back-office/truck`,
  UPDATE_BANNERS_URL: `/api/${apiVersion}/back-office/banner`,

  DELETE_PROPERTIES_BY_ID_URL: `/api/properties`,
  DELETE_ADDON_BY_ID_URL: `/api/${apiVersion}/back-office/add-on`,
  DELETE_PICKUP_BY_ID_URL: `/api/${apiVersion}/back-office/pickup`,
  DELETE_TRUCK_BY_ID_URL: `/api/${apiVersion}/back-office/truck`,
  DELETE_BANNERS_URL: `/api/${apiVersion}/back-office/banner`,

  // ------------------------ PROPERTIES TYPE ------------------------------------------------
  GET_PROPERTY_TYPES_URL: `/api/propertyTypes`,
  GET_PROPERTY_TYPES_BY_ID_URL: `/api/propertyTypes`,

  INSERT_PROPERTY_TYPES_URL: `/api/propertyTypes`,

  UPDATE_PROPERTY_TYPES_URL: `/api/propertyTypes`,

  DELETE_PROPERTY_TYPES_BY_ID_URL: `/api/propertyTypes`,

  // ------------------------ PROPERTIES IMAGE -----------------------------------------------
  INSERT_PROPERTY_IMAGE_URL: `/api/property-images`,

  DELETE_PROPERTY_IMAGE_BY_ID_URL: `/api/property-images`,

  // ------------------------ ERP ------------------------------------------------------------
  GET_ERP_SIGNIN_ID_URL: `/api/${apiVersion}/auth/sign-in`,
  GET_ERP_SIGNUP_ID_URL: `/api/auth/signup`,
  GET_ERP_SIGNOUT_ID_URL: `/api/auth/signOut`,
  GET_ERP_LIST_URL: ``,
};
