
import Slider from '@mui/material/Slider';
import { useState } from 'react';
function convertSelectorValueToTimestamp(value){
  return value + ":" + "00"
}
const TimeSelector = ({ selectedTimes, setSelectedTimes }) => {
  const [internalTime, setInternalTime] = useState(selectedTimes)


  function cvtToTimestamp(twentyFourHourTime){
    if (twentyFourHourTime < 12){
      return twentyFourHourTime + " AM"
    }
    else if (twentyFourHourTime == 12){
      return twentyFourHourTime + " PM"
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
      value={internalTime}
      onChangeCommitted={(e, value) => {
        setSelectedTimes(value);
      }}
      onChange={(e, value) => {
        setInternalTime(value)
      }}
      valueLabelDisplay="on"
      valueLabelFormat={cvtToTimestamp}
    />
  );
};

export {TimeSelector, convertSelectorValueToTimestamp}
