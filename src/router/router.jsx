import React from 'react'
import {Routes,Route} from 'react-router-dom';


import Usersearch from "../page/Usersearch/Usersearch"
import Favrepos from '../page/Favrepos/Favrepos';

const pages_data= [
    { 
      name: 'Home',
      path: "/",
      element: <Usersearch />,
    },
    {
      name: 'Favorites',
      path: "/favrepos",
      element: <Favrepos />,
    },
];

export const pagesData = pages_data;

const router = () => {
  return (
    <Routes>
        {pages_data.map(({path, element}, i) => <Route key={i} path={path} element={element} ></Route>)}
    </Routes>
  )
}

export default router
