import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Papa from 'papaparse';
import randomColor from 'randomcolor';

const CSVReader = () => {
  const [dataForRecharts, setDataForRecharts] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [dataColors, setDataColors] = useState({});

  const handleFileChosen = (file) => {
    Papa.parse(file, {
      complete: (results) => {
        // Obtém os cabeçalhos diretamente do objeto results
        const infoHeaders = results.meta.fields.filter((header) => header !== 'Informação'); // Filtrar "Informação"
        setInfoData(infoHeaders);

        // Gere cores aleatórias para cada data
        const colors = randomColor({ count: infoHeaders.length, format: 'rgba' });

        // Mapeie as cores para os cabeçalhos
        const colorsMap = {};
        infoHeaders.forEach((header, index) => {
          colorsMap[header] = colors[index];
        });
        setDataColors(colorsMap);

        // Formatar os dados para o gráfico
        const formattedData = results.data.map((item) => {
          return {
            nome: item.Informação,
            ...Object.fromEntries(infoHeaders.map((header) => [header, parseInt(item[header], 10)])),
          };
        });

        setDataForRecharts(formattedData);
      },
      header: true,
    });
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
      <BarChart width={1200} height={600} data={dataForRecharts}>
        {infoData.map((header) => (
          <Bar key={header} dataKey={header} fill={dataColors[header]} />
        ))}
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="nome" />
        <YAxis />
        <Tooltip />
        <Legend />
      </BarChart>
    </div>
  );
};

export default CSVReader;
