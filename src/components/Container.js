import React from "react";
import ContainerMaterial from "@material-ui/core/Container";

function Container({ children }) {
  return <ContainerMaterial maxWidth="sm">{children}</ContainerMaterial>;
}

export default Container;
