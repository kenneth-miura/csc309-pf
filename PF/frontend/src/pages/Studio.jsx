import React, { useState } from "react";
import { Card, Box, Button, TextField, InputLabel } from "@mui/material";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import StudioMap from "../components/StudioMap";
import Cookies from "universal-cookie";
import { redirect, useNavigate} from "react-router-dom";

function StudioPage() {
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");

  const isAuth = !!accessToken; // boolean value
  const navigate = useNavigate();


  return (
    <div>
      <Navbar position="sticky" isNotHomePage={true}></Navbar>
      (
        <div>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              top: "0px",
              alignItems: "center",
            }}
          >
            <StudioMap></StudioMap>
          </Box>
        </div>
      )
    </div>
  );
}

export default StudioPage;
