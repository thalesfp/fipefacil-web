import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import Container from "../components/Container";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";

const listModels = gql`
  query GetModels($brandId: String!) {
    getModels(brandId: $brandId) {
      sk
      name
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  tableRow: {
    cursor: "pointer",
  },
}));

const extractIdFromSk = (sk) => sk.split("#")[1];

function Models({ match, models }) {
  const { brandId } = match.params;

  const history = useHistory();
  const classes = useStyles();

  const handleOnClick = (modelSk) =>
    history.push(`/${brandId}/models/${extractIdFromSk(modelSk)}`);

  const sortedModels = models.sort((modelA, modelB) => {
    const modelAName = modelA.name.toUpperCase();
    const modelBName = modelB.name.toUpperCase();

    if (modelAName > modelBName) {
      return 1;
    } else if (modelAName < modelBName) {
      return -1;
    }

    return 0;
  });

  return (
    <>
      <NavBar />
      <Container>
        {sortedModels.length === 0 ? (
          <Loading />
        ) : (
          <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Modelos</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedModels.map((model) => (
                  <TableRow className={classes.tableRow} key={model.sk} hover>
                    <TableCell onClick={() => handleOnClick(model.sk)}>
                      {model.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </>
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
    models: data.getModels ?? [],
  }),
})(Models);
