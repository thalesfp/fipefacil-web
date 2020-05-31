import React from "react";
import Select from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

function SelectVehicleType({ vehicleTypeSelected, handleOnChange }) {
  return (
    <div>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="select-vehicle-type">Tipo de Veículo</InputLabel>
        <Select
          id="select-vehicle-type"
          value={vehicleTypeSelected}
          onChange={(event) => handleOnChange(event.target.value)}
        >
          <option value={1}>Carro</option>
          <option value={2}>Moto</option>
          <option value={3}>Caminhão</option>
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectVehicleType;
