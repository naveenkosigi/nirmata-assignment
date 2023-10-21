import { useState } from "react";
import players from "../../Store/players"
import { Table } from "../Table/Table";
import { TPlayer } from "../../Types/types";

const HEADERS = ["Name","Type","Points","DOB"];

const COLUMNAPIKEYS = [
    "name",
    "type",
    "points",
    "dob",
];


const CricketInfo = () => {

    const [playersData,setPlayersData] = useState<TPlayer[][]>(() => {
        const toReturn : TPlayer[][] = [];
        
        players.forEach((player : any) => {
            toReturn.push({...player});
        })

        return toReturn;
    });


    return(
        <Table headers={HEADERS} columnsToShow={COLUMNAPIKEYS} onRowClick={(data : any) => console.log(data)} data={playersData}></Table>
    )    
}

export default CricketInfo;