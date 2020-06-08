import React from "react";
import { isMobile } from "react-device-detect";
import MaterialSelect from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

function Select({ children, ...rest }) {
  const SelectComponent = isMobile ? NativeSelect : MaterialSelect;

  return <SelectComponent {...rest}>{children}</SelectComponent>;
}

export default Select;
