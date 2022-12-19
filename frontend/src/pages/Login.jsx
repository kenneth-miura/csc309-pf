import * as React from "react";
import { Card, Box, Button } from "@mui/material";
import LoginCard from "../components/LoginCard";
import Navbar from "../components/Navbar";

function LoginPage() {
  return (
    <div>
      <Navbar position="sticky" isNotHomePage={true}></Navbar>
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
