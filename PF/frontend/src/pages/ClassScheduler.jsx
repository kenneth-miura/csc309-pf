import { useEffect, useState } from "react";
import { Box, Card, Paper } from "@mui/material";
import Searchbar from "../components/Searchbar";
import {
  TimeSelector,
  convertSelectorValueToTimestamp,
} from "../components/TimeSelector";
import DateSelector from "../components/DateSelector";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import ClassComponent from "../components/ClassComponent";
import Navbar from "../components/Navbar";
import PaginatedClassList from "../components/PaginatedClassList";
import Cookies from "universal-cookie";

function buildParams(fields) {
  const asArray = Object.entries(fields);

  const filtered = asArray.filter(
    ([key, value]) => typeof value !== "string" || value.length > 0
  );
  const ret = Object.fromEntries(filtered);
  return ret;
}

function ClassScheduler() {
  //TODO: set it up so it can get studio name passed in from nav
  //TODO: Switch to using left right buttons
  const [className, setClassName] = useState("");
  const [coachName, setCoachName] = useState("");
  const [studio, setStudio] = useState("");
  const [times, setTimes] = useState([6, 12]);
  const [date, setDate] = useState(dayjs());
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const [hasSubscription, setHasSubscription] = useState(false);
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");
  const bearer = "Bearer " + accessToken;

  useEffect(
    () => {
      fetch("http://127.0.0.1:8000/subscriptions/has_subscription/",
      {
        method: "GET",
        headers: {
          "Authorization": bearer
        }
      }).then(res => {
        if (res.status!== 200){
          throw new Error(res.status)
        }
        return res.json()
      })
      .then(data => setHasSubscription(data.has_active_subscription))
      .catch(error => console.error(error))
    }, [bearer]
  )

  function overwriteFilteredResults() {
    //TODO: add time range
    var url;
    if (date) {
      url =
        "http://127.0.0.1:8000/studios/class_instance/filter/?" +
        new URLSearchParams(
          buildParams({
            class_name: className,
            coach_name: coachName,
            studio: studio,
            date: date.format("YYYY-M-D"),
            page: page,
            start_time: convertSelectorValueToTimestamp(times[0]),
            end_time: convertSelectorValueToTimestamp(times[1]),
            show_only_in_subscription: hasSubscription
          })
        );
    } else {
      url =
        "http://127.0.0.1:8000/studios/class_instance/filter/?" +
        new URLSearchParams(
          buildParams({
            class_name: className,
            coach_name: coachName,
            studio: studio,
            page: page,
            start_time: convertSelectorValueToTimestamp(times[0]),
            end_time: convertSelectorValueToTimestamp(times[1]),
            show_only_in_subscription: hasSubscription
          })
        );
    }
    console.log({ url });

    var bearer = "Bearer " + accessToken;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: bearer,
        "Content-Type": "application/json",
      },
    })
      .then(res => {
        if (res.status !== 200) {
          setFilteredResults([]);
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(data => {
        //TODO: add a field in backend that requests only classes that have
        // dates before the end of the current subscription
        setFilteredResults(data.items);
        setNumPages(data.num_pages);
      })
      .catch(error => console.log(error));
  }

  useEffect(overwriteFilteredResults, [
    className,
    coachName,
    studio,
    date,
    page,
    times,
    hasSubscription,
    accessToken
  ]);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar position="sticky" isLoginPage={false}></Navbar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: "20vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            minWidth: "25%",
          }}
        >
          <Card
            variant="outlined"
            style={{
              backgroundColor: "white",
              width: "98%",
              height: "500px",
              padding: "20px",
              border: "1px solid",
            }}
          >
            <Stack spacing={2} sx={{ margin: "15px" }}>
              <h1>Class Schedule Filter</h1>
              <Searchbar setSearchQuery={setClassName} targetName="Class" />
              <Searchbar setSearchQuery={setCoachName} targetName="Coach" />
              <Searchbar setSearchQuery={setStudio} targetName="Studio" />
              <TimeSelector selectedTimes={times} setSelectedTimes={setTimes} />
              <DateSelector date={date} setDate={setDate} />
            </Stack>
          </Card>
        </Box>
        <Box sx={{ flexGrow: 4 }}>
          <Paper>
            <PaginatedClassList
              numPages={numPages}
              page={page}
              setPage={setPage}
            >
              {filteredResults.map((value, i) => {
                return (
                  <ClassComponent
                    classInfo={value}
                    key={i}
                    updateFilteredResults={overwriteFilteredResults}
                    hasSubscription={hasSubscription}
                  />
                );
              })}
            </PaginatedClassList>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}

export default ClassScheduler;
