import extractIdFromSk from "../utils/extractIdFromSk";

export const brandsRoute = ({ vehicleType }) => `/${vehicleType}`;

export const modelsRoute = ({ vehicleType, brandSk }) =>
  `/${vehicleType}/${extractIdFromSk(brandSk)}/modelos`;

export const yearModelsRoute = ({ vehicleType, brandSk, modelSk }) =>
  `/${vehicleType}/${extractIdFromSk(brandSk)}/modelos/${extractIdFromSk(
    modelSk
  )}`;
