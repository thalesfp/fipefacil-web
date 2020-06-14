import React from "react";
import { isMobile } from "react-device-detect";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";

import Select from "./Select";
import Option from "./Option";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  subheader: {
    backgroundColor: "#f5f5f5",
  },
}));

function SelectBrand({ isLoading, brands, brandId, handleOnChange }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="select-brand">
          {isLoading ? "Carregando marcas..." : "Marca"}
        </InputLabel>
        <Select
          inputProps={{ id: "select-brand", "data-testid": "select-brand" }}
          value={brandId ?? ""}
          onChange={(event) => handleOnChange(event.target.value)}
          disabled={isLoading}
        >
          <Option value="">&nbsp;</Option>
          {Object.keys(brands).map((key) =>
            isMobile ? (
              <optgroup label={key} key={key}>
                {brands[key].map((brand) => (
                  <option key={brand.sk} value={brand.sk}>
                    {brand.name}
                  </option>
                ))}
              </optgroup>
            ) : (
              [
                <ListSubheader className={classes.subheader}>
                  {key}
                </ListSubheader>,
                brands[key].map((brand) => (
                  <MenuItem key={brand.sk} value={brand.sk}>
                    {brand.name}
                  </MenuItem>
                )),
              ]
            )
          )}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectBrand;
