import * as React from "react";
import "./Home.css";
import { Card, Box, Button } from "@mui/material";

function Main() {
  return (
    <div id="container">
      <Box id="box1">
        <Box id="box2">
          {/* <ImageCarousel style={{boxShadow: 'none', margin: '0px', padding: '0px'}}></ImageCarousel> */}
          <div style={{backgroundColor: "#d62828"}}>
            <Card id="imageCard">
              <img id="mainImage" src={require("../images/coach.png")}></img>
            </Card>
          </div>

          <Card id="welcomeText">
            <h1 id="title">WELCOME TO TORONTO FITNESS</h1>
          </Card>
        </Box>
        <Box id="box3">
          <Card id="contentCard">
            <h3>Fitness Classes</h3>
            <hr></hr>
            <h4>
              With 120+ classes to choose from, there’s a class for everyone at
              Toronto Fitness.
            </h4>
          </Card>
        </Box>
        <Box>
          <Card id="joinCard">
            <Button id="joinButton" variant="contained">
              <h5>JOIN NOW</h5>
            </Button>
          </Card>
        </Box>
      </Box>
    </div>
  );
}

export default Main;
