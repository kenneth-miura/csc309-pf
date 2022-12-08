import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {InputAdornment, TextField} from "@mui/material";

const Searchbar = ({setSearchQuery, targetName}) => (
  //TODO: if we have time, make this autocomplete
    <TextField
      onInput={(e) => {
        console.log(e.target.value)
        setSearchQuery(e.target.value);
      }}
      label={"Filter by " + targetName}
      variant="outlined"
      placeholder="Search..."
      size="small"
      InputProps={{
        startAdornment: (
            <InputAdornment
                position="start"
                sx={{color: "white", margin: "5px"}}
            >
                <SearchIcon fontSize="large" />
            </InputAdornment>
        )
    }}/>
);

export default Searchbar
