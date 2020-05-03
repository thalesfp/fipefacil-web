export const normalizeVehicleTypeFromApi = (vehicleType) => {
  switch (vehicleType) {
    case "cars":
      return "carros";
    case "motorcycles":
      return "motos";
    default:
      throw new Error(`Invalid vehicleType: ${vehicleType}`);
  }
};

export const normalizeVehicleTypeToApi = (vehicleType) => {
  switch (vehicleType) {
    case "carros":
      return "cars";
    case "motos":
      return "motorcycles";
    default:
      throw new Error(`Invalid vehicleType: ${vehicleType}`);
  }
};
