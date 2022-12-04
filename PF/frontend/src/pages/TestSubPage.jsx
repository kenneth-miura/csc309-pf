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
      <h1>THIS IS A TEXT</h1>
      </Box>
    </div>
  );
}

export default ErrorPage;
