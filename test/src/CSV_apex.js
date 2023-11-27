import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import randomColor from 'randomcolor';
import Chart from 'react-apexcharts';

const CSVReader = () => {
  const [dataForApexCharts, setDataForApexCharts] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [dataColors, setDataColors] = useState({});
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [chartType, setChartType] = useState('bar');


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

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value);
  };

  // if (!dataForApexCharts.length || !infoData.length || !dataForApexCharts[0][selectedInfo]) {
  //   return <div>Loading...</div>;
  // }



  // // FAZENDO O GRAFICO EM BARRA
  // const options = {
  //   chart: {
  //     type: 'bar',
  //     height: 400,
  //     stacked:true,
  //     zoom: {
  //       enabled: true,
  //     },
  //     selection: {
  //       enabled: true,
  //     },
  //     zoomedArea: {
  //       fill: {
  //         color: '#90CAF9',
  //         opacity: 0.4,
  //       },
  //       stroke: {
  //         color: '#0D47A1',
  //         opacity: 0.7,
  //         width: 1,
  //       },
  //     },
  //   },
  //   responsive: [{
  //     breakpoint: 480,
  //     options: {
  //       legend: {
  //         position: 'bottom',
  //         offsetX: -10,
  //         offsetY: 0
  //       }
  //     }
  //   }],
  //   plotOptions: {
  //     bar: {
  //       borderRadius: 5,
  //       // borderRadiusApplication: 'end',
  //       horizontal: false,
  //       //columnWidth: '55%',
  //       //endingShape: 'rounded',
  //       dataLabels: {
  //         //position: 'top', // top, center, bottom
  //         total: {
  //           enabled: true,
  //           style: {
  //             fontSize: '13px',
  //             fontWeight: 900
  //           }
  //         }
  //       },
  //     }
  //   },
  //   dataLabels: {
  //     position: 'top',
  //     enabled: true,
  //     offsetY: 0,
  //     style: {
  //       fontSize: '12px',
  //       colors: ["#ADD8E6"]
  //     }
  //   },
  //   stroke: {
  //     show: true,
  //     width: 4,
  //     colors: ['transparent']
  //   },
  //   xaxis: {
  //     categories: selectedYears,
  //   },
  //   colors: Object.values(dataColors),
  //   legend: {
  //     position: 'bottom',
  //     offsetY: 40
  //   },
  //   fill: {
  //     opacity: 1
  //   }
  // };

  // const filteredDataForChart = selectedInfo.map((info) => ({
  //   name: info,
  //   data: selectedYears.map((year) =>
  //     dataForApexCharts.find((item) => item.nome === info)[year]
  //   ),
  // }));
  

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

  //     {infoData.length > 0 && (
  //       <select multiple value={selectedYears} onChange={handleYearChange}>
  //         {infoData
  //           .filter((header) => header !== 'nome')
  //           .map((year) => (
  //             <option key={year} value={year}>
  //               {year}
  //             </option>
  //           ))}
  //       </select>
  //     )}

  //     <Chart
  //       options={options}
  //       series={filteredDataForChart}
  //       type="bar"
  //       height={350}
  //       width={500}
  //     />
  //   </div>
  // );


  // // FAZENDO O GRAFICO EM LINHA 

  // const options = {
  //   chart: {
  //     height: 100,
  //     type: 'line',
  //     zoom: {
  //       enabled: true,
  //     },
  //     toolbar: {
  //       autoSelected: 'pan',
  //       show: true
  //     }
  //   },
  //   dataLabels: {
  //     enabled: true,
  //   },
  //   stroke: {
  //     width: 5,
  //     curve: 'straight', // stepline 
  //     dashArray: 0,
  //   },
  //   title: {
  //     text: 'Grafico em Linha',
  //     align: 'left',
  //   },
  //   grid: {
  //     row: {
  //       colors: ['#f3f3f3', 'transparent'],
  //       opacity: 0.5,
  //     },
  //   },

  //   markers: {
  //     size: 0,
  //     hover: {
  //       sizeOffset: 6
  //     }
  //   },
  //   xaxis: {
  //     categories: infoData.filter((header) => header !== 'nome'),
  //   },
  //   colors: Object.values(dataColors),
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

  //     <Chart
  //       options={options}
  //       series={selectedInfo.map((info) => ({
  //         name: info,
  //         data: infoData.filter((header) => header !== 'nome').map((year) => dataForApexCharts.find((item) => item.nome === info)[year]),
  //       }))}
  //       type="line"
  //       height={350}
  //       width={500}
  //     />
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

  // FAZENDO UM GRAFICO EM AREA
  // const options = {
  //   chart: {
  //     height: 350,
  //     type: 'area',
  //     zoom: {
  //       enabled: true,
  //     },
  //     toolbar: {
  //       autoSelected: 'pan',
  //       show: true
  //     }
  //   },
  //   dataLabels: {
  //     enabled: true,
  //   },
  //   stroke: {
  //     width: 5,
  //     curve: 'straight', // stepline
  //     //dashArray: 5,
  //   },
  //   title: {
  //     text: 'Grafico em Linha',
  //     align: 'left',
  //   },
  //   grid: {
  //     row: {
  //       colors: ['#f3f3f3', 'transparent'],
  //       opacity: 0.5,
  //     },
  //   },

  //   markers: {
  //     size: 0,
  //     hover: {
  //       sizeOffset: 6
  //     }
  //   },
  //   xaxis: {
  //     categories: infoData.filter((header) => header !== 'nome'),
  //   },
  //   colors: Object.values(dataColors),
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

  //     <Chart
  //       options={options}
  //       series={selectedInfo.map((info) => ({
  //         name: info,
  //         data: infoData.filter((header) => header !== 'nome').map((year) => dataForApexCharts.find((item) => item.nome === info)[year]),
  //       }))}
  //       type="area"
  //       height={350}
  //     />
  //   </div>
  // );

};

export default CSVReader;
