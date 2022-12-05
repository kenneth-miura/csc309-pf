import * as React from "react";
import { Card, Box, Button } from "@mui/material";
import Home from "@mui/icons-material/Home";

function HomePage() {
  return (
    <div id="container" style={{ display: "flex", flexDirection: "column" }}>
      <Box
        id="box1"
        style={{ display: "flex", flexDirection: "column", top: "0px" }}
      >
        <Box id="box2" style={{ backgroundColor: "#d62828", width: "100%" }}>
          {/* <ImageCarousel style={{boxShadow: 'none', margin: '0px', padding: '0px'}}></ImageCarousel> */}
          <div style={{ backgroundColor: "#d62828" }}>
            <Card
              id="imageCard"
              style={{
                backgroundColor: "#d62828",
                width: "100%",
                boxShadow: "none",
              }}
            >
              <img
                id="mainImage"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
                src={require("../images/coach.png")}
                alt="People at a gym"
              ></img>
            </Card>
          </div>

          <Card
            id="welcomeText"
            style={{ backgroundColor: "#d62828", width: "100%", height: "20%" }}
          >
            <h1 id="title" style={{ color: "white" }}>
              WELCOME TO TORONTO FITNESS
            </h1>
          </Card>
        </Box>
        <Box id="box3" style={{ backgroundColor: "white" }}>
          <Card id="contentCard" style={{ boxShadow: "none" }}>
            <h3 style={{ fontSize: "50px" }}>Fitness Classes</h3>
            <hr
              style={{
                color: "#d62828",
                borderBottomWidth: "10px",
                width: "300px",
                marginBottom: "30px",
              }}
            ></hr>
            <h4 style={{ fontSize: "30px", color: "gray" }}>
              With 120+ classes to choose from, there’s a class for everyone at
              Toronto Fitness.
            </h4>
          </Card>
        </Box>
        <Box>
          <Card id="joinCard" style={{ boxShadow: "none" }}>
            <Button
              id="joinButton"
              variant="contained"
              style={{
                backgroundColor: "#d62828",
                width: "400px",
                marginBottom: "50px",
              }}
            >
              <h3 style={{ margin: "0", padding: "0" }}>JOIN NOW</h3>
            </Button>
          </Card>
        </Box>
      </Box>
    </div>
  );
}

export default HomePage;
