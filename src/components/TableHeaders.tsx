import { TableHeader } from "../interfaces/interfaces";
import { Grid } from "@mui/material";

interface Props {
  headers: TableHeader[];
}

function TableHeaders(props: Props) {
  return (
    <Grid className="table-header" container item flexDirection={"row"}>
      {
        props.headers.map(header => (
          <Grid key={header.name} container item flexDirection={"column"} xs={header.cols}>
            <Grid container item flexDirection={"row"} alignItems="center" justifyContent="center">
              <span className="header-text">
                { header.text }
              </span>
            </Grid>
          </Grid>
        ))
      }
    </Grid>
  );
}

export default TableHeaders;
