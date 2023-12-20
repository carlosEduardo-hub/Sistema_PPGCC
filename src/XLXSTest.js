import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import ColumnChart from './chart-types/column';
import LineChart from './chart-types/line';
import AreaChart from './chart-types/area';
import BarChart from './chart-types/bar';

const XLSXReader = () => {
  const [allData, setAllData] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [dataMap, setDataMap] = useState({});
  const [allYears, setAllYears] = useState([]);

  const handleFileChosen = (files) => {
    const readers = Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        let parsedData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
        parsedData = parsedData.map((row) => row.slice(2));
        console.log('Parsed Data:', parsedData);

        const years = parsedData[0].slice(1).filter((item) => item !== 'Instituição de Ensino' && item !== 'nome');
        console.log('Years:', years);

        const formattedData = parsedData.slice(1).map((item) => {
          return {
            nome: item[0],
            ...Object.fromEntries(
              years.map((header, index) => [header, parseInt(item[index + 1], 10)])
            ),
          };
        });
        console.log('Formatted Data:', formattedData);
        setAllData((prevData) => [...prevData, ...formattedData]);
        console.log('Formatted Data2:', formattedData);

        const dataAssocMap = formattedData.reduce((acc, curr) => {
          acc[curr.nome] = curr;
          return acc;
        }, dataMap);

        setDataMap(dataAssocMap);

        const newYears = Object.values(dataAssocMap).reduce((acc, curr) => {
          return [...acc, ...Object.keys(curr)];
        }, []);
        setAllYears(Array.from(new Set(newYears)));
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

  const getSelectedInfoData = (info, year) => {
    const foundData = dataMap[info];
    return foundData && foundData[year] !== undefined ? foundData[year] : 0;
  };

  return (
    <div className='bg-begolor' >
      <div className='selector'>
        <input
          type='file'
          accept='.xlsx, .xls'
          onChange={(e) => handleFileChosen(e.target.files)}
          multiple
        />
      </div>
      <div>
        <select multiple value={selectedInfo} onChange={handleInfoChange}>
          {Object.keys(dataMap).map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select multiple value={selectedYears} onChange={handleYearChange}>
          {allYears
            .filter((year) => year !== 'nome')
            .map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>
      </div>
      <div>
        <LineChart
          getSelectedInfoData={getSelectedInfoData}
          selectedYears={selectedYears}
          allYears={allYears}
          selectedInfo={selectedInfo}
          handleInfoChange={handleInfoChange}
          handleYearChange={handleYearChange}
          dataMap={dataMap}
        />
      </div>
      <div>
        <AreaChart
          getSelectedInfoData={getSelectedInfoData}
          selectedYears={selectedYears}
          allYears={allYears}
          selectedInfo={selectedInfo}
          handleInfoChange={handleInfoChange}
          handleYearChange={handleYearChange}
          dataMap={dataMap}
        />
      </div>
      <div>
        <BarChart
          getSelectedInfoData={getSelectedInfoData}
          selectedYears={selectedYears}
          allYears={allYears}
          selectedInfo={selectedInfo}
          handleInfoChange={handleInfoChange}
          handleYearChange={handleYearChange}
          dataMap={dataMap}
        />
      </div>
      <div>
        <ColumnChart
          getSelectedInfoData={getSelectedInfoData}
          selectedYears={selectedYears}
          allYears={allYears}
          selectedInfo={selectedInfo}
          handleInfoChange={handleInfoChange}
          handleYearChange={handleYearChange}
          dataMap={dataMap}
        />
      </div>
    </div>
  );

};

export default XLSXReader;
