import React, { useEffect, useState } from "react";
import {
  Card,
  Box,
  Button,
  FormControl,
  Input,
  TextField,
  InputLabel,
  TableFooter,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import StudioMap from "../components/StudioMap";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import LaunchIcon from "@mui/icons-material/Launch";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
          <Typography component={"span"}>{children}</Typography>
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

  const pageSize = 10;

  const [currPage, setCurrPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [itemList, setItemList] = useState([]);

  const [studioName, setStudioName] = useState("");
  const [classOfferingName, setClassOfferingName] = useState("");
  const [coachName, setCoachName] = useState("");
  const [amenities, setAmenities] = useState("");
  const [currItem, setCurrItem] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (info) => {
    setOpen(true);
    setCurrItem(info);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchData(currPage, studioName, classOfferingName, coachName, amenities);
  }, [currPage, studioName, classOfferingName, coachName, amenities])

  const fetchData = (
    curPage,
    name,
    class_offering_name,
    coach_name,
    amenity_lst
  ) => {
    let serverUrl =
      "http://127.0.0.1:8000/studios/list/filter/?page=" + curPage;

    if (!!name) {
      serverUrl = serverUrl + "&name=" + name;
    }

    if (!!class_offering_name) {
      serverUrl = serverUrl + "&class_offering_name=" + class_offering_name;
    }
    if (!!coach_name) {
      serverUrl = serverUrl + "&coach_name=" + coach_name;
    }

    if (!!amenity_lst) {
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
        setItemList(data.items);
        setTotalCount(data.total_count);
        setCurrPage(curPage);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleSubmit1 = () => {
    fetchData(currPage, studioName, classOfferingName, coachName, amenities);
  };

  const handleGetDirections = (id) => {
    let serverUrl = `http://127.0.0.1:8000/studios/${id}/directions/`;

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
        window.open(data.map_link);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleChangePage = (event, value) => {
    fetchData(value, studioName, classOfferingName, coachName, amenities);
  };

  return (
    <div>
      <Navbar position="sticky" isNotHomePage={true}></Navbar>
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
              paddingTop: "150px",
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
                label="Studios Map"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Grid container spacing={2} style={{width: "100vw", paddingLeft: "200px"}}>
            <Grid item xs={12} md={3} style={{display: "flex"}}>
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
            </Grid>
            <Grid  item xs={12} md={9} style={{paddingRight: "200px"}}>
            <TableContainer component={Paper} >
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Studio Name</StyledTableCell>
                    <StyledTableCell align="right">Address</StyledTableCell>
                    <StyledTableCell align="right">
                      Phone Number
                    </StyledTableCell>
                    <StyledTableCell align="right">More Info</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {itemList.map((info) => (
                    <StyledTableRow key={info.name}>
                      <StyledTableCell component="th" scope="row">
                        {info.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {info.address}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {info.phone_num}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="label"
                          onClick={() => {
                            handleClickOpen(info);
                          }}
                        >
                          <LaunchIcon />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <StyledTableRow>
                    <StyledTableCell colSpan={5}>
                      <Pagination
                        count={Math.ceil(totalCount / (1.0 * pageSize))}
                        page={currPage}
                        showFirstButton
                        showLastButton
                        variant="outlined"
                        shape="rounded"
                        onChange={handleChangePage}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                </TableFooter>
              </Table>
            </TableContainer>
            </Grid>
            </Grid>
            <BootstrapDialog
              fullWidth={true}
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleClose}
              >
                {!!currItem && <Typography>{currItem.name}</Typography>}
              </BootstrapDialogTitle>
              <DialogContent dividers>
                <Typography component={"span"} gutterBottom>
                  <b>Address:{" "}</b>
                  {!!currItem && <Typography>{currItem.address}</Typography>}
                  <br></br>
                </Typography>
                <Typography component={"span"} gutterBottom>
                  <b>Phone Number:{" "}</b>
                  {!!currItem && <Typography>{currItem.phone_num}</Typography>}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    handleGetDirections(currItem.id);
                  }}
                >
                  Get Directions
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <StudioMap></StudioMap>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}

export default StudioPage;
