import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

function HomeCard({ label, image, onClick, customClass }) {
  return (
    <Card className={customClass}>
      <CardActionArea onClick={onClick}>
        <CardMedia component="img" height="140" image={image} title={label} />
        <CardContent>
          <Typography variant="h5" component="h2">
            {label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default HomeCard;
