import gql from "graphql-tag";

const listModels = gql`
  query GetModels($vehicleType: String!, $brandId: String!) {
    brand(vehicleType: $vehicleType, brandId: $brandId) {
      pk
      sk
      name
    }
    models(brandId: $brandId) {
      pk
      sk
      name
    }
  }
`;

export default listModels;
