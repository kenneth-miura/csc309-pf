import { Box, Stack, Card, Button } from "@mui/material";
import Cookies from "universal-cookie";
const EnrollSingleClassButton = ({ class_id, accessToken, updateFilteredResults }) => {
  function enrollSingleClass() {
    var bearer = 'Bearer ' + accessToken;
    fetch(
      "http://127.0.0.1:8000/classes/enroll/single_class/" + class_id + "/",
      {
        method: "POST",
        headers: {
          "Authorization": bearer,
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
        }
        else if(response.status === 401){
          alert("Invalid login or subscription");
        }
        else {
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
      sx={{height: "75px", width: "200px"}}
    >
      Enroll in this class
    </Button>
  );
};

const EnrollFutureClassesButton = ({course_id, accessToken, updateFilteredResults}) => {
  function enrollFutureClasses(){
    var bearer = "Bearer " + accessToken;

    fetch(
      "http://127.0.0.1:8000/classes/enroll/future_classes/" + course_id + "/",
      {
        method: "POST",
        headers: {
          "Authorization": bearer,
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    ).then(response => {
        if (response.status === 200) {
          //TODO: just replace this with blurring out the enroll btn
          alert("Succesfully enrolled");
          updateFilteredResults();
        }
        else if(response.status === 401){
          alert("Invalid login or subscription");
        }
        else {
          throw new Error(response.status);
        }

    })
    .catch(error => console.error(error));
  }

  return (
    <Button
      onClick={enrollFutureClasses}
      variant="contained"
      size="small"
      sx={{height: "75px", width: "200px"}}
    >
      Enroll in the entire class
    </Button>
  )

}
export default function ClassComponent({ classInfo,  updateFilteredResults, hasSubscription }) {
  const remainingSpace =
    parseInt(classInfo.class_offering.capacity) -
    parseInt(classInfo.capacity_count);
  const currentUserEnrolled = classInfo.current_user_enrolled
  const enrollable = !currentUserEnrolled && remainingSpace > 0 && hasSubscription
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");
  const isAuth = !!accessToken; // boolean value

  const enrollButtons = (
    <Stack spacing={2}>
        <EnrollSingleClassButton
          class_id={classInfo.id}
          accessToken={accessToken}
          updateFilteredResults={updateFilteredResults}
        />
        <EnrollFutureClassesButton
          course_id={classInfo.class_offering.id}
          accessToken={accessToken}
          updateFilteredResults={updateFilteredResults}
        />


    </Stack>
  )
  const alreadyEnrolledText = (
    <h2>
      Already enrolled or Class Capacity full
    </h2>
  )

  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          border: "1px solid",
          alignContent: "center",
        }}
      >
        <b>Date: {classInfo.date}</b>
        <b>
          {classInfo.time_interval.start_time} -{" "}
          {classInfo.time_interval.end_time}
        </b>

        <Stack>
          <h1>{classInfo.class_offering.name}</h1>
          <h2>{classInfo.class_offering.coach}</h2>
        </Stack>

        <b>Studio: {classInfo.class_offering.studio.name}</b>

        <b>Remaining Capacity: {remainingSpace}</b>
        <b>{"Current user enrolled: " + currentUserEnrolled}</b>

        {!hasSubscription && <h3> No Subscription</h3>}
        {enrollable && enrollButtons}
      </Box>
    </Card>
  );
}
