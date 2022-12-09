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
import { NavLink, useNavigate } from "react-router-dom";
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

function ClassTimetablePage() {
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");
  const navigate = useNavigate();

  const isAuth = !!accessToken; // boolean value

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const pageSize = 10;

  const [currSchedPage, setCurrSchedPage] = useState(1);
  const [currHistoryPage, setCurrHistoryPage] = useState(1);
  const [totalSchedCount, setTotalSchedCount] = useState(0);
  const [totalHistoryCount, setTotalHistoryCount] = useState(0);

  const [classSchedList, setClassSchedList] = useState([]);
  const [classHistoryList, setclassHistoryList] = useState([]);

  const [currSchedItem, setCurrSchedItem] = useState(null);
  const [currHistoryItem, setCurrHistoryItem] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (info) => {
    setOpen(true);
    setCurrSchedItem(info);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const cookie = new Cookies();
    const accessToken = cookie.get("accessToken");
    const isAuth = !!accessToken
    if(!isAuth){
      navigate("/login")
    }

  }, [navigate])

  useEffect(() => {
    fetchData(currSchedPage);
    fetchHistoryData(currHistoryPage);
  }, [currSchedPage, currHistoryPage]);

  const fetchData = (curPage) => {
    let bearer = "Bearer " + accessToken;
    let serverUrl = "http://127.0.0.1:8000/accounts/enrolled/?page=" + curPage;

    fetch(serverUrl, {
      method: "GET",
      headers: {
        Authorization: bearer,
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
        setClassSchedList(data.items);
        setTotalSchedCount(data.total_count);
        setCurrSchedPage(curPage);

        console.log(data.items);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const fetchHistoryData = (curHistoryPage) => {
    let bearer = "Bearer " + accessToken;
    let serverUrl = "http://127.0.0.1:8000/accounts/history/?page=" + curHistoryPage;

    fetch(serverUrl, {
      method: "GET",
      headers: {
        Authorization: bearer,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.status === 400) {
          // TODO: figure out how to do validation lol
          console.log("Failed to get data!");
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setclassHistoryList(data.items);
        setTotalHistoryCount(data.total_count);
        setCurrHistoryPage(currHistoryPage);

        console.log(data.items);
      })
      .catch((error) => {
        // console.log(error);
      });
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
    fetchData(value);
  };

  const handleChangeHistoryPage = (event, value) => {
    fetchHistoryData(value);
  };

  const handleUnenrollClass = (class_id) => {
    let bearer = "Bearer " + accessToken;
    let serverUrl = "http://127.0.0.1:8000/classes/unenroll/single_class/" + class_id + "/";

    fetch(serverUrl, {
        method: "DELETE",
        headers: {
          Authorization: bearer,
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.status === 400) {
            // TODO: figure out how to do validation lol
            console.log("Error unenrolling!");
            throw new Error(response.status);
          } else {
            window.location.reload(false); // force a window reload :"P
            return response.json();
          }
        })
        .then((data) => {
          console.log("Shouldn't get here due to DELETE request.");
          window.location.reload(false);
        })
        .catch((error) => {
          // console.log(error);
        });
  }


  const handleUnenrollEntireClass = (class_offering_id) => {
    let bearer = "Bearer " + accessToken;
    let serverUrl = "http://127.0.0.1:8000/classes/unenroll/future_classes/" + class_offering_id + "/";

    fetch(serverUrl, {
        method: "DELETE",
        headers: {
          Authorization: bearer,
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.status === 400) {
            // TODO: figure out how to do validation lol
            console.log("Error unenrolling!");
            throw new Error(response.status);
          } else {
            return response.json();
          }
        })
        .then((data) => {
          fetchData(1); // Refetch the list of classes the user is in.
        })
        .catch((error) => {
          // console.log(error);
        });
  }

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
                style={{ color: "brown", fontSize: "20px" }}
                label="My Class Schedule"
                {...a11yProps(0)}
              />
              <Tab
                style={{ color: "brown", fontSize: "20px"  }}
                label="Class History"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Grid
              container
              spacing={2}
              style={{ width: "100vw", paddingLeft: "200px" }}
            >
              <Grid item xs={12} style={{ paddingRight: "200px" }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Class Name</StyledTableCell>
                        <StyledTableCell align="right">Coach</StyledTableCell>
                        <StyledTableCell align="right">Date</StyledTableCell>
                        <StyledTableCell align="right">Times</StyledTableCell>
                        <StyledTableCell align="right">Studio</StyledTableCell>
                        <StyledTableCell align="right">
                          More Info
                        </StyledTableCell>
                        <StyledTableCell align="right">Unenroll</StyledTableCell>
                        <StyledTableCell align="right">Unenroll All</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {classSchedList.map((info, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component="th" scope="row">
                            {info.class_offering.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {info.class_offering.coach}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {info.date}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {info.time_interval.start_time} to{" "}
                            {info.time_interval.end_time}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {info.class_offering.studio.name}
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
                          <StyledTableCell align="right">
                            <Button
                              variant="primary"
                              style={{
                                color: "white",
                                backgroundColor: "#d62828"
                              }}
                              onClick={() => {
                                handleUnenrollClass(info.id);
                              }}
                            >
                            Unenroll
                            </Button>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Button
                              variant="primary"
                              style={{
                                color: "white",
                                backgroundColor: "#d62828"
                              }}
                              onClick={() => {
                                handleUnenrollEntireClass(info.class_offering.id);
                              }}
                            >
                              Unenroll All
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <StyledTableRow>
                        <StyledTableCell colSpan={8}>
                          <Pagination
                            count={Math.ceil(
                              totalSchedCount / (1.0 * pageSize)
                            )}
                            page={currSchedPage}
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
                {!!currSchedItem && (
                  <Typography>
                    <h2 style={{ color: "#d62828" }}>
                      {currSchedItem.class_offering.name}
                    </h2>
                  </Typography>
                )}
              </BootstrapDialogTitle>
              <DialogContent dividers>
                <Typography component={"span"} gutterBottom>
                  <b>Description: </b>
                  {!!currSchedItem && (
                    <Typography>{currSchedItem.class_offering.description}</Typography>
                  )}
                  <br></br>
                </Typography>
                <Typography component={"span"} gutterBottom>
                  <b>Studio: </b>
                  {!!currSchedItem && (
                    <Typography>{currSchedItem.class_offering.studio.name}</Typography>
                  )}
                  <br></br>
                </Typography>
                <Typography component={"span"} gutterBottom>
                  <b>Address: </b>
                  {!!currSchedItem && (
                    <Typography>{currSchedItem.class_offering.studio.address}</Typography>
                  )}
                  <br></br>
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    handleGetDirections(currSchedItem.class_offering.studio.id);
                  }}
                >
                  Get Directions
                </Button>
              </DialogActions>
            </BootstrapDialog>
          </TabPanel>
          {/* ******************************* THIS IS THE START OF THE CLASS HISTORY PAGE ******************************* */}
          <TabPanel value={value} index={1}>
          <Grid
              container
              spacing={2}
              style={{ width: "100vw", paddingLeft: "200px" }}
            >
              <Grid item xs={12} style={{ paddingRight: "200px" }}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Class Name</StyledTableCell>
                        <StyledTableCell align="right">Coach</StyledTableCell>
                        <StyledTableCell align="right">Date</StyledTableCell>
                        <StyledTableCell align="right">Times</StyledTableCell>
                        <StyledTableCell align="right">Studio</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {classHistoryList.map((info, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component="th" scope="row">
                            {info.class_offering.name}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {info.class_offering.coach}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {info.date}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {info.time_interval.start_time} to{" "}
                            {info.time_interval.end_time}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {info.class_offering.studio.name}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <StyledTableRow>
                        <StyledTableCell colSpan={8}>
                          <Pagination
                            count={Math.ceil(
                              totalHistoryCount / (1.0 * pageSize)
                            )}
                            page={currHistoryPage}
                            showFirstButton
                            showLastButton
                            variant="outlined"
                            shape="rounded"
                            onChange={handleChangeHistoryPage}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}

export default ClassTimetablePage;
