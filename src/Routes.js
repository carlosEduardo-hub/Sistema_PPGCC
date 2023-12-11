import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InitialPage from "./templates/InitialPage";
import CSVReader from "./XLSReader";


const AppRoutes = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<InitialPage />}></Route>
                <Route path="/graficos" element={<CSVReader/>}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;