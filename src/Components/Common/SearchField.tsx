import {
  IconButton,
  InputAdornment,
  TextField,
  Theme,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { createDebounceFunction } from "../../Helpers/helper";

interface PropsType {
  setCallback: Function;
  placeholder?: string;
  value:string;
}

const NPSearchField = (props: PropsType) => {
  const { setCallback, placeholder , value } = props;
  const [searchItem, setSearchItem] = useState<string>(value);
  const [debouncedChangeHandler] =
    useState<Function>(() =>
      setCallback ? createDebounceFunction(setCallback, 400) : undefined
    );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event", event.target.value);
    setSearchItem(event.target.value);
    debouncedChangeHandler(event.target.value);
  };

  const handleClear = () => {
    setSearchItem("");
    debouncedChangeHandler("");
  };

  const theme: Theme = useTheme();

  return (
    <TextField
      type="text"
      label="Search"
      size="small"
      placeholder={placeholder || "Search"}
      value={searchItem}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {!searchItem ? (
              <SearchIcon style={{ color: theme.palette.primary.main }} />
            ) : (
              <IconButton onClick={handleClear}>
                <CloseIcon style={{ color: theme.palette.primary.main }} />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default NPSearchField;
