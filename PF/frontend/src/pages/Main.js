import * as React from "react";
import "./Main.css";
import ImageCarousel from "../components/Carousel";
import { Card, Box, Button } from "@mui/material";

function Main() {
  return (
    <div className="container">
      <Box display="flex" flexDirection="column" style={{ top: "0px" }}>
        <Box style={{ backgroundColor: "#d62828", width: "100%" }}>
          {/* <ImageCarousel style={{boxShadow: 'none', margin: '0px', padding: '0px'}}></ImageCarousel> */}
          <Card
            style={{
              backgroundColor: "#d62828",
              width: "100%",
              boxShadow: "none",
            }}
          >
            <img
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              src={require("../images/coach.png")}
            ></img>
          </Card>
          <Card
            class="WelcomeText"
            style={{ backgroundColor: "#d62828", width: "100%" }}
          >
            <h1 style={{ color: "white" }}>WELCOME TO TORONTO FITNESS</h1>
          </Card>
        </Box>
        <Box style={{ backgroundColor: "white" }}>
          <Card style={{ boxShadow: "none" }}>
            <h3 style={{ fontSize: "50px" }}>Fitness Classes</h3>
            <hr
              style={{
                color: "#d62828",
                borderBottomWidth: "10px",
                width: "300px",
                marginBottom: "30px",
              }}
            ></hr>

            <h4 style={{ fontSize: "30px", color: "gray"}}>
              With 120+ classes to choose from, there’s a class for everyone at
              Toronto Fitness.
            </h4>
          </Card>
        </Box>
        <Box>
          <Card style={{ boxShadow: "none" }}>
            <Button style={{backgroundColor: "#d62828", marginBottom: "50px", width: "400px"}} variant="contained">
              <h5 style={{fontSize: "30px", margin: "0px", padding: "0px"}}>JOIN NOW</h5>
            </Button>
          </Card>
        </Box>
      </Box>
    </div>
  );
}

export default Main;
