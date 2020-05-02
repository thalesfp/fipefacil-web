import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const listYearModels = gql`
  query GetYearModels($modelId: String!) {
    getYearModels(modelId: $modelId) {
      sk
      currentPrice
      fuelType
      year
    }
  }
`;

function YearModels(props) {
  return (
    <div>
      {props.models.map((model) => (
        <p key={model.sk}>
          {model.year}-{model.fuelType} -> {model.currentPrice}
        </p>
      ))}
    </div>
  );
}

export default graphql(listYearModels, {
  options: ({
    match: {
      params: { modelId },
    },
  }) => ({
    fetchPolicy: "cache-and-network",
    variables: {
      modelId: `MODEL#${modelId}`,
    },
  }),
  props: ({ data }) => ({
    models: data.getYearModels ?? [],
  }),
})(YearModels);
