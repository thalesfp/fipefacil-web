import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import Select from "./Select";
import Option from "./Option";

function SelectVehicleType({ vehicleTypeSelected, handleOnChange }) {
  return (
    <div>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="select-vehicle-type">Tipo de Veículo</InputLabel>
        <Select
          id="select-vehicle-type"
          value={vehicleTypeSelected}
          onChange={(event) => handleOnChange(parseInt(event.target.value, 10))}
        >
          <Option value={1}>Carro</Option>
          <Option value={2}>Moto</Option>
          <Option value={3}>Caminhão</Option>
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectVehicleType;
