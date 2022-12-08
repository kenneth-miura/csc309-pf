import React, { useEffect } from "react";
import { Card, Box, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import ProfileInfoCard from "../components/ProfileInfo";
import Cookies from "universal-cookie";
import ErrorPage from "./Error";
import { redirect, useNavigate } from "react-router-dom";

function ClassTimetablePage() {
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");

  const isAuth = !!accessToken; // boolean value
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Navbar position="sticky" isNotHomePage={true}></Navbar>
      {isAuth && (
        <div>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              top: "0px",
              alignItems: "center",
            }}
          >
            
          </Box>
        </div>
      )}

      {/* Renders an error page if the user is not logged in */}
      {/* If someone can get it to reroute to /login, it'd be better "behavior" */}
      {!!!isAuth && <ErrorPage></ErrorPage>}
    </div>
  );
}

export default ClassTimetablePage;
