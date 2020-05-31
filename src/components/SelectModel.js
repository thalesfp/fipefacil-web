import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/NativeSelect";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import api from "../api/api";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
}));

function SelectModel({ brandId, modelId, handleOnChange }) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [disableSelect, setDisableSelect] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await api.getModels(brandId);

        setData(result);
        setDisableSelect(false);
      } catch (error) {
        console.log(error);
        setDisableSelect(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (brandId) {
      fetchData();
    } else {
      setDisableSelect(true);
    }
  }, [brandId]);

  return (
    <div className={classes.container}>
      <FormControl fullWidth={true}>
        <InputLabel htmlFor="select-model">
          {isLoading ? "Carregando modelos..." : "Modelo"}
        </InputLabel>
        <Select
          inputProps={{ id: "select-model" }}
          value={modelId ?? ""}
          onChange={(event) => handleOnChange(event.target.value)}
          disabled={disableSelect}
        >
          <option value="" />
          {data.map((model) => (
            <option key={model.sk} value={model.sk}>
              {model.name}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SelectModel;
