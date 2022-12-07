import { Box, Stack, Card, Button } from "@mui/material";
import Cookies from "universal-cookie";

const EnrollSingleClassButton = ({ class_id, remainingSpace, isAuth, accessToken }) => {
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
      disabled={remainingSpace === 0 || !isAuth}
      onClick={enrollSingleClass}
      variant="contained"
      size="small"
    >
      Enroll in this class
    </Button>
  );
};
export default function ClassComponent({ classInfo }) {
  const remainingSpace =
    parseInt(classInfo.class_offering.capacity) -
    parseInt(classInfo.capacity_count);
  const cookie = new Cookies();
  const accessToken = cookie.get("accessToken");
  console.log({accessToken});

  const isAuth = !!accessToken; // boolean value
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
        <EnrollSingleClassButton
          class_id={classInfo.id}
          remainingSpace={remainingSpace}
          isAuth={isAuth}
          accessToken={accessToken}
        />
      </Box>
    </Card>
  );
}
