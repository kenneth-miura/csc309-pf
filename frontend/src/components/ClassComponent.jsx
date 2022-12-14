import {
  Box,
  Stack,
  Card,
  Button,
  Paper,
  Chip,
  Typography,
} from "@mui/material";
import { borderRadius } from "@mui/system";
import Cookies from "universal-cookie";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";
const EnrollSingleClassButton = ({
  class_id,
  accessToken,
  updateFilteredResults,
  enrollable,
}) => {
  function enrollSingleClass() {
    var bearer = "Bearer " + accessToken;
    fetch(
      "http://127.0.0.1:8000/classes/enroll/single_class/" + class_id + "/",
      {
        method: "POST",
        headers: {
          Authorization: bearer,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(response => {
        if (response.status === 200) {
          //TODO: just replace this with blurring out the enroll btn
          alert("Succesfully enrolled");
          updateFilteredResults();
        } else if (response.status === 401) {
          alert("Invalid login or subscription");
        } else {
          throw new Error(response.status);
        }
      })
      .catch(error => console.error(error));
  }

  return (
    <Button
      onClick={enrollSingleClass}
      variant="contained"
      size="small"
      sx={{ height: "50px", width: "150px", backgroundColor: "#d62929" }}
      disabled={!enrollable}
    >
      Enroll
    </Button>
  );
};

const EnrollFutureClassesButton = ({
  course_id,
  accessToken,
  updateFilteredResults,
  enrollable,
}) => {
  const [clicked, setClicked] = useState(false)
  function enrollFutureClasses() {
    var bearer = "Bearer " + accessToken;

    fetch(
      "http://127.0.0.1:8000/classes/enroll/future_classes/" + course_id + "/",
      {
        method: "POST",
        headers: {
          Authorization: bearer,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(response => {
        if (response.status === 200) {
          //TODO: just replace this with blurring out the enroll btn
          alert("Succesfully enrolled");
          updateFilteredResults();
        } else if (response.status === 401) {
          alert("Invalid login or subscription");
        } else {
          throw new Error(response.status);
        }
      })
      .catch(error => console.error(error));
  }

  return (
    <Button
      onClick={() => {
        setClicked(true)
        enrollFutureClasses()
      }
      }
      variant="contained"
      size="small"
      sx={{ maxHeight: "50px", width: "150px", backgroundColor: "#990d00"  }}
      disabled={!enrollable || clicked}
    >
      Enroll All
    </Button>
  );
};
export default function ClassComponent({
  classInfo,
  updateFilteredResults,
  hasSubscription,
}) {
  const remainingSpace =
    parseInt(classInfo.class_offering.capacity) -
    parseInt(classInfo.capacity_count);
  const currentUserEnrolled = classInfo.current_user_enrolled;
  const enrollable =
    !currentUserEnrolled && remainingSpace > 0 && hasSubscription;
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");

  return (
    <Card
      sx={{
        borderBottom: "1px solid",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Stack spacing={2} sx={{ marginY: "10px" }}>
          <Chip icon={<CalendarTodayIcon />} label={classInfo.date} />
          <Chip
            icon={<AccessTimeIcon />}
            label={
              classInfo.time_interval.start_time +
              " - " +
              classInfo.time_interval.end_time
            }
          />
        </Stack>

        <Chip
          icon={<LocationOnIcon />}
          label={classInfo.class_offering.studio.name}
        />

        <div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4">
              <b>{classInfo.class_offering.name.toUpperCase()} </b>
            </Typography>
            <Typography variant="body1">
              <i> {classInfo.class_offering.coach} </i>
            </Typography>
          </Box>
        </div>
        {!hasSubscription && <h3> No Subscription</h3>}

        <Stack direction="row" spacing={2}>
          <EnrollSingleClassButton
            class_id={classInfo.id}
            accessToken={accessToken}
            updateFilteredResults={updateFilteredResults}
            enrollable={enrollable}
          />
          <EnrollFutureClassesButton
            course_id={classInfo.class_offering.id}
            accessToken={accessToken}
            updateFilteredResults={updateFilteredResults}
            enrollable={hasSubscription}
          />
        </Stack>
      </Box>
    </Card>
  );
}
