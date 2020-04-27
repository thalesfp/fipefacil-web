import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const listBrands = gql`
  query GetBrands($vehicleType: String!) {
    getBrands(vehicleType: $vehicleType) {
      sk
      name
    }
  }
`;

const extractIdFromSk = (sk) => sk.split("#")[1];

function Brands(props) {
  return (
    <div>
      {props.brands.map((brand) => (
        <p key={brand.sk}>
          <a href={`/${extractIdFromSk(brand.sk)}/models`}>{brand.name}</a>
        </p>
      ))}
    </div>
  );
}

export default graphql(listBrands, {
  options: {
    fetchPolicy: "cache-and-network",
    variables: {
      vehicleType: "cars",
    },
  },
  props: ({ data }) => ({
    brands: data.getBrands ? data.getBrands : [],
  }),
})(Brands);
