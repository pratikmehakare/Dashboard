import { apiConnector } from "../apiConnector";
import { dashboardEndpoints } from "../api";

const { GET_TABLE_DATA_API, CREATE_TABLE_API, ADD_COLUMN_API } = dashboardEndpoints;

export const getTableData = async (token) => {
  let result = null;
  try {

    const response = await apiConnector("GET", GET_TABLE_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response || !response.data?.tableConfig) {
      throw new Error("Unexpected response format.");
    }

    result = response.data.tableConfig; 
  } catch (error) {
    console.error("GET_TABLE_DATA_API ERROR:", error);
    throw error;
  }
  return result;
};

export const createTable = async (columns, token) => {
  let result = null;
  try {

    const response = await apiConnector(
      "POST",
      CREATE_TABLE_API,
      { columns }, 
      { Authorization: `Bearer ${token}` }
    );

    if (!response || !response.data) {
      throw new Error("Unexpected response format.");
    }

    result = response.data;
  } catch (error) {
    console.error("CREATE_TABLE_API ERROR:", error);
    throw error;
  }
  return result;
};

export const addColumn = async (tableId, column, token) => {
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      ADD_COLUMN_API,
      { tableId, column }, 
      { Authorization: `Bearer ${token}` }
    );

    if (!response || !response.data) {
      throw new Error("Unexpected response format.");
    }

    result = response.data;
  } catch (error) {
    console.error("ADD_COLUMN_API ERROR:", error);
    throw error;
  }
  return result;
};
