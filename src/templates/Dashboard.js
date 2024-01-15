import React, { useState, useEffect } from 'react';
import '../styles/InitialPage.css'
import { Link, useLocation } from "react-router-dom";
import ColumnChart from '../chart-types/column';
import LineChart from '../chart-types/line';
import AreaChart from '../chart-types/area';
import BarChart from '../chart-types/bar';

const Dashboard = () => {
 const location = useLocation();
 const [savedGraphic, setSavedGraphic] = useState(null);

 useEffect(() => {
     // Check if there is any state data in the location
     if (location.state) {
         setSavedGraphic(location.state);
         console.log(location.state); // Log the contents of savegraphic
     }
 }, [location]);

 return (
     <>
         <div className="w-screen h-screen bg-bgcolor flex justify-center items-center flex-col gap-6">
             <div>
               <h1 className="text-5xl">Dashboard</h1>
             </div>
             <div className="w-screen h-7 flex justify-center">
               {savedGraphic && (
                  <LineChart
                      getSelectedYearsData={savedGraphic.data}
                      selectedInfo={savedGraphic.selectedInfo}
                      selectedYears={savedGraphic.selectedYears}
                      chartName={savedGraphic.chartName}
                  />
               )}
             </div>
         </div>
     </>
 );
};

export default Dashboard;
