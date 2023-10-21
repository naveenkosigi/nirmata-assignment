import Header from "./UI/Layout/Header/Header";
import Paper from "@mui/material/Paper";
import classes from './App.module.scss'

function App() {
  return (
    <>
      <Header />
      <main className={classes['main-container']}>
        <Paper elevation={3} square sx={{padding:'3rem',position:'relative',borderRadius:'2rem',top:'-1rem'}}>
          Test Content
        </Paper>
      </main>
    </>
  );
}

export default App;
