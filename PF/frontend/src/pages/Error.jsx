import * as React from "react";
import { Card, Box, Button } from "@mui/material";
import "./Error.css";
import { NavLink } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <Box id="baseBox">
        <Box class="errBox">
          <Card id="errImageCard">
            <img id="errorImg" src={require("../images/error.png")}></img>
            <h2>
              SOMETHING WENT WRONG
            </h2>
          </Card>
        </Box>
        <Box class="box">
          <Button id="goBackButton" variant="contained">
            <NavLink to={`/`} style={{color: 'white', textDecoration: 'none'}}><h5>Go to Home</h5></NavLink>
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default ErrorPage;
