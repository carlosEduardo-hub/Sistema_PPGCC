import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import randomColor from 'randomcolor';
import Chart from 'react-apexcharts';


const CSVReader = () => {
  const [dataForApexCharts, setDataForApexCharts] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [dataColors, setDataColors] = useState({});
  const [selectedInfo, setSelectedInfo] = useState('');

  const handleFileChosen = (file) => {
    Papa.parse(file, {
      complete: (results) => {
        const infoHeaders = results.meta.fields.filter((header) => header !== 'Informação' && header !== 'obs');
        setInfoData(infoHeaders);
  
        // Ajuste a intensidade das cores para torná-las mais fortes
        const colors = randomColor({
          count: infoHeaders.length,
          format: 'rgba',
          luminosity: 'bright', // Escolhe cores mais brilhantes
          alpha: 1, // 1 significa opacidade total
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
        setSelectedInfo(formattedData[0].nome); // Inicializa com o primeiro valor por padrão
      },
      header: true,
    });
  };

  const handleInfoChange = (selectedValue) => {
    setSelectedInfo(selectedValue);
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

// FAZENDO O GRAFICO EM LINHA 
// const options = {
//     chart: {
//       id: 'line',
//       toolbar: {
//         show: false,
//       },
//     },
//     // o erro ta aqui
//     xaxis: {
//       categories: dataForApexCharts.map((item) => item.nome),
//     },
//   };

//   const series = [
//     {
//       name: selectedInfo,
//       data: dataForApexCharts.map((item) => item[selectedInfo]),
//     },
//   ];

//   return (
//     <div>
//       <h2>Informação Headers:</h2>
//       <pre>{infoData.join(', ')}</pre>

//       {infoData.length > 0 && (
//         <select value={selectedInfo} onChange={(e) => handleInfoChange(e.target.value)}>
//           {dataForApexCharts.map((item) => (
//             <option key={item.nome} value={item.nome}>
//               {item.nome}
//             </option>
//           ))}
//         </select>
//       )}

//       <Chart options={options} series={series} type="line" height={600} />
//     </div>
//   );

  
// FAZENDO O GRAFICO EM BARRA
  // const options = {
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
  //       <select value={selectedInfo} onChange={(e) => handleInfoChange(e.target.value)}>
  //         {dataForApexCharts.map((item) => (
  //           <option key={item.nome} value={item.nome}>
  //             {item.nome}
  //           </option>
  //         ))}
  //       </select>
  //     )}

  //     <Chart
  //       options={options}
  //       series={[
  //         {
  //           name: selectedInfo,
  //           data: infoData
  //             .filter((header) => header !== 'nome')
  //             .map((year) => dataForApexCharts.find((item) => item.nome === selectedInfo)[year]),
  //         },
  //       ]}
  //       type="bar"
  //       height={350}
  //     />
  //   </div>
  // );

///GRAFICO EM PIZZA
const options = {
  labels: infoData.filter((header) => header !== 'nome'),
  colors: Object.values(dataColors),
};

return (
  <div>
    <h2>Informação Headers:</h2>
    <pre>{infoData.join(', ')}</pre>

    {infoData.length > 0 && (
      <select value={selectedInfo} onChange={(e) => handleInfoChange(e.target.value)}>
        {dataForApexCharts.map((item) => (
          <option key={item.nome} value={item.nome}>
            {item.nome}
          </option>
        ))}
      </select>
    )}

    <Chart
      options={options}
      series={dataForApexCharts.find((item) => item.nome === selectedInfo)
        ? Object.values(dataForApexCharts.find((item) => item.nome === selectedInfo)).slice(1)
        : []}
      type="pie"
      width="500"
    />
  </div>
);

};

export default CSVReader;
