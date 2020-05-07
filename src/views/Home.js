import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Container from "../components/Container";
import NavBar from "../components/NavBar";
import HomeCard from "../components/HomeCard";
import { brandsRoute } from "../utils/createRoute";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
  },
}));

function Home() {
  const history = useHistory();
  const classes = useStyles();

  const handleOnClick = (vehicleType) =>
    history.push(brandsRoute({ vehicleType }));

  return (
    <>
      <NavBar hideBackButton />
      <Container>
        <HomeCard
          label="Preços de Carros"
          image="/precosCarros.jpg"
          onClick={() => handleOnClick("carros")}
          customClass={classes.card}
        />
        <HomeCard
          label="Preços de Motos"
          image="/precosMotos.jpg"
          onClick={() => handleOnClick("motos")}
          customClass={classes.card}
        />
      </Container>
    </>
  );
}

export default Home;
