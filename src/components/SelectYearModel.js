import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Loading from "./Loading";

import api from "../api/api";
import normalizeVehicleYear from "../utils/normalizeVehicleYear";
import normalizeVehicleFuelType from "../utils/normalizeVehicleFuelType";
import normalizeVehiclePrice from "../utils/normalizeVehiclePrice";

const sortYearModels = (yearModels) =>
  yearModels.sort((modelA, modelB) => modelB.year - modelA.year);

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

function SelectYearModel({ modelId }) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await api.getYearModels(modelId);

        setData(sortYearModels(result));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [modelId]);

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
            {data.map((row) => (
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

export default SelectYearModel;
