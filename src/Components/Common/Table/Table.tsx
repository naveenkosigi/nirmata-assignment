import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table as MaterialTable,
  TableSortLabel,
} from "@mui/material";
import classes from "./Table.module.scss";
import { useEffect, useState } from "react";

export interface TableConfig {
  [key: string]: {
    headerLabel: string;
    allowSort?: boolean;
  };
}
export interface TablePropsType {
  data: any[];
  onRowClick: Function;
  config: TableConfig;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
}

type SORTORDERTYPE = "asc" | "desc";

export function Table(props: TablePropsType) {
  const { data, config, setData } = props;

  const [columnToSort, setColumnToSort] = useState<any>();

  const [sortOrder, setSortOrder] = useState<SORTORDERTYPE | undefined>();

  const sortHandler = (apiKey: string) => {
    setColumnToSort(apiKey);
    if(!sortOrder){
      setSortOrder("asc")
    }
    else if(sortOrder === "asc"){
      setSortOrder("desc")
    }
    else{
      setSortOrder(undefined);
      setColumnToSort(undefined);
    }
  };

  useEffect(() => {
    if (!sortOrder) return;

    setData(
      data.sort((a: any, b: any) => {
        if (a[columnToSort] < b[columnToSort]) {
          if (sortOrder === "asc") {
            return -1;
          }
          return 1;
        } else if (a[columnToSort] > b[columnToSort]) {
          if (sortOrder === "asc") {
            return 1;
          }
          return -1;
        }
        return 0;
      }).slice()
    );
  }, [sortOrder, columnToSort]);

  return (
    <>
      <TableContainer style={{ width: "100%", maxHeight: "59vh" }}>
        <MaterialTable aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              {Object.keys(config)?.map((apiKey, index) => {
                return config[apiKey].allowSort !== true ? (
                  <TableCell align="center" key={index}>
                    {config[apiKey].headerLabel}
                  </TableCell>
                ) : (
                  <TableCell align="center" key={index}>
                    <TableSortLabel
                      onClick={sortHandler.bind(undefined, apiKey)}
                      direction={sortOrder as SORTORDERTYPE}
                      active={columnToSort === apiKey}
                    >
                      {config[apiKey].headerLabel}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: any, rowIndex) => {
              return (
                <TableRow key={rowIndex} className={classes.row}>
                  {Object.keys(config).map((apiKey, columnIndex) => {
                    return (
                      <TableCell
                        align="center"
                        key={columnIndex}
                        onClick={props.onRowClick.bind(undefined, row)}
                      >
                        {row[apiKey] || "NA"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MaterialTable>
      </TableContainer>
    </>
  );
}
