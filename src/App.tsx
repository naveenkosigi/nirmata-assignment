import Header from "./UI/Layout/Header/Header";
import Paper from "@mui/material/Paper";
import classes from './App.module.scss'
import CricketInfo from "./Components/Cricket/CricketInfo";
import { createBrowserRouter , RouterProvider } from "react-router-dom";


const routes = createBrowserRouter([
  {path : '/', element : <CricketInfo />},
  {path : '/cricket',element : <CricketInfo />}
])

function App() {
  return (
    <>
      <Header />
      <main className={classes['main-container']}>
        <Paper elevation={3} square sx={{padding:'3rem',position:'relative',borderRadius:'2rem',top:'-1rem'}}>
          <RouterProvider router={routes} />
        </Paper>
      </main>
    </>
  );
}

export default App;
