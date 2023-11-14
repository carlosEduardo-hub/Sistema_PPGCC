// import React, { useEffect, useState } from 'react';
// import Papa from 'papaparse';
// import randomColor from 'randomcolor';
// import Chart from 'react-apexcharts';

// const CSVReader = () => {
//   const [dataForApexCharts, setDataForApexCharts] = useState([]);
//   const [infoData, setInfoData] = useState([]);
//   const [dataColors, setDataColors] = useState({});
//   const [selectedInfo, setSelectedInfo] = useState([]);

//   const handleFileChosen = (file) => {
//     Papa.parse(file, {
//       complete: (results) => {
//         const infoHeaders = results.meta.fields.filter((header) => header !== 'Informação' && header !== 'obs');
//         setInfoData(infoHeaders);

//         const colors = randomColor({
//           count: infoHeaders.length,
//           format: 'rgba',
//           luminosity: 'bright',
//           alpha: 1,
//         });

//         const colorsMap = {};
//         infoHeaders.forEach((header, index) => {
//           colorsMap[header] = colors[index];
//         });
//         setDataColors(colorsMap);

//         const formattedData = results.data.map((item) => {
//           return {
//             nome: item.Informação,
//             ...Object.fromEntries(infoHeaders.map((header) => [header, parseInt(item[header], 10)])),
//           };
//         });

//         setDataForApexCharts(formattedData);
//         setSelectedInfo([formattedData[0].nome]); // Inicializa com o primeiro valor por padrão
//       },
//       header: true,
//     });
//   };
// //ESTA PARA MULTIPLAS ESCOLHAS NECESSARIO MUDAR PARA AS OUTRAS
//   const handleInfoChange = (e) => {
//     const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
//     setSelectedInfo(selectedValues || []); // Certifique-se de que selectedInfo seja um array
//   };

//   useEffect(() => {
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = '.csv';
//     input.onchange = (e) => handleFileChosen(e.target.files[0]);
//     document.body.appendChild(input);

//     return () => {
//       document.body.removeChild(input);
//     };
//   }, []);

//   // if (!dataForApexCharts.length || !infoData.length || !dataForApexCharts[0][selectedInfo]) {
//   //   return <div>Loading...</div>;
//   // }

// // FAZENDO O GRAFICO EM BARRA
//   // Escolhendo apenas uma info
//       // const options = {
//       //   xaxis: {
//       //     categories: infoData.filter((header) => header !== 'nome'),
//       //   },
//       //   colors: Object.values(dataColors),
//       // };

//       // return (
//       //   <div>
//       //     <h2>Informação Headers:</h2>
//       //     <pre>{infoData.join(', ')}</pre>

//       //     {infoData.length > 0 && (
//       //       <select value={selectedInfo} onChange={(e) => handleInfoChange(e.target.value)}>
//       //         {dataForApexCharts.map((item) => (
//       //           <option key={item.nome} value={item.nome}>
//       //             {item.nome}
//       //           </option>
//       //         ))}
//       //       </select>
//       //     )}

//       //     <Chart
//       //       options={options}
//       //       series={[
//       //         {
//       //           name: selectedInfo,
//       //           data: infoData
//       //             .filter((header) => header !== 'nome')
//       //             .map((year) => dataForApexCharts.find((item) => item.nome === selectedInfo)[year]),
//       //         },
//       //       ]}
//       //       type="bar"
//       //       height={350}
//       //     />
//       //   </div>
//       // );
  

//       const options = {
//         xaxis: {
//           categories: infoData.filter((header) => header !== 'nome'),
//         },
//         colors: Object.values(dataColors),
//       };
    
//       return (
//         <div>
//           <h2>Informação Headers:</h2>
//           <pre>{infoData.join(', ')}</pre>
    
//           {infoData.length > 0 && (
//             <select multiple value={selectedInfo} onChange={handleInfoChange}>
//               {dataForApexCharts.map((item) => (
//                 <option key={item.nome} value={item.nome}>
//                   {item.nome}
//                 </option>
//               ))}
//             </select>
//           )}
    
//           <Chart
//             options={options}
//             series={selectedInfo.map((info) => ({
//               name: info,
//               data: infoData
//                 .filter((header) => header !== 'nome')
//                 .map((year) => dataForApexCharts.find((item) => item.nome === info)[year]),
//             }))}
//             type="bar"
//             height={350}
//           />
//         </div>
//       );


// // FAZENDO O GRAFICO EM LINHA 
// // const options = {
// //   chart: {
// //     id: 'line',
// //     toolbar: {
// //       show: false,
// //     },
// //   },
// //   xaxis: {
// //     categories: dataForApexCharts.map((item) => item.nome),
// //   },
// // };

// // const filteredData = dataForApexCharts.filter((item) => item.nome === selectedInfo);

// //   const series = infoData
// //     .filter((header) => header !== 'nome')
// //     .map((year) => ({
// //       name: year,
// //       data: filteredData.map((item) => item[year]),
// //     }));

// // return (
// //   <div>
// //     <h2>Informação Headers:</h2>
// //     <pre>{infoData.join(', ')}</pre>

// //     {infoData.length > 0 && (
// //       <select value={selectedInfo} onChange={(e) => handleInfoChange(e.target.value)}>
// //       {dataForApexCharts.map((item) => (
// //         <option key={item.nome} value={item.nome}>
// //           {item.nome}
// //         </option>
// //       ))}
// //     </select>
// //     )}

// //     <Chart options={options} series={series} type="line" height={600} />
// //   </div>
// // );

  

// ///GRAFICO EM PIZZA
// // const options = {
// //   labels: infoData.filter((header) => header !== 'nome'),
// //   colors: Object.values(dataColors),
// // };

// // return (
// //   <div>
// //     <h2>Informação Headers:</h2>
// //     <pre>{infoData.join(', ')}</pre>

// //     {infoData.length > 0 && (
// //       <select value={selectedInfo} onChange={(e) => handleInfoChange(e.target.value)}>
// //         {dataForApexCharts.map((item) => (
// //           <option key={item.nome} value={item.nome}>
// //             {item.nome}
// //           </option>
// //         ))}
// //       </select>
// //     )}

// //     <Chart
// //       options={options}
// //       series={dataForApexCharts.find((item) => item.nome === selectedInfo)
// //         ? Object.values(dataForApexCharts.find((item) => item.nome === selectedInfo)).slice(1)
// //         : []}
// //       type="pie"
// //       width="600"
// //     />
// //   </div>
// // );

// };

// export default CSVReader;

import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import randomColor from 'randomcolor';
import Chart from 'react-apexcharts';

const CSVReader = () => {
  const [dataForApexCharts, setDataForApexCharts] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [dataColors, setDataColors] = useState({});
  const [selectedInfo, setSelectedInfo] = useState([]);

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
        setSelectedInfo([formattedData[0].nome]); // Inicializa com o primeiro valor por padrão
      },
      header: true,
    });
  };

  const handleInfoChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedInfo(selectedValues || []); // Certifique-se de que selectedInfo seja um array
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

  const options = {
    series: selectedInfo.map((info) => ({
      data: infoData
        .filter((header) => header !== 'nome')
        .map((year) => dataForApexCharts.find((item) => item.nome === info)[year]),
    })),
    chart: {
      height: 350,
      type: 'bar',
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    colors: Object.values(dataColors),
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: selectedInfo.map((info) => [info]),
      labels: {
        style: {
          colors: Object.values(dataColors),
          fontSize: '12px',
        },
      },
    },
  };

  return (
    <div>
      <h2>Informação Headers:</h2>
      <pre>{infoData.join(', ')}</pre>

      {infoData.length > 0 && (
        <select multiple value={selectedInfo} onChange={handleInfoChange}>
          {dataForApexCharts.map((item) => (
            <option key={item.nome} value={item.nome}>
              {item.nome}
            </option>
          ))}
        </select>
      )}

      <Chart options={options} series={options.series} type="bar" height={350} />
    </div>
  );
};

export default CSVReader;
