import * as React from "react";
import { Card, Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <Box
        id="baseBox"
        style={{
          display: "flex",
          flexDirection: "column",
          top: "0px",
          alignItems: "center",
        }}
      >
        <Box class="errBox" style={{ backgroundColor: "white", width: "100%" }}>
          <Card
            id="errImageCard"
            style={{
              backgroundColor: "white",
              width: "100%",
              boxShadow: "none",
            }}
          >
            <img
              id="errorImg"
              style={{
                objectFit: "cover",
                width: "20%",
                height: "20%",
                position: "relative",
                paddingTop: "100px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src={require("../images/error.png")}
              alt="Person unplugging a wire"
            ></img>
            <h2
              style={{ fontSize: "30px", color: "black", textAlign: "center" }}
            >
              SOMETHING WENT WRONG
            </h2>
          </Card>
        </Box>
        <Box class="box">
          <Button
            id="goBackButton"
            variant="contained"
            style={{ backgroundColor: "#d62828" }}
          >
            <NavLink
              to={`/`}
              style={{ color: "white", textDecoration: "none" }}
            >
              <h5 style={{ margin: "0px", fontSize: "20px" }}>Go to Home</h5>
            </NavLink>
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default ErrorPage;
