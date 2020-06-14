import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";

import NavBar from "../components/NavBar";
import SelectVehicleType from "../components/SelectVehicleType";
import SelectBrand from "../components/SelectBrand";
import SelectModel from "../components/SelectModel";
import YearModelsPrices from "../components/YearModelsPrices";

import api from "../api/api";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const organizeBrands = (allBrands = []) => {
  const popularBrands = [];
  const brands = [];

  allBrands.forEach((brand) =>
    brand.popular ? popularBrands.push(brand) : brands.push(brand)
  );

  return {
    "Marcas Populares": sortBrands(popularBrands),
    "Outras Marcas": sortBrands(brands),
  };
};

const sortBrands = (brands) =>
  brands.sort((brandA, brandB) => {
    const brandAName = brandA.name.toUpperCase();
    const brandBName = brandB.name.toUpperCase();

    if (brandAName > brandBName) {
      return 1;
    } else if (brandAName < brandBName) {
      return -1;
    }

    return 0;
  });

const sortModels = (models) =>
  models.sort((modelA, modelB) => modelA.name.localeCompare(modelB.name));

const sortYearModels = (yearModels) =>
  yearModels.sort((modelA, modelB) => modelB.year - modelA.year);

function Home() {
  const classes = useStyles();
  const [vehicleType, setVehicleType] = useState(1);
  const [brandId, setBrandId] = useState(null);
  const [modelId, setModelId] = useState(null);
  const [brands, setBrands] = useState({ popularBrands: [], otherBrands: [] });
  const [models, setModels] = useState([]);
  const [yearModels, setYearModels] = useState([]);
  const [disableModelSelect, setDisableModelSelect] = useState(false);
  const [isLoading, setIsLoading] = useState({
    brands: false,
    models: false,
    yearModels: false,
  });

  const sendEventToGa = (name, value) => {
    window.dataLayer.push({ [name]: value });
  };

  const handleVehicleTypeOnChange = (vehicleTypeId) => {
    setVehicleType(vehicleTypeId);
    sendEventToGa("vehicleType", vehicleTypeId);
  };

  const handleBrandOnChange = (brandId) => {
    setBrandId(brandId);
    sendEventToGa("brandId", brandId);
  };

  const handleModelOnChange = (modelId) => {
    setModelId(modelId);
    sendEventToGa("modelId", modelId);
  };

  useEffect(() => {
    const fetchData = async () => {
      setModelId(null);
      setBrandId(null);
      setIsLoading({ brands: true, models: false, yearModels: false });

      try {
        const result = await api.getBrands(vehicleType);

        setBrands(organizeBrands(result));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading({ brands: false, models: false, yearModels: false });
      }
    };

    fetchData();
  }, [vehicleType]);

  useEffect(() => {
    const fetchData = async () => {
      setModelId(null);
      setIsLoading({ brands: false, models: true, yearModels: false });

      try {
        const result = await api.getModels(brandId);

        setModels(sortModels(result));
        setDisableModelSelect(false);
      } catch (error) {
        console.log(error);
        setDisableModelSelect(true);
      } finally {
        setIsLoading({ brands: false, models: false, yearModels: false });
      }
    };

    if (brandId) {
      fetchData();
    } else {
      setDisableModelSelect(true);
    }
  }, [brandId]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading({ brands: false, models: false, yearModels: true });

      try {
        const result = await api.getYearModels(modelId);

        setYearModels(sortYearModels(result));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading({ brands: false, models: false, yearModels: false });
      }
    };

    fetchData();
  }, [modelId]);

  return (
    <>
      <NavBar />
      <Container maxWidth="sm">
        <Paper className={classes.container}>
          <SelectVehicleType
            vehicleTypeSelected={vehicleType}
            handleOnChange={handleVehicleTypeOnChange}
          />
          <SelectBrand
            isLoading={isLoading.brands}
            brands={brands}
            brandId={brandId}
            handleOnChange={handleBrandOnChange}
          />
          <SelectModel
            disableSelect={disableModelSelect}
            isLoading={isLoading.models}
            models={models}
            modelId={modelId}
            handleOnChange={handleModelOnChange}
          />
          {modelId && (
            <YearModelsPrices
              isLoading={isLoading.yearModels}
              yearModels={yearModels}
            />
          )}
        </Paper>
      </Container>
    </>
  );
}

export default Home;
