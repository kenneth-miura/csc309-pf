
import Slider from '@mui/material/Slider';
const TimeSelector = ({ selectedTimes, setSelectedTimes }) => {

  function cvtToTimestamp(twentyFourHourTime){
    if (twentyFourHourTime < 12){
      return twentyFourHourTime + " AM"
    }
    else {
      const cvtedTime = twentyFourHourTime % 12 + " PM"
      return cvtedTime
    }
  }

  return (
    <Slider
      getAriaLabel={() => "Time Selector"}
      min={5}
      max={22}
      step={1}
      marks
      value={selectedTimes}
      onChange={(e, value) => {
        setSelectedTimes(value);
      }}
      valueLabelDisplay="on"
      valueLabelFormat={cvtToTimestamp}
    />
  );
};

export default TimeSelector
