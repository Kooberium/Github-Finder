import React from 'react'
import {Routes,Route} from 'react-router-dom';


import Usersearch from "../routes/Usersearch/Usersearch"
import Favrepos from '../routes/Favrepos/Favrepos';

export const routesData = [
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
//Короткий опис чому це масив з об'єктами , я описую структуру в виді об'єкту що це є маршрут з назвою , шляхом та елементом який воно буде віддавати
// Так є дуже удобно менеджити нові маршрути, просто описав новий obj і створив новий маршрут, плюс в інакших облястях коду я використовую цей масив активно



const router = () => {
  return (
    <Routes>
        {routesData.map(({path, element}, i) => <Route key={i} path={path} element={element} ></Route>)}
    </Routes>
  )
}

export default router
