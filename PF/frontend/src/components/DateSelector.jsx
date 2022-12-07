import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TextField } from '@mui/material';

export default function DateSelector({date, setDate}){
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        clearable
        label="Select Date"
        inputFormat="MM/DD/YYYY"
        value={date}
        onChange={setDate}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>

  )

}
