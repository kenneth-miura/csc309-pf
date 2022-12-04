import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, CardMedia } from "@mui/material";
import Box from "@mui/material/Box";

function ImageCarousel(props) {
  const items = [
    {
      img: require("../images/gym.png"),
    },
    {
      img: require("../images/weightlift.png"),
    },
    {
      img: require("../images/coach.png"),
    },
  ];

  return (
    <Carousel
      autoPlay
      animation="slide"
      style={{ width: "100%", backgroundColor: "#d62828" }}
      indicatorContainerProps={{
        style: {
          visibility: "hidden",
        },
      }}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  const imgUrl = props.item.img;
  console.log(imgUrl);

  return (
    <div>
      <Paper style={{ width: "100%" }}>
        <Box>
          <img src={imgUrl} style={{ width: "100%", height: "100%" }} />
        </Box>
      </Paper>
    </div>
  );
}
export default ImageCarousel;
