import { useEffect, useState } from "react";
import { Box, Card } from "@mui/material";
import Searchbar from "../components/Searchbar";
import TimeSelector from "../components/TimeSelector";
import DateSelector from "../components/DateSelector";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import InfiniteScroll from "react-infinite-scroll-component";
import ClassComponent from "../components/ClassComponent";
import Navbar from "../components/Navbar";
//TODO: Add time filtering, get pagination working

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
  const [times, setTimes] = useState([20, 37]);
  const [date, setDate] = useState(dayjs());
  const [filteredResults, setFilteredResults] = useState([]);
  const [page, setPage] = useState(1);
  const [length, setLength] = useState(0);
  const [hasNext, setHasNext] = useState(false);

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
            page: 1,
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
            page: 1,
          })
        );
    }

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        setPage(2);
        console.log("OVERWRITING")
        console.log(data)
        setFilteredResults(data.items);
        setLength(data.total_count);
        setHasNext(data.has_next);
      })
      .catch(error => console.log(error));
    }

  function updateFilteredResults() {
    console.log("UPDATING AT TOP")
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
          })
        );
    }

    console.log("Fetching from " + url + " for infinite scroll")

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(data => {
        setPage(page + 1);
          console.log(data)
          const newFilteredResults = filteredResults
          newFilteredResults.push(...data.items)
          console.log({newFilteredResults})
          setFilteredResults(newFilteredResults);
          setHasNext(data.has_next);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(overwriteFilteredResults, [className, coachName, studio, date]);

  console.log({hasNext})


  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar position="sticky" isLoginPage={false}></Navbar>
      <Box sx={{ display: "flex", flexDirection: "row", marginTop: "20vh", backgroundColor: "gray" }}>
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
            border: "1px solid"
          }}>
          <Stack spacing={2} sx={{ margin: "15px",  }}>
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
          <InfiniteScroll
            style={{ height: "500px" }}
            dataLength={length} //This is important field to render the next data
            next={updateFilteredResults}
            hasMore={hasNext}
            scrollThreshold={0.8}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {filteredResults.map((val, i) => (
              <ClassComponent classInfo={val} key={i} index={i}/>
            ))}
          </InfiniteScroll>
        </Box>
      </Box>
    </Box>
  );
}

export default ClassScheduler;
