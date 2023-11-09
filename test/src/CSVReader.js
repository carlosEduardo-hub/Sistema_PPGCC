// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Papa from 'papaparse';
import randomColor from 'randomcolor';

const CSVReader = () => {
  const [dataForRecharts, setDataForRecharts] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [dataColors, setDataColors] = useState({});
  const [selectedInfo, setSelectedInfo] = useState('');

  const handleFileChosen = (file) => {
    Papa.parse(file, {
      complete: (results) => {
        const infoHeaders = results.meta.fields.filter((header) => header !== 'Informação' && header !== 'obs');
        setInfoData(infoHeaders);

        const colors = randomColor({ count: infoHeaders.length, format: 'rgba' });

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

        setDataForRecharts(formattedData);
        setSelectedInfo(infoHeaders[0]); // Inicializa com o primeiro valor por padrão
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

  return (
    <div>
      <h2>Informação Headers:</h2>
      <pre>{infoData.join(', ')}</pre>

      {infoData.length > 0 && (
        <select value={selectedInfo} onChange={(e) => handleInfoChange(e.target.value)}>
          {dataForRecharts.map((item) => (
            <option key={item.nome} value={item.nome}>
              {item.nome}
            </option>
          ))}
        </select>
      )}

      <BarChart width={1200} height={600} data={dataForRecharts.filter((item) => item.nome === selectedInfo)}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="nome" />
        <YAxis />
        <Tooltip />
        <Legend />
        {infoData
          .filter((header) => header !== 'nome') // Excluir a coluna 'nome' dos anos
          .map((year) => (
            <Bar key={year} dataKey={year} fill={dataColors[year]} />
          ))}
      </BarChart>
    </div>
  );
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

  // Opções para o dropdown de seleção de informações
  // const infoOptions = infoData.map((info) => ({ value: info, label: info }));

  // // Função para lidar com a mudança na seleção
  //  const handleInfoSelect = (selectedOption) => {
  //    setSelectedInfo(selectedOption.value);
  //  };

  ////////////////////////////BAR/////////////////////////////
  // return (
  //   <div>
  //     <h2>Selecionar Informação:</h2>
  //     <Select
  //       options={infoOptions}
  //       onChange={handleInfoSelect}
  //       value={infoOptions.find((option) => option.value === selectedInfo)}
  //     />

  //     {selectedInfo && (
  //   <div>
  //     <h2>Informação Headers:</h2>
      
  //     <BarChart width={1200} height={600} data={dataForRecharts}>
  //       {infoData.map((header) => (
  //         <Bar key={header} dataKey={header} fill={dataColors[selectedInfo]} />
  //       ))}
  //       <CartesianGrid stroke="#ccc" />
  //       <XAxis dataKey="nome" />
  //       <YAxis />
  //       <Tooltip />
  //       <Legend />
  //     </BarChart>
  //   </div>
  //     )};
  //     </div>
  // );
        

//   return (
//     <div>
//       <h2>Informação Headers:</h2>
//       <pre>{infoData.join(', ')}</pre>

//       {infoData.length > 0 && (
//         <select value={selectedInfo} onChange={(e) => handleInfoChange(e.target.value)}>
//           {infoData.map((info) => (
//             <option key={info} value={info}>
//               {info}
//             </option>
//           ))}
//         </select>
//       )}

//       <BarChart width={1200} height={600} data={dataForRecharts}>
//         <Bar dataKey={selectedInfo} fill={dataColors[selectedInfo]} />
//         <CartesianGrid stroke="#ccc" />
//         <XAxis dataKey="nome" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//       </BarChart>
//     </div>
//   );
// };



  // return (
  //   <div>
  //     <h2>Informação Headers:</h2>
  //     <pre>{infoData.join(', ')}</pre>
  //     <BarChart width={1200} height={600} data={dataForRecharts}>
  //       {infoData.map((header) => (
  //         <Bar key={header} dataKey={header} stackId="a" fill={dataColors[header]} />
  //       ))}
  //       <CartesianGrid stroke="#ccc" />
  //       <XAxis dataKey="nome" />
  //       <YAxis />
  //       <Tooltip />
  //       <Legend />
  //     </BarChart>
  //   </div>
  // );

  ////////////////////LINE///////////////////////////////
  // return (
  //   <div>
  //     <h2>Informação Sucupira:</h2>
  //     <pre>{infoData.join(', ')}</pre>
  //     <LineChart width={1200} height={600} data={dataForRecharts}>
  //       {infoData.map((header) => (
  //         <Line key={header} type="monotone" dataKey={header} stroke={dataColors[header]} />
  //       ))}
  //       <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
  //       <XAxis dataKey="nome" /> {/* padding={{ left: 30, right: 30 }} */}
  //       <YAxis />
  //       <Tooltip />
  //       <Legend />
  //     </LineChart>
  //   </div>
  // );
  ////////////////////////////AREA////////////////////////////////////
  // return (
  //   <div>
  //     <h2>Informação Sucupira:</h2>
  //     <pre>{infoData.join(', ')}</pre>
  //     <AreaChart width={1200} height={600} data={dataForRecharts}>
  //       {infoData.map((header) => (
  //         <Area key={header} type="monotone" stackId="1" dataKey={header} stroke={dataColors[header]} fill={dataColors[header]} />
  //       ))}
  //       <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
  //       <XAxis dataKey="nome" />
  //       <YAxis />
  //       <Tooltip />
  //       <Legend />
  //     </AreaChart>
  //   </div>
  // );
  ////////////////////////////PIE///////////////////////////
  // return (
  //   <div>
  //     <h2>Informação Headers:</h2>
  //     <pre>{infoData.join(', ')}</pre>
  //     <PieChart width={600} height={400}>
  //       <Pie
  //         data={dataForRecharts}
  //         dataKey="2016" // Aqui, escolha o ano desejado para exibir no gráfico de pizza (por exemplo, 2016)
  //         nameKey="nome"
  //         cx="50%"
  //         cy="50%"
  //         outerRadius={80}
  //         fill="#8884d8"
  //         label
  //       >
  //         {infoData.map((header, index) => (
  //           <Cell key={`cell-${header}`} fill={dataColors[header]} />
  //         ))}
  //       </Pie>
  //       <Tooltip />
  //       <Legend />
  //     </PieChart>
  //   </div>
  // );
  

export default CSVReader;
