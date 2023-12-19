import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Chart from 'react-apexcharts';

const XLSXReader = () => {
  const [allData, setAllData] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);

  const handleFileChosen = (files) => {
    const readers = Array.from(files).map((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Aqui removemos as duas primeiras colunas
        let parsedData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
        parsedData = parsedData.map((row) => row.slice(2));
        console.log('Parsed Data:', parsedData);

        // Ignora a primeira linha e pega os anos
        const years = parsedData[0].slice(1).filter((item) => item !== 'Instituição de Ensino');
        console.log('Years:', years);

        // Transforma os dados para o formato adequado para o ApexCharts
        const formattedData = parsedData.slice(1).map((item) => {
          return {
            nome: item[0],
            ...Object.fromEntries(
              years.map((header, index) => [header, parseInt(item[index + 1], 10)])
            ),
          };
        });
        console.log('Formatted Data:', formattedData);

        // Combina os dados do arquivo atual com os dados dos arquivos anteriores
        setAllData((prevData) => [...prevData, ...formattedData]);
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const handleInfoChange = (e) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value);
    console.log('Selected Info:', selectedValues);
    setSelectedInfo(selectedValues || []);
  };

  const handleYearChange = (e) => {
    const selectedYearValues = Array.from(e.target.selectedOptions, (option) => option.value);
    console.log('Selected Years:', selectedYearValues);
    setSelectedYears(selectedYearValues || []);
  };

  const options = {
    chart: {
      height: 350,
      type: 'line',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: selectedYears,
    },
  };

  const series = selectedInfo.map((info) => {
    console.log('Info:', info);
    const foundData = allData.find((item) => item.nome === info);
    console.log('Found Data:', foundData);
    return {
      name: info,
      data: selectedYears.map((year) => foundData[year]),
    };
  });

  return (
    <div>
      <input
        type='file'
        accept='.xlsx, .xls'
        onChange={(e) => handleFileChosen(e.target.files)}
        multiple // Isso permite selecionar múltiplos arquivos no input
      />
      <select multiple value={selectedInfo} onChange={handleInfoChange}>
        {allData.map((item) => (
          <option key={item.nome} value={item.nome}>
            {item.nome}
          </option>
        ))}
      </select>
      <select multiple value={selectedYears} onChange={handleYearChange}>
        {allData[0]
          ? Object.keys(allData[0])
              .filter((key) => key !== 'nome' && key !== 'Instituição de Ensino')
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))
          : null}
      </select>
      <Chart options={options} series={series} type='line' height={500} width={500} />
    </div>
  );
};

export default XLSXReader;
