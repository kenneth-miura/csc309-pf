import React, { useState, useRef } from "react";
import {
  Tab,
  Card,
  Box,
  Button,
  FormControl,
  Input,
  TextField,
  InputLabel,
} from "@mui/material";
import Navbar from "./Navbar";
import { Stack } from "@mui/system";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function ProfileEditCard(props) {
  let formNotFilledIn = false;
  let accountNotExist = false;

  
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");

  const formData = new FormData();

  const navigate = useNavigate();
  
  function handleSubmit(data) {
    data.preventDefault();


    // formData.append("username", "elonmusk1");
    // formData.append("password", password1);

    fetch("http://127.0.0.1:8000/accounts/update/", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: formData, // JSON.stringify({avatar: avatar}),
    })
      .then((response) => {
        if (response.status === 400) {
          // TODO: figure out how to do validation lol
          console.log("Didn't fill in form!");
          formNotFilledIn = true;
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {


        navigate("/myaccount")
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
            width: "700px",
            height: "100%",
            marginTop: "20vh",
            marginBottom: "24vh",
          }}
        >
          <h3
            style={{ textAlign: "center", color: "#d62828", fontSize: "50px" }}
          >
            EDIT PROFILE
          </h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <form onSubmit={handleSubmit}>
              <Stack>
                <FormControl style={{ width: "300px" }}>
                  <Input
                    name="username"
                    placeholder="Username"
                    style={{ padding: "5px" }}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  ></Input>
                </FormControl>
                <FormControl style={{ width: "300px" }}>
                  <Input
                    name="password1"
                    placeholder="Password"
                    type="password"
                    style={{ paddingTop: "10px" }}
                    onChange={(e) => {
                      setPassword1(e.target.value);
                    }}
                  ></Input>
                </FormControl>
                <FormControl style={{ width: "300px" }}>
                  <Input
                    name="password2"
                    placeholder="Password (Again)"
                    type="password"
                    style={{ paddingTop: "10px" }}
                    onChange={(e) => {
                      setPassword2(e.target.value);
                    }}
                  ></Input>
                </FormControl>
                <FormControl style={{ width: "300px" }}>
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    style={{ paddingTop: "30px" }}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  ></Input>
                </FormControl>
                <FormControl style={{ width: "300px" }}>
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    style={{ paddingTop: "10px" }}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  ></Input>
                </FormControl>

                <FormControl style={{ width: "300px" }}>
                  <Input
                    name="email"
                    placeholder="Email"
                    style={{ paddingTop: "30px" }}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  ></Input>
                </FormControl>
                <FormControl style={{ width: "300px" }}>
                  <Input
                    name="phoneNum"
                    placeholder="Phone Number"
                    style={{ paddingTop: "10px" }}
                    onChange={(e) => {
                      setPhoneNum(e.target.value);
                    }}
                  ></Input>
                </FormControl>
                <InputLabel style={{paddingTop: "20px"}} htmlFor="avatar">Avatar</InputLabel>
                <Input type="file" id="avatar" name="avatar" style={{paddingTop: "10px"}} onChange={(e) => {formData.append("avatar", e.target.files[0]); console.log(formData);}}></Input>
                <div
                  style={{
                    paddingTop: "30px",
                    margin: "30px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#d62828" }}
                  >
                    Update Profile
                  </Button>
                </div>
              </Stack>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ProfileEditCard;
