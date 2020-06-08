import React from "react";
import { isMobile } from "react-device-detect";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import Select from "./Select";

function SelectVehicleType({ vehicleTypeSelected, handleOnChange }) {
  const options = [
    { value: 1, label: "Carro" },
    { value: 2, label: "Moto" },
    { value: 3, label: "Caminhão" },
  ];

  return (
    <div>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="select-vehicle-type">Tipo de Veículo</InputLabel>
        <Select
          id="select-vehicle-type"
          value={vehicleTypeSelected}
          onChange={(event) => handleOnChange(parseInt(event.target.value, 10))}
        >
          {options.map(({ value, label }) =>
            isMobile ? (
              <option key={label} value={value}>
                {label}
              </option>
            ) : (
              <MenuItem key={label} value={value}>
                {label}
              </MenuItem>
            )
          )}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectVehicleType;
