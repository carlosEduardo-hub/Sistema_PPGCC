import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InitialPage from "./templates/InitialPage";
import XLSXReader from "./XLSXTest";


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