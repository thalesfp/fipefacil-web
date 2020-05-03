import gql from "graphql-tag";

const listBrands = gql`
  query GetBrands($vehicleType: String!) {
    brands(vehicleType: $vehicleType) {
      sk
      name
    }
  }
`;

export default listBrands;
