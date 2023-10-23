import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table as MaterialTable,
} from "@mui/material";
import classes from "./Table.module.scss";

export interface TableConfig{
  [key : string] : {
    headerLabel : string,
    allowSort ?: boolean
  }
}
export interface TablePropsType {
  data: any[];
  onRowClick: Function;
  config : TableConfig
}

export function Table(props: TablePropsType) {
  const { data , config } = props;

  return (
    <>
      <TableContainer style={{ width: "100%", maxHeight: "59vh" }}>
        <MaterialTable aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              {Object.keys(config)?.map((apiKey, index) => {
                return (
                  <TableCell align="center" key={index}>
                    {config[apiKey].headerLabel}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row : any, rowIndex) => {
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
