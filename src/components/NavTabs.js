import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

function NavTabs() {
  return (
    <AppBar position="static">
      <Tabs
        variant="fullWidth"
        // value={value}
        // onChange={handleChange}
        // aria-label="nav tabs example"
      >
        <Tab label="Page One">Carros</Tab>
        <Tab label="Page One">Motos</Tab>
      </Tabs>
    </AppBar>
  );
}

export default NavTabs;
