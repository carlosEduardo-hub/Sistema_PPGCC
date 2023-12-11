import React, { useState } from 'react';
import Papa from 'papaparse';
import randomColor from 'randomcolor';
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
  const [selectedChartType, setSelectedChartType] = useState('column');
  // const [allData, setAllData] = useState([]);


  const handleFileChosen = (file) => {

    if (!file.name.endsWith('.csv')) {
      alert('Por favor, selecione um arquivo CSV.');
      return;
    }


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


        // const mergedData = [...allData, ...newData];
        // setAllData(mergedData);

        setDataForApexCharts(formattedData);
        setSelectedInfo([formattedData[0].nome]);

        const uniqueYears = Object.keys(formattedData[0]).filter((key) => key !== 'nome');
        setSelectedYears(uniqueYears);
      },
      header: true,
    });
  };

  const handleInfoChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedInfo(selectedValues || []);
  };

  const handleYearChange = (e) => {
    const selectedYearValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedYears(selectedYearValues || []);
  };

  
  // useEffect(() => {
  //   const input = document.createElement('input');
  //   input.type = 'file';
  //   input.accept = '.csv';
  //   input.onchange = (e) => handleFileChosen(e.target.files[0]);
  //   document.body.appendChild(input);

  //   return () => {
  //     document.body.removeChild(input);
  //   };
  // }, []);

  // if (!dataForApexCharts.length || !infoData.length || !dataForApexCharts[0][selectedInfo]) {
  //   return <div>Loading...</div>;
  // }


  return (
    <div className='grafico'>
      <div className='selector'>
      <select
        id='chartType'
        value={selectedChartType}
        onChange={(e) => setSelectedChartType(e.target.value)}
      >
        <option value='line'>Linha</option>
        <option value='area'>Área</option>
        <option value='bar'>Barra</option>
        <option value='column'>Coluna</option>
      </select>
      </div>
      {selectedChartType === 'line' && (
        <div>
          <LineChart
            selectedYears={selectedYears}
            infoData={infoData}
            selectedInfo={selectedInfo}
            handleInfoChange={handleInfoChange}
            handleYearChange={handleYearChange}
            dataForApexCharts={dataForApexCharts}
            dataColors={dataColors}
          />
        </div>
      )}
      {selectedChartType === 'area' && (
        <div>
          <AreaChart
            selectedYears={selectedYears}
            infoData={infoData}
            selectedInfo={selectedInfo}
            handleInfoChange={handleInfoChange}
            handleYearChange={handleYearChange}
            dataForApexCharts={dataForApexCharts}
            dataColors={dataColors}
          />
        </div>
      )}
      {selectedChartType === 'bar' && (
        <div>
          <BarChart
            selectedYears={selectedYears}
            infoData={infoData}
            selectedInfo={selectedInfo}
            handleInfoChange={handleInfoChange}
            handleYearChange={handleYearChange}
            dataForApexCharts={dataForApexCharts}
            dataColors={dataColors}
          />
        </div>
      )}
      {selectedChartType === 'column' && (
        <div>
          <ColumnChart
            selectedYears={selectedYears}
            infoData={infoData}
            selectedInfo={selectedInfo}
            handleInfoChange={handleInfoChange}
            handleYearChange={handleYearChange}
            dataForApexCharts={dataForApexCharts}
            dataColors={dataColors}
          />
        </div>
      )}
       <div className='input-wrapper'>
      <input
        type='file'
        accept='.csv'
        onChange={(e) => handleFileChosen(e.target.files[0])}
      />
    </div>
    </div>
  );



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


// npm install react-multiselect-checkboxes