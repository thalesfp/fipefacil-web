import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Container from "../components/Container";
import NavBar from "../components/NavBar";
import SelectVehicleType from "../components/SelectVehicleType";
import SelectBrand from "../components/SelectBrand";
import SelectModel from "../components/SelectModel";
import SelectYearModel from "../components/SelectYearModel";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

function Home() {
  const classes = useStyles();
  const [vehicleType, setVehicleType] = useState(1);
  const [brandId, setBrandId] = useState(null);
  const [modelId, setModelId] = useState(null);

  const handleVehicleTypeOnChange = (vehicleType) => {
    setModelId(null);
    setBrandId(null);
    setVehicleType(vehicleType);
  };

  const handleBrandOnChange = (brandId) => {
    setModelId(null);
    setBrandId(brandId);
  };

  return (
    <>
      <NavBar hideBackButton />
      <Container>
        <Paper className={classes.container}>
          <SelectVehicleType
            vehicleTypeSelected={vehicleType}
            handleOnChange={handleVehicleTypeOnChange}
          />
          <SelectBrand
            vehicleType={vehicleType}
            brandId={brandId}
            handleOnChange={handleBrandOnChange}
          />
          <SelectModel
            brandId={brandId}
            modelId={modelId}
            handleOnChange={setModelId}
          />
          {modelId && (
            <SelectYearModel
              vehicleType={vehicleType}
              brandId={brandId}
              modelId={modelId}
            />
          )}
        </Paper>
      </Container>
    </>
  );
}

export default Home;
