import gql from "graphql-tag";

const listYearModels = gql`
  query GetYearModels(
    $vehicleType: String!
    $brandId: String!
    $modelId: String!
  ) {
    brand(vehicleType: $vehicleType, brandId: $brandId) {
      pk
      sk
      name
    }

    model(brandId: $brandId, modelId: $modelId) {
      pk
      sk
      name
    }

    yearModels(modelId: $modelId) {
      sk
      currentPrice
      fuelType
      year
    }
  }
`;

export default listYearModels;
