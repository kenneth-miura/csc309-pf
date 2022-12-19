import * as React from "react";
import { Card, Box, Button } from "@mui/material";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
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
        <RegisterForm></RegisterForm>
      </Box>
    </div>
  );
}

export default RegisterPage;