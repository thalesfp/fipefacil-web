import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

const listBrands = gql`
  query GetBrands($vehicleType: String!) {
    getBrands(vehicleType: $vehicleType) {
      sk
      name
    }
  }
`;

const extractIdFromSk = (sk) => sk.split("#")[1];

function Brands({ brands }) {
  return (
    <div>
      {brands.map((brand) => (
        <p key={brand.sk}>
          <Link to={`/${extractIdFromSk(brand.sk)}/models`}>{brand.name}</Link>
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
    brands: data.getBrands ?? null,
  }),
})(Brands);
