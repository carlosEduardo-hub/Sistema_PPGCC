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

  const options = {
    xaxis: {
      categories: infoData.filter((header) => header !== 'nome'),
    },
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
        series={[
          {
            name: selectedInfo,
            data: infoData
              .filter((header) => header !== 'nome')
              .map((year) => dataForApexCharts.find((item) => item.nome === selectedInfo)[year]),
          },
        ]}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default CSVReader;
