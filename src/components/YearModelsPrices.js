import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Loading from "./Loading";

import normalizeVehicleYear from "../utils/normalizeVehicleYear";
import normalizeVehicleFuelType from "../utils/normalizeVehicleFuelType";
import normalizeVehiclePrice from "../utils/normalizeVehiclePrice";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

function YearModelsPrices({ isLoading, yearModels }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ano</TableCell>
              <TableCell>Combustível</TableCell>
              <TableCell>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {yearModels.map((row) => (
              <TableRow key={row.sk} classes={{ root: classes.row }}>
                <TableCell>{normalizeVehicleYear(row.year)}</TableCell>
                <TableCell>{normalizeVehicleFuelType(row.fuelType)}</TableCell>
                <TableCell>{normalizeVehiclePrice(row.currentPrice)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default YearModelsPrices;
