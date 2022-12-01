import * as React from "react";
import { Card, Box, Button } from "@mui/material";

function ErrorPage() {
  return (
    <div className="container">
      <Box display="flex" flexDirection="column" style={{ top: "0px" }}>
        <Box style={{ backgroundColor: "#ffffff", width: "100%" }}>
          <Card
            style={{
              backgroundColor: "#ffffff",
              width: "100%",
              boxShadow: "none",
            }}
          >
            <img
              style={{ objectFit: "cover", width: "30%", height: "30%" }}
              src={require("../images/error.png")}
            ></img>

            <h2 style={{fontSize: "30px", color: 'black'}}>SOMETHING WENT WRONG</h2>
          </Card>
        </Box>
        <Box>
            <Button variant="contained" style={{backgroundColor: "#d62828"}}>
                <h5 style={{margin: '0', fontSize: "20px"}}>Go back</h5>
            </Button>
        </Box>
      </Box>
    </div>
  );
}

export default ErrorPage;
