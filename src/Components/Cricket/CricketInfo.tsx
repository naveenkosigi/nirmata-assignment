import { useEffect, useState } from "react";
import { Table } from "../Common/Table/Table";
import { TPlayer } from "../../Types/types";
import SearchField from "../Common/SearchField";
import Box from "@mui/material/Box";
import getPlayers from "../../Store/get-players";
import TablePagination from "@mui/material/TablePagination";
import { formatMillisecondsToDateString } from "../../Helpers/dateHelper";


const HEADERS = ["Name", "Rank", "Type", "Points", "DOB"];

const COLUMNAPIKEYS = ["name", "rank", "type", "points", "dob"];

const CricketInfo = () => {
  const [playersData, setPlayersData] = useState<TPlayer[]>([]);

  const [searchString, setSearchString] = useState<string>("");

  const [offSet, setOffSet] = useState<number>(0);

  const [pageSize, setPageSize] = useState<number>(10);

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

  return (
    <>
      <Box display={"flex"} flexDirection={"row-reverse"}>
        <SearchField
          setCallback={setSearchString}
          placeholder="Search by Name"
          value={searchString}
        />
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
