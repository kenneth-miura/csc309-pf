import { useState } from "react";
import { Box} from "@mui/material";
import Searchbar from "../components/Searchbar";
import TimeSelector from "../components/TimeSelector";
import DateSelector from "../components/DateSelector";
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import DayTabs from "../components/DayTabs";



function ClassScheduler() {
  //TODO: set it up so it can get studio name passed in from nav
  const [className, setClassName] = useState("");
  const [coachName, setCoachName] = useState("");
  const [studio, setStudio] = useState("");
  const [times, setTimes] = useState([20, 37]);
  const [date, setDate] = useState(dayjs());
  const [filteredResults, setFilteredResults] = useState([]);

  function getFilteredResults(){

  }



  return (
    <Box sx={{ display: "flex", flexDirection: "row", minHeight: "500px" }}>
      <Box
        sx={{
          display: "flex",
          minWidth: "25%",
        }}
      >
        <Stack spacing={2} sx={{margin: "15px"}}>
          <Searchbar setSearchQuery={setClassName} targetName="Class" />
          <Searchbar setSearchQuery={setCoachName} targetName="Coach" />
          <Searchbar setSearchQuery={setStudio} targetName="Studio" />
          <TimeSelector
            selectedTimes={times}
            setSelectedTimes={setTimes}
          />
          <DateSelector
            date={date}
            setDate={setDate}
          />

        </Stack>
      </Box>
      <Box sx={{flexGrow: 4 }}>

      </Box>
    </Box>
  );
}

export default ClassScheduler;
