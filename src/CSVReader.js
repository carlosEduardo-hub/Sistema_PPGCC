import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CSVReader = () => {
  const [dataForRecharts, setDataForRecharts] = useState([]);
  const [selectedKey, setSelectedKey] = useState();

  const handleFileChosen = (file) => {
    Papa.parse(file, {
      complete: (results) => {
        const formattedData = results.data.map((item) => {
          const formattedItem = { name: item.Informação };
          for (let key in item) {
            if (key !== 'Informação' && item[key]) {
              formattedItem[key] = Number(item[key]);
            }
          }
          return formattedItem;
        });
        setDataForRecharts(formattedData);
      },
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      delimiter: ',',
    });
  };

  const handleSelectChange = (event) => {
    setSelectedKey(event.target.value);
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
      <h2>Upload do arquivo CSV</h2>
      <select value={selectedKey} onChange={handleSelectChange}>
        {dataForRecharts.length > 0 &&  
          Object.keys(dataForRecharts[0]).map((key, index) => (
            <option key={index} value={key}>
              {key}
            </option>
          ))}
      </select>
      <BarChart width={800} height={400} data={dataForRecharts}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey={selectedKey} fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default CSVReader;
