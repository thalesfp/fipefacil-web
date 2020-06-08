import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import Select from "./Select";
import Option from "./Option";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

function SelectModel({
  disableSelect,
  isLoading,
  models,
  modelId,
  handleOnChange,
}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="select-model">
          {isLoading ? "Carregando modelos..." : "Modelo"}
        </InputLabel>
        <Select
          inputProps={{ id: "select-model", "data-testid": "select-model" }}
          value={modelId ?? ""}
          onChange={(event) => handleOnChange(event.target.value)}
          disabled={disableSelect}
        >
          <Option value="">&nbsp;</Option>
          {models.map((model) => (
            <Option key={model.sk} value={model.sk}>
              {model.name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectModel;
