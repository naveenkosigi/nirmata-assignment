import { useEffect, useState } from "react";
import { Table } from "../Common/Table/Table";
import { TPlayer, TPlayerType } from "../../Types/types";
import SearchField from "../Common/SearchField";
import Box from "@mui/material/Box";
import { getPlayers } from "./CricketHelpers";
import TablePagination from "@mui/material/TablePagination";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { Button, InputLabel, Select, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import classes from "./CricketInfo.module.scss"

const HEADERS = ["Name", "Rank", "Type", "Points", "DOB"];

const COLUMNAPIKEYS = ["name", "rank", "type", "points", "dob"];

const CricketInfo = () => {
  const [playersData, setPlayersData] = useState<TPlayer[]>([]);

  const [searchString, setSearchString] = useState<string>("");

  const [offSet, setOffSet] = useState<number>(0);

  const [pageSize, setPageSize] = useState<number>(10);

  const [searchType, setSearchType] = useState<TPlayerType | "">("");

  const [recordsCount, setRecordsCount] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchString) {
      setPlayersData(filterByNameAndReturn(playersData, searchString));
    } else {
      getPlayers().then((data) => {
        setPlayersData(data);
      });
    }
  }, [searchString]);

  useEffect(() => {
    if (!searchType) {
      getPlayers().then((data) => {
        setRecordsCount(data.length);
        setPlayersData(returnDataByOffSet(offSet, pageSize, data));
      });
    }
  }, [offSet, pageSize]);

  useEffect(() => {
    setOffSet(0);
    getPlayers({ type: searchType as TPlayerType }).then((data) => {
      setRecordsCount(data.length);
      setPlayersData(returnDataByOffSet(0, pageSize, data));
    });
  }, [searchType]);

  const onRowClick = (data: any) => {
    navigate(data["id"]);
  };

  return (
    <>
      <Typography fontWeight={"bold"} fontSize={"1.5rem"} marginTop={"2rem"}>
        Cricket Players List
      </Typography>
      <Box
        display={"flex"}
        flexDirection={"row-reverse"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginTop={"1rem"}
        padding={"1.2rem"}
        className={classes["filter-container"]}
      >
        <SearchField
          setCallback={setSearchString}
          placeholder="Search by Name"
          value={searchString}
        />
        <Box width={"10rem"}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Player Type</InputLabel>
            <Select
              labelId="Player Type"
              id="player-type"
              label="Player Type"
              value={searchType}
              defaultValue={searchType}
              onChange={(event: any) => {
                setSearchType(event.target.value);
              }}
            >
              <MenuItem value={"batsman"}>Batsmen</MenuItem>
              <MenuItem value={"bowler"}>Bowler</MenuItem>
              <MenuItem value={"allRounder"}>AllRounder</MenuItem>
              <MenuItem value={"wicketKeeper"}>WicketKeeper</MenuItem>
            </Select>
          </FormControl>
          {searchType && (
            <Button
              variant="contained"
              onClick={() => {
                setSearchType("");
              }}
              sx={{marginTop:"0.4rem"}}
            >
              Clear
            </Button>
          )}
        </Box>
      </Box>
      <Table
        headers={HEADERS}
        columnsToShow={COLUMNAPIKEYS}
        onRowClick={onRowClick}
        data={playersData}
      ></Table>
      <TablePagination
        component="div"
        sx={{ marginTop: "0.8rem" }}
        count={recordsCount ?? ""}
        page={offSet / pageSize} //offset
        onPageChange={(event, nextPageNumber) => {
          setOffSet(nextPageNumber * pageSize);
        }} //offSet setter
        rowsPerPage={pageSize} //page-size
        onRowsPerPageChange={(event: any) => {
          setPageSize(event.target.value); //page-size setter
          setOffSet(0);
        }}
      />
    </>
  );
};

const filterByNameAndReturn = (
  playersData: TPlayer[],
  searchString: string
) => {
  return playersData.filter((player) => {
    if (
      (player["name"] as string)
        .toLowerCase()
        .indexOf(searchString.toLowerCase()) > -1
    ) {
      return true;
    }
  });
};

const returnDataByOffSet = (
  offSet: number,
  pageSize: number,
  data: TPlayer[]
) => {
  const toReturn: TPlayer[] = [];

  for (
    let i = offSet, count = 0;
    count < pageSize && i < data.length;
    i++, count++
  ) {
    toReturn.push(data[i]);
  }

  return toReturn;
};

export default CricketInfo;
