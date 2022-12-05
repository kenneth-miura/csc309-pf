import * as React from "react";
import { Card, Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";

function ProfilePage() {
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
        {/* <LoginCard></LoginCard> */}
      </Box>
    </div>
  );
}

export default ProfilePage;
