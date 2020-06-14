import axios from "axios";

import extractIdFromSk from "../utils/extractIdFromSk";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
});

export default {
  getCurrentReference: async () => {
    const response = await instance.get("/currentReference");

    return response.data;
  },
  getBrands: async (vehicleType) => {
    const response = await instance.get(`/${vehicleType}/brands`);

    return response.data;
  },
  getModels: async (brandId) => {
    const response = await instance.get(
      `/brand/${extractIdFromSk(brandId)}/models`
    );

    return response.data;
  },
  getYearModels: async (modelId) => {
    const response = await instance.get(
      `/model/${extractIdFromSk(modelId)}/yearModels`
    );

    return response.data;
  },
};
