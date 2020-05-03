function normalizeVehicleFuelType(fuelId) {
  switch (fuelId) {
    case 1:
      return "Gasolina";
    case 2:
      return "Álcool";
    case 3:
      return "Diesel";
    default:
      return fuelId;
  }
}

export default normalizeVehicleFuelType;
