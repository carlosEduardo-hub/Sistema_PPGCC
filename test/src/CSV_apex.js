import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import randomColor from 'randomcolor';
import Chart from 'react-apexcharts';
import ColumnChart from './chart-types/column';
import LineChart from './chart-types/line';
import AreaChart from './chart-types/area';
import BarChart from './chart-types/bar';

const CSVReader = () => {
  const [dataForApexCharts, setDataForApexCharts] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [dataColors, setDataColors] = useState({});
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);


  const handleFileChosen = (file) => {
    Papa.parse(file, {
      complete: (results) => {
        const infoHeaders = results.meta.fields.filter((header) => header !== 'Informação' && header !== 'obs');
        setInfoData(infoHeaders);

        const colors = randomColor({
          count: infoHeaders.length,
          format: 'rgba',
          luminosity: 'bright',
          alpha: 1,
        });

        const colorsMap = {};
        infoHeaders.forEach((header, index) => {
          colorsMap[header] = colors[index];
        });
        setDataColors(colorsMap);

        const formattedData = results.data.map((item) => {
          return {
            nome: item.Informação,
            ...Object.fromEntries(infoHeaders.map((header) => [header, parseInt(item[header], 10)])),
          };
        });

        setDataForApexCharts(formattedData);
        setSelectedInfo([formattedData[0].nome]);

        const uniqueYears = Object.keys(formattedData[0]).filter((key) => key !== 'nome');
        setSelectedYears(uniqueYears);
      },
      header: true,
    });
  };
  // //ESTA PARA MULTIPLAS ESCOLHAS NECESSARIO MUDAR PARA AS OUTRAS
  const handleInfoChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedInfo(selectedValues || []);
  };

  const handleYearChange = (e) => {
    const selectedYearValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedYears(selectedYearValues || []);
  };


  useEffect(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = (e) => handleFileChosen(e.target.files[0]);
    document.body.appendChild(input);

    return () => {
      document.body.removeChild(input);
    };
  }, []);

  // if (!dataForApexCharts.length || !infoData.length || !dataForApexCharts[0][selectedInfo]) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className='grafico'>
      <select id='lang' value={} onChange={}>
        <option value="line" >Line</option>
        <option value="area" >Area</option>
        <option value="bar" >Bar</option>
        <option value="column" >Column</option>
      </select>
    </div>
  )




  // FAZENDO GRAFICO EM COLUNA

  // return (
  //   <div>
  //   <ColumnChart
  //     selectedYears={selectedYears}
  //     infoData={infoData}
  //     selectedInfo={selectedInfo}
  //     handleInfoChange={handleInfoChange}
  //     handleYearChange={handleYearChange}
  //     dataForApexCharts={dataForApexCharts}
  //     dataColors={dataColors}
  //   />
  // </div>
  // );


  // // FAZENDO O GRAFICO EM LINHA 

  // return (
  //   <div>
  //     <LineChart
  //       selectedYears={selectedYears}
  //       infoData={infoData}
  //       selectedInfo={selectedInfo}
  //       handleInfoChange={handleInfoChange}
  //       handleYearChange={handleYearChange}
  //       dataForApexCharts={dataForApexCharts}
  //       dataColors={dataColors}
  //     />
  //   </div>
  // );

   // FAZENDO UM GRAFICO EM AREA

  // return (
  //   <div>
  //      <AreaChart
  //         selectedYears={selectedYears}
  //         infoData={infoData}
  //         selectedInfo={selectedInfo}
  //         handleInfoChange={handleInfoChange}
  //         handleYearChange={handleYearChange}
  //         dataForApexCharts={dataForApexCharts}s
  //         dataColors={dataColors}
  //       />
  //   </div>
  // );

  //  FAZENDO GRAFICO EM BARRA

  // return (
  //   <div>
  //      <BarChart
  //         selectedYears={selectedYears}
  //         infoData={infoData}
  //         selectedInfo={selectedInfo}
  //         handleInfoChange={handleInfoChange}
  //         handleYearChange={handleYearChange}
  //         dataForApexCharts={dataForApexCharts}s
  //         dataColors={dataColors}
  //       />
  //   </div>
  // );



  // ///GRAFICO EM PIZZA
  // const options = {
  //   chart: {
  //     width: 380,
  //     type: 'pie',
  //   },
  //   labels: selectedInfo,
  //   responsive: [
  //     {
  //       breakpoint: 480,
  //       options: {
  //         chart: {
  //           width: 200,
  //         },
  //         legend: {
  //           position: 'bottom',
  //         },
  //       },
  //     },
  //   ],
  // };

  // return (
  //   <div>
  //     <h2>Informação Headers:</h2>
  //     <pre>{infoData.join(', ')}</pre>

  //     {infoData.length > 0 && (
  //       <select multiple value={selectedInfo} onChange={handleInfoChange}>
  //         {dataForApexCharts.map((item) => (
  //           <option key={item.nome} value={item.nome}>
  //             {item.nome}
  //           </option>
  //         ))}
  //       </select>
  //     )}

  //     <div id="chart">
  //       <Chart options={options} series={dataForApexCharts} type="pie" width={380} />
  //     </div>
  //     <div id="html-dist"></div>
  //   </div>
  // );

 

};

export default CSVReader;
