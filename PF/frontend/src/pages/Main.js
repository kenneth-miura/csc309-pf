import * as React from "react";
import './Main.css'
import ImageCarousel from '../components/Carousel'
import { Card, Box, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";

function Main() {
  function GridItem() {
    return (
      // From 0 to 600px wide (smart-phones), I take up 12 columns, or the whole device width!
      // From 600-690px wide (tablets), I take up 6 out of 12 columns, so 2 columns fit the screen.
      // From 960px wide and above, I take up 25% of the device (3/12), so 4 columns fit the screen.
      <Grid item style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Card style={{ width: "100%" }}>THERE ARE ITEMS HERE</Card>
      </Grid>
    );
  }

  return (
    <div className="container">
        <Box display="flex" flexDirection="column" style={{top: '0px'}}>
            <Box style={{backgroundColor: "#d62828", width: "100%"}}>
                {/* <ImageCarousel style={{margin: '0px', padding: '0px'}}></ImageCarousel> */}
                <Card>
                    <img style={{objectFit: "cover", width: '100%', height: '100%'}} src={require("../images/coach.png")}></img>
                </Card>

                <Card class="WelcomeText" style={{backgroundColor: "#d62828", width: "100%"}}>
                    <h1 style={{color: "white"}}>WELCOME TO TORONTO FITNESS</h1>
                </Card>

            </Box>
            <Box style={{backgroundColor: "yellow"}}>
                hello
            </Box>
        </Box>

      {/* <Box sx={{ display: 'grid', gridTemplateRows: 'repeat(3, 1fr)' }}>
            <Card style={{width: "100%", height: "60%", position: 'fixed', top: '0px'}}>
                <img style={{objectFit: "cover", width: '100%', height: '100%'}} src={require("../images/coach.png")}></img>
            </Card>

            <Card class="WelcomeText" style={{backgroundColor: "#d62828", width: "100%"}}>
                <h1>WELCOME TO TORONTO FITNESS</h1>
            </Card>
        </Box> */}
    </div>
  );
}

export default Main;
