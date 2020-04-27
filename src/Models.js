import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const listModels = gql`
  query GetModels($brandId: String!) {
    getModels(brandId: $brandId) {
      sk
      name
    }
  }
`;

const extractIdFromSk = (sk) => sk.split("#")[1];

function Models(props) {
  return (
    <div>
      {props.models.map((model) => (
        <p key={model.sk}>
          <a
            href={`/${props.match.params.brandId}/models/${extractIdFromSk(
              model.sk
            )}`}
          >
            {model.name}
          </a>
        </p>
      ))}
    </div>
  );
}

export default graphql(listModels, {
  options: ({
    match: {
      params: { brandId },
    },
  }) => ({
    fetchPolicy: "cache-and-network",
    variables: {
      brandId: `BRAND#${brandId}`,
    },
  }),
  props: ({ data }) => ({
    models: data.getModels ? data.getModels : [],
  }),
})(Models);
