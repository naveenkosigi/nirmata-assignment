import { useEffect, useState } from "react";
import { Table, TableConfig } from "../Common/Table/Table";
import { TPlayer, TPlayerType } from "../../Types/types";
import SearchField from "../Common/SearchField";
import Box from "@mui/material/Box";
import { getCricketPlayerByName, getPlayers } from "./CricketHelper";
import TablePagination from "@mui/material/TablePagination";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import { Button, InputLabel, Select, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./CricketInfo.module.scss";

const CRICKETPLAYERFILTER ="cricketPlayerFilter";

interface userFilter{
  offSet : number,
  pageSize : number,
  searchType : TPlayerType | ""
}

const tableConfig: TableConfig = {
  name: {
    headerLabel: "Name",
    allowSort: true,
  },
  rank: {
    headerLabel: "Rank",
    allowSort: true,
  },
  type: {
    headerLabel: "Type",
    allowSort: false,
  },
  points: {
    headerLabel: "Points",
    allowSort: false,
  },
  dob: {
    headerLabel: "Age",
    allowSort: true,
  },
};

const CricketInfo = () => {

  const savedFilterState : userFilter = JSON.parse((localStorage.getItem(CRICKETPLAYERFILTER) as string) || "{}");

  const [playersData, setPlayersData] = useState<TPlayer[]>([]);

  const [searchString, setSearchString] = useState<string>("");

  const [offSet, setOffSet] = useState<number>(savedFilterState?.offSet || 0);

  const [pageSize, setPageSize] = useState<number>(savedFilterState?.pageSize || 10);

  const [searchType, setSearchType] = useState<TPlayerType | "">(savedFilterState?.searchType || "");

  const [recordsCount, setRecordsCount] = useState<number>(0);

  const navigate = useNavigate();

  const location   = useLocation();

  useEffect(() => {
    if(location.pathname.endsWith('/')){
      navigate("/cricket")
    }
  },[])

  useEffect(() => {
    if (searchString) {
      getCricketPlayerByName(searchString).then((data) => {
        setOffSet(0);
        setRecordsCount((data as TPlayer[]).length);
        setSearchType("");
        setPlayersData(data as TPlayer[]);
      });
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

  useEffect(() => {
    const filters : userFilter = {
      searchType,
      offSet,
      pageSize
    }
    localStorage.setItem("cricketPlayerFilter",JSON.stringify(filters))
  },[searchType,offSet,pageSize,searchString])

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
              sx={{ marginTop: "0.4rem" }}
            >
              Clear
            </Button>
          )}
        </Box>
      </Box>
      <Table
        onRowClick={onRowClick}
        data={playersData}
        config={tableConfig}
        setData={setPlayersData}
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
