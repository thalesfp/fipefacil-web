import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/NativeSelect";

import api from "../api/api";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

const organizeBrands = (allBrands = []) => {
  const popularBrands = [];
  const brands = [];

  allBrands.forEach((brand) =>
    brand.popular ? popularBrands.push(brand) : brands.push(brand)
  );

  return {
    popularBrands: sortBrands(popularBrands),
    otherBrands: sortBrands(brands),
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

function SelectBrand({ vehicleType, brandId, handleOnChange }) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({ popularBrands: [], otherBrands: [] });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await api.getBrands(vehicleType);

        setData(organizeBrands(result));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [vehicleType]);

  return (
    <div className={classes.container}>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="select-brand">
          {isLoading ? "Carregando marcas..." : "Marca"}
        </InputLabel>
        <Select
          inputProps={{ id: "select-brand" }}
          value={brandId ?? ""}
          onChange={(event) => handleOnChange(event.target.value)}
          disabled={isLoading}
        >
          <option value="" />
          <optgroup label="Marcas Populares">
            {data.popularBrands.map((brand) => (
              <option key={brand.sk} value={brand.sk}>
                {brand.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Outras marcas">
            {data.otherBrands.map((brand) => (
              <option key={brand.sk} value={brand.sk}>
                {brand.name}
              </option>
            ))}
          </optgroup>
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectBrand;
