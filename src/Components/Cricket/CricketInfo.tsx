import { useEffect, useState } from "react";
import { Table } from "../Common/Table/Table";
import { TPlayer, TPlayerType } from "../../Types/types";
import SearchField from "../Common/SearchField";
import Box from "@mui/material/Box";
import getPlayers from "../../Store/get-players";
import TablePagination from "@mui/material/TablePagination";
import { formatMillisecondsToDateString } from "../../Helpers/dateHelper";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { Button, InputLabel, Select } from "@mui/material";

const HEADERS = ["Name", "Rank", "Type", "Points", "DOB"];

const COLUMNAPIKEYS = ["name", "rank", "type", "points", "dob"];

const CricketInfo = () => {
  const [playersData, setPlayersData] = useState<TPlayer[]>([]);

  const [searchString, setSearchString] = useState<string>("");

  const [offSet, setOffSet] = useState<number>(0);

  const [pageSize, setPageSize] = useState<number>(10);

  const [searchType,setSearchType] = useState<TPlayerType | "">("");

  useEffect(() => {
    if (searchString) {
      setPlayersData(filterByNameAndReturn(playersData, searchString));
    } else {
      getPlayers().then((data) => {
        transformFields(data);
        setPlayersData(data);
      });
    }
  }, [searchString]);

  useEffect(() => {
    getPlayers().then((data) => {
      transformFields(data);
      setPlayersData(returnDataByOffSet(offSet, pageSize, data));
    });
  }, [offSet, pageSize]);

  useEffect(() => {
    getPlayers({type : searchType as TPlayerType}).then((data) => {
        transformFields(data);
        setPlayersData(returnDataByOffSet(offSet, pageSize, data));  
    })
  },[searchType])

  return (
    <>
      <Box display={"flex"} flexDirection={"row-reverse"} justifyContent={"space-between"} alignItems={"center"}>
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
              onChange={(event : any) => {setSearchType(event.target.value)}}
            >
              <MenuItem value={"batsman"}>Batsmen</MenuItem>
              <MenuItem value={"bowler"}>Bowler</MenuItem>
              <MenuItem value={"allRounder"}>AllRounder</MenuItem>
              <MenuItem value={"wicketKeeper"}>WicketKeeper</MenuItem>
            </Select>
          </FormControl>
          {searchType && <Button variant="contained" onClick={() => {setSearchType("")}}>Clear</Button>}
        </Box>
      </Box>
      <Table
        headers={HEADERS}
        columnsToShow={COLUMNAPIKEYS}
        onRowClick={(data: any) => console.log(data)}
        data={playersData}
      ></Table>
      <TablePagination
        component="div"
        sx={{ marginTop: "0.8rem" }}
        count={playersData.length ?? ""}
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

const transformFields = (data: TPlayer[] | any[]) => {
  for (let player of data) {
    if (player.dob) {
      player.dob = formatMillisecondsToDateString(player.dob);
    }
  }
};

export default CricketInfo;
