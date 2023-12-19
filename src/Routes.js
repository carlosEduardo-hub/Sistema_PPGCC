import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InitialPage from "./templates/InitialPage";
<<<<<<< HEAD
import XLSXReader from "./XLSXTest";
=======
import XLSXReader from "./XLXSTest";
>>>>>>> ff05ecabbcc5b0813b3744b793148166ef80e3bc


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