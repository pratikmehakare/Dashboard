const BASE_URL = process.env.REACT_APP_BASE_URL
//const BASE_URL = "http://localhost:5000/api/v1"

// AUTH ENDPOINTS
export const authEndpoints = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",

}

// BLOG ENDPOINTS
export const dashboardEndpoints = {
    CREATE_TABLE_API: BASE_URL + "/dashboard/createTable",
    ADD_COLUMN_API: BASE_URL + "/dashboard/addColumn",
    GET_TABLE_DATA_API: BASE_URL + "/dashboard/config",
}