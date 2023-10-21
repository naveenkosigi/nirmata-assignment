import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table as MaterialTable,
} from "@mui/material";
import classes from "./Table.module.scss";
export interface TablePropsType {
  headers: string[];
  data: any[][];
  onRowClick: Function;
  columnsToShow: string[];
}

export function Table(props: TablePropsType) {
  const { headers, data } = props;

  return (
    <>
      <TableContainer style={{ width: "100%", maxHeight: "309px" }}>
        <MaterialTable aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              {headers?.map((header, index) => {
                return (
                  <TableCell align="center" key={index}>
                    {header}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row : any, rowIndex) => {
              return (
                <TableRow key={rowIndex} className={classes.row}>
                  {props.columnsToShow.map((apiKey, columnIndex) => {
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
