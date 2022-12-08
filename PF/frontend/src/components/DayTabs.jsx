import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
//TODO: maybe bring this in later? I don't think we need this

function getNextWeek() {
  const daysInWeek = [];
  const today = dayjs();
  const dayString = "Today, " + today.format("MMM D");
  daysInWeek.push(dayString);
  for (let i = 1; i < 7; i++) {
    const day = today.add(i, "day");
    const dayString = day.format("ddd, MMM D");
    daysInWeek.push(dayString);
  }

  return daysInWeek;
}

function TabPanel(selected, children, index) {
  return (
    <div role="tabpanel" hidden={selected !== index}>
      {selected === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function DayTabs() {
  const [selected, setSelected] = React.useState(0);

  const week = getNextWeek();
  const handleChange = (event, newValue) => {
    setSelected(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={selected} onChange={handleChange} variant="fullWidth">
          {week.map((week, i) => {
            console.log(week);
            return <Tab label={week} key={i}></Tab>;
          })}
        </Tabs>
      </Box>
      {week.map((week, i) => {
        return <TabPanel selected={selected} index={i} key={i}></TabPanel>;
      })}
    </Box>
  );
}
