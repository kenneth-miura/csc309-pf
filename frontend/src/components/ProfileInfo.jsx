import React, { useState, useEffect } from "react";
import {
  Tab,
  Card,
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Stack,
} from "@mui/material";
import Cookies from "universal-cookie";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Grid } from "@mui/material";

function ProfileInfoCard(props) {
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const navigate = useNavigate();

  function handleEditProfileClick() {
    navigate("/myaccount/edit");
  }

  useEffect(() => {
    fetch("http://127.0.0.1:8000/accounts/info/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Retrieved data upon page load.")
        // console.log(data);
        // console.log(data.avatar);

        setUsername(data.username);
        setPassword(data.password);
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setAvatar(data.avatar);
        setPhoneNum(data.phone_number);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessToken]);

  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            backgroundColor: "white",
            width: "100vw",
            height: "100vh",
            marginTop: "15vh",
            //   marginBottom: "24vh",
            boxShadow: "none",
          }}
        >
          <h3
            style={{ textAlign: "center", color: "#d62828", fontSize: "50px" }}
          >
            MY ACCOUNT
          </h3>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Card
              style={{
                backgroundColor: "white",
                width: "50%",
                height: "300px",
              }}
            >
              <Grid container spacing={2}>
                <Grid>
                  <Stack>
                    <Avatar
                      sx={{
                        width: "100px",
                        height: "100px",
                        marginTop: "50px",
                        marginLeft: "80px",
                      }}
                      alt={firstName}
                      src={avatar}
                    ></Avatar>
                    <Button
                      onClick={handleEditProfileClick}
                      variant="secondary"
                      style={{
                        color: "#d62828",
                        marginLeft: "50px",
                        marginTop: "50px",
                      }}
                    >
                      Edit Profile
                    </Button>
                    <Button
                      onClick={() => {
                        navigate("/myaccount/avatar");
                      }}
                      variant="secondary"
                      style={{
                        color: "#d62828",
                        marginLeft: "50px",
                        marginTop: "20px",
                      }}
                    >
                      Upload Avatar
                    </Button>
                  </Stack>
                </Grid>
                <Grid>
                  <h2
                    style={{
                      textAlign: "left",
                      color: "brown",
                      paddingLeft: "50px",
                      paddingTop: "10px",
                      fontSize: "40px",
                      marginBottom: "0px",
                    }}
                  >
                    {firstName + " " + lastName}
                  </h2>
                  <p
                    style={{
                      textAlign: "left",
                      color: "brown",
                      paddingLeft: "50px",
                    }}
                  >
                    <b>Username:</b> {username}
                  </p>
                  <p
                    style={{
                      textAlign: "left",
                      color: "brown",
                      paddingLeft: "50px",
                    }}
                  >
                    <b>Email:</b> {email}
                  </p>
                  <p
                    style={{
                      textAlign: "left",
                      color: "brown",
                      paddingLeft: "50px",
                    }}
                  >
                    <b>Phone:</b> {phoneNum}
                  </p>
                </Grid>
              </Grid>
            </Card>
            <Card
              style={{
                width: "500px",
                height: "300px",
                marginLeft: "10px",
                display: "flex",
              }}
            >
              <div
                style={{
                  marginTop: "100px",
                  marginLeft: "110px",
                }}
              >
                <Button
                  variant="primary"
                  style={{
                    color: "white",
                    backgroundColor: "#d62828",
                  }}
                >
                  <NavLink
                    to={`/myaccount/timetable`}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <h3>Check my class Schedule</h3>
                  </NavLink>
                </Button>
              </div>
            </Card>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ProfileInfoCard;
