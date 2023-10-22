import { useEffect, useState } from "react";
import players from "../../Store/players";
import { Table } from "../Common/Table/Table";
import { TPlayer } from "../../Types/types";
import SearchField from "../Common/SearchField";
import Box from "@mui/material/Box";
import CloneDeep from "lodash/cloneDeep"
import getPlayers from "../../Store/get-players";

const HEADERS = ["Name", "Type", "Points", "DOB"];

const COLUMNAPIKEYS = ["name", "type", "points", "dob"];

const CricketInfo = () => {
  const [playersData, setPlayersData] = useState<TPlayer[]>([]);

  const [searchString,setSearchString] = useState<string>("");
  
  useEffect(() => {
    if(searchString){
        setPlayersData(filterByNameAndReturn(playersData,searchString));
    }
    else{
        getPlayers().then((data) => {
            setPlayersData(data)
        })    
    }
  },[searchString])

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
    </>
  );
};

const filterByNameAndReturn = (playersData : TPlayer[],searchString : string) => {
    return playersData.filter((player) => {
        if((player["name"] as string).toLowerCase().indexOf(searchString.toLowerCase()) > -1){
            return true;
        }
    })
}

export default CricketInfo;
