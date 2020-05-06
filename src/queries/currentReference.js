import gql from "graphql-tag";

const currentReference = gql`
  query CurrentReference {
    currentReference {
      sk
      month
      year
    }
  }
`;

export default currentReference;
