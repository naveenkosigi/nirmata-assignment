import Header from "./Header/Header";
import { Outlet } from "react-router-dom";
import Paper from "@mui/material/Paper";
import classes from "./Layout.module.scss"

const Layout = () => {
  return (
    <>
      <Header />
      <main className={classes["main-container"]}>
        <Paper
          elevation={3}
          square
          sx={{
            padding: "3rem",
            position: "relative",
            borderRadius: "2rem",
            top: "-1rem",
          }}
        >
          <Outlet />
        </Paper>
      </main>
    </>
  );
};

export default Layout;
