import { Box, Stack, Card } from "@mui/material";
export default function ClassComponent({ classInfo,index }) {
  const remainingSpace =
    parseInt(classInfo.class_offering.capacity) -
    parseInt(classInfo.capacity_count);
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
        <b>{index}</b>
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
      </Box>
    </Card>
  );
}
