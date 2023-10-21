import { Typography } from "@mui/material";
import classes from "./Header.module.scss";
import {NavLink} from "react-router-dom"

const Header = () => {
  return (
    <header className={classes["header-container"]}>
      <div className={classes["logo-container"]}>
        <div style={{height:'6rem'}}><img src="/images/nirmata-logo.svg"></img></div>
      </div>
      <nav className={classes["navigation-container"]}>
        <NavLink to={"/cricket"} className={({isActive}) => isActive ? classes['active-nav-item'] : undefined}><Typography fontWeight={"bolder"} >CRICKET</Typography></NavLink>
        <Typography fontWeight={"bolder"} className={classes['nav-item']}>FOOTBALL</Typography>
      </nav>
    </header>
  );
};

export default Header;
