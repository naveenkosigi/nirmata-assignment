import Header from "./UI/Layout/Header/Header";
import Paper from "@mui/material/Paper";
import classes from './App.module.scss'
import CricketInfo from "./Components/Cricket/CricketInfo";
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import Layout from "./UI/Layout/Layout";


// const routes = createBrowserRouter([
//   {path : '/', element : <CricketInfo />},
//   {path : '/cricket',element : <CricketInfo />}
// ])

// function App() {
//   return (
//     <>
//       <Header />
//       <main className={classes['main-container']}>
//         <Paper elevation={3} square sx={{padding:'3rem',position:'relative',borderRadius:'2rem',top:'-1rem'}}>
//           <RouterProvider router={routes} />
//         </Paper>
//       </main>
//     </>
//   );
// }

const routes = createBrowserRouter([
  {
    path : '/',
    element : <Layout />,
    children : [
      {
        path:'',
        element:<CricketInfo />
      },
      {
        path:'cricket',
        element:<CricketInfo />
      }
    ]
  }
])

const App = () => {
  return(
    <RouterProvider router={routes} />
  )
}

export default App;
