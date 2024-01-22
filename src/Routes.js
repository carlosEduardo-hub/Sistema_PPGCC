import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InitialPage from "./templates/InitialPage";
import XLSXReader from "./XLSXReader2";



const AppRoutes = () => {
    return(
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<InitialPage />}></Route>
                <Route path="/graficos" element={<XLSXReader/>}></Route>
            </Routes>
        </Router>
    )
}

export default AppRoutes;