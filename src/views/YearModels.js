import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
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

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

function convertFuelType(fuelId) {
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

function YearModels({ models }) {
  const classes = useStyles();

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <>
      <NavBar />
      <Container>
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Ano</TableCell>
                <TableCell>Combustivel</TableCell>
                <TableCell>Valor</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {models.map((model) => (
                <TableRow key={model.sk} hover>
                  <TableCell>{model.year}</TableCell>
                  <TableCell>{convertFuelType(model.fuelType)}</TableCell>
                  <TableCell>{formatter.format(model.currentPrice)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
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
