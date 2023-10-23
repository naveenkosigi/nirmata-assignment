import CricketInfo from "./Components/Cricket/CricketInfo";
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import Layout from "./UI/Layout/Layout";
import CricketPlayerDetails from "./Components/Cricket/CricketPlayerDetails";


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
      },
      {
        path:'cricket/:id',
        element:<CricketPlayerDetails />
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
