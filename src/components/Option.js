import React from "react";
import { isMobile } from "react-device-detect";
import MenuItem from "@material-ui/core/MenuItem";

const Option = React.forwardRef(({ children, ...props }, ref) => {
  return isMobile ? (
    <option {...props}>{children}</option>
  ) : (
    <MenuItem ref={ref} {...props}>
      {children}
    </MenuItem>
  );
});

export default Option;
