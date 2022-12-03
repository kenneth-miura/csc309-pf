import * as React from "react";
import { Card, Box, Button } from "@mui/material";
import "./Error.css";

function ErrorPage() {
  return (
    <div>
      <Box id="baseBox">
        <Box class="box">
          <Card id="imageCard">
            <img src={require("../images/error.png")}></img>
            <h2>
              SOMETHING WENT WRONG
            </h2>
          </Card>
        </Box>
        <Box class="box">
          <Button id="goBackButton" variant="contained">
            <h5>Go back</h5>
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default ErrorPage;
