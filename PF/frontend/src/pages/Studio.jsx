import React, { useState } from "react";
import {
  Card,
  Box,
  Button,
  FormControl,
  Input,
  TextField,
  InputLabel,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import StudioMap from "../components/StudioMap";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";
import { Stack } from "@mui/system";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function StudioPage() {
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");

  const isAuth = !!accessToken; // boolean value

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [currPage, setCurrPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [itemList, setItemList] = useState([]);

  const [studioName, setStudioName] = useState("");
  const [classOfferingName, setClassOfferingName] = useState("");
  const [coachName, setCoachName] = useState("");
  const [amenities, setAmenities] = useState("");

  const fetchData = (curPage, name, class_offering_name, coach_name, amenity_lst) => {

    let serverUrl = "http://127.0.0.1:8000/studios/list/filter/?page=" + curPage;

    if (!!name) {
      serverUrl = serverUrl + "&name=" + name
      console.log(serverUrl)
    }

    if (!!class_offering_name) {
      serverUrl = serverUrl + "&class_offering_name=" + class_offering_name;
    }
    if (!!coach_name) {
      serverUrl = serverUrl + "&coach_name=" + coach_name;
    }

    if (!!amenity_lst){
      serverUrl = serverUrl + "&amenities=" + amenity_lst;
    }

    fetch(serverUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 400) {
          // TODO: figure out how to do validation lol
          console.log("Didn't fill in form!");
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log("Received data")
        console.log(data)

      })
      .catch((error) => {
        // console.log(error);
      });
  }


  const handleSubmit1 = () => {
    console.log("??????????????")
    fetchData(currPage, studioName, classOfferingName, coachName, amenities);


  };

  return (
    <div>
      <Navbar position="sticky" isNotHomePage={true}></Navbar>(
      <div>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            top: "0px",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              paddingTop: "100px",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                style={{ color: "brown" }}
                label="Studio List"
                {...a11yProps(0)}
              />
              <Tab
                style={{ color: "brown" }}
                label="Studio Maps"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
              <Stack>
                <FormControl style={{ width: "300px" }}>
                  <Input
                    name="name"
                    placeholder="Studio Name"
                    style={{ padding: "5px" }}
                    onChange={(e) => {
                      setStudioName(e.target.value);
                    }}
                  ></Input>
                </FormControl>
                <FormControl style={{ width: "300px" }}>
                  <Input
                    name="classOffering"
                    placeholder="Class Offering Name"
                    style={{ paddingTop: "10px" }}
                    onChange={(e) => {
                      setClassOfferingName(e.target.value);
                    }}
                  ></Input>
                </FormControl>
                <FormControl style={{ width: "300px" }}>
                  <Input
                    name="coach"
                    placeholder="Coach Name"
                    style={{ paddingTop: "10px" }}
                    onChange={(e) => {
                      setCoachName(e.target.value);
                    }}
                  ></Input>
                </FormControl>
                <FormControl style={{ width: "300px", paddingTop: "20px" }}>
                  <InputLabel
                    variant="filled"
                    style={{ paddingTop: "30px" }}
                    shrink
                    size="small"
                    disableAnimation
                    htmlFor="amenities"
                  >
                    Add commas between each element
                  </InputLabel>
                  <Input
                    name="amenities"
                    placeholder="Amenities (e.g. Pool, Shower)"
                    style={{ paddingTop: "10px" }}
                    onChange={(e) => {
                      const am_lst = e.target.value;
                      setAmenities(e.target.value);
                    }}
                  ></Input>
                </FormControl>
                <div
                  style={{
                    paddingTop: "20px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#d62828" }}
                    onClick={handleSubmit1}
                  >
                    Filter
                  </Button>
                </div>
              </Stack>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <StudioMap></StudioMap>
          </TabPanel>
        </Box>
      </div>
      )
    </div>
  );
}

export default StudioPage;
