import extractIdFromSk from "../utils/extractIdFromSk";

export const brandsRoute = ({ vehicleType }) => `/${vehicleType}/marcas`;

export const modelsRoute = ({ vehicleType, brandSk }) =>
  `/${vehicleType}/marcas/${extractIdFromSk(brandSk)}/modelos`;

export const yearModelsRoute = ({ vehicleType, brandSk, modelSk }) =>
  `/${vehicleType}/marcas/${extractIdFromSk(brandSk)}/modelos/${extractIdFromSk(
    modelSk
  )}`;
