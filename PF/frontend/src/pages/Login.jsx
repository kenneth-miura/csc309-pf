import * as React from "react";
import { Card, Box, Button } from "@mui/material";
import LoginCard from "../components/LoginCard/LoginCard";

function LoginPage() {
  return (
    <div>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          top: "0px",
          alignItems: "center",
        }}
      >
        <LoginCard></LoginCard>
      </Box>
    </div>
  );
}

export default LoginPage;
