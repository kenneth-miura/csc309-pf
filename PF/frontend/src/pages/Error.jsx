import * as React from "react";
import { Card, Box, Button } from "@mui/material";
import "./Error.css";

function ErrorPage() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
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
            <h5>Go back</h5>
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default ErrorPage;
