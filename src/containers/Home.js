import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import NavBar from "../components/NavBar";
import SelectVehicleType from "../components/SelectVehicleType";
import SelectBrand from "../components/SelectBrand";
import SelectModel from "../components/SelectModel";
import YearModelsPrices from "../components/YearModelsPrices";

import useReference from "../hooks/useReference";
import useBrands from "../hooks/useBrands";
import useModels from "../hooks/useModels";
import useYearModels from "../hooks/useYearModels";

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

  const { isLoading: isLoadingReference, reference } = useReference();
  const { isLoading: isLoadingBrands, brands } = useBrands(vehicleType);
  const { isLoading: isLoadingModels, models, disableModelSelect } = useModels(
    brandId
  );
  const { isLoading: isLoadingYearModels, yearModels } = useYearModels(brandId);

  const handleVehicleTypeOnChange = (vehicleTypeId) => {
    setModelId(null);
    setBrandId(null);

    setVehicleType(vehicleTypeId);
  };

  const handleBrandOnChange = (brandId) => {
    setModelId(null);

    setBrandId(brandId);
  };

  const handleModelOnChange = (modelId) => {
    setModelId(modelId);
  };

  return (
    <>
      <NavBar isLoading={isLoadingReference} reference={reference} />
      <Container maxWidth="sm">
        <Paper className={classes.container}>
          <SelectVehicleType
            vehicleTypeSelected={vehicleType}
            handleOnChange={handleVehicleTypeOnChange}
          />
          <SelectBrand
            isLoading={isLoadingBrands}
            brands={brands}
            brandId={brandId}
            handleOnChange={handleBrandOnChange}
          />
          <SelectModel
            disableSelect={disableModelSelect}
            isLoading={isLoadingModels}
            models={models}
            modelId={modelId}
            handleOnChange={handleModelOnChange}
          />
          {modelId && (
            <YearModelsPrices
              isLoading={isLoadingYearModels}
              yearModels={yearModels}
            />
          )}
        </Paper>
      </Container>
    </>
  );
}

export default Home;
