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

const listBrands = gql`
  query GetBrands($vehicleType: String!) {
    getBrands(vehicleType: $vehicleType) {
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

function Brands({ brands }) {
  const history = useHistory();
  const classes = useStyles();

  const handleOnClick = (brandSk) =>
    history.push(`/${extractIdFromSk(brandSk)}/models`);

  return (
    <>
      <NavBar hideBackButton />
      <Container>
        <Paper>
          <TableContainer className={classes.tableContainer}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Marcas</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brands.map((brand) => (
                  <TableRow className={classes.tableRow} key={brand.sk} hover>
                    <TableCell onClick={() => handleOnClick(brand.sk)}>
                      {brand.name}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
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
    brands: data.getBrands ?? [],
  }),
})(Brands);