import React from 'react'
import {Routes,Route} from 'react-router-dom';


import Usersearch from "../components/Usersearch/Usersearch"

const pages_data= [
    {
      path: "/",
      element: <Usersearch />,
    },
];

const router = () => {
  return (
    <Routes>
        {pages_data.map(({path, element}, i) => <Route key={i} path={path} element={element} ></Route>)}
    </Routes>
  )
}

export default router
