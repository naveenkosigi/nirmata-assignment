import { Typography } from "@mui/material";
import classes from "./Header.module.scss";

const Header = () => {
  return (
    <header className={classes["header-container"]}>
      <div className={classes["logo-container"]}>
        <div style={{height:'6rem'}}><img src="/images/nirmata-logo.svg"></img></div>
      </div>
      <nav className={classes["navigation-container"]}>
        <Typography fontWeight={"bolder"} className={classes['nav-item']}>CRICKET</Typography>
        <Typography fontWeight={"bolder"} className={classes['nav-item']}>FOOTBALL</Typography>
      </nav>
    </header>
  );
};

export default Header;
