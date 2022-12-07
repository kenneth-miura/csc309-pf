import * as React from "react";
import { Card, Box, Button, Input, InputLabel, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProfileEditCard from "../components/ProfileEditCard";
import Cookies from "universal-cookie";
import ErrorPage from "./Error";
import { redirect, useNavigate } from "react-router-dom";

function EditAvatarPage() {
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");

  const isAuth = !!accessToken; // boolean value
  const navigate = useNavigate();

  const handleOnClick = () => {
    const formData = new FormData();
    const fileInput = document.querySelector("#avatar");
    console.log(fileInput);

    formData.append("avatar", fileInput.files[0]);

    fetch("http://127.0.0.1:8000/accounts/update/", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: formData, // JSON.stringify({avatar: avatar}),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("success");

        navigate("/myaccount");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <Card
              style={{
                marginTop: "20vh",
                height: "100%",
              }}
            >
              <Stack style={{ margin: "20px" }}>
                <InputLabel style={{ paddingTop: "20px" }} htmlFor="avatar">
                  Avatar
                </InputLabel>
                <Input type="file" id="avatar" name="avatar"></Input>
                <Button
                  onClick={handleOnClick}
                  style={{
                    color: "#d62828",
                    marginTop: "20px",
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </Card>
          </Box>
        </div>
      )}

      {/* Renders an error page if the user is not logged in */}
      {/* If someone can get it to reroute to /login, it'd be better "behavior" */}
      {!!!isAuth && <ErrorPage></ErrorPage>}
    </div>
  );
}

export default EditAvatarPage;
