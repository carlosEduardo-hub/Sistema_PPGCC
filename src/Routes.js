import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InitialPage from "./templates/InitialPage";
<<<<<<< HEAD
import XLSXReader from "./XLSXTest";
=======
import CSVReader from "./XLXSTest";
>>>>>>> FerdRosa


const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<InitialPage />}></Route>
                <Route path="/graficos" element={<XLSXReader/>}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;