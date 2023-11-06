import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CSVReader = () => {
  const [dataForRecharts, setDataForRecharts] = useState([]);

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
      <BarChart width={800} height={400} data={dataForRecharts}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {Object.keys(dataForRecharts[0] || {}).map((key, index) => {
          if (key !== 'name') {
            return <Bar key={index} dataKey={key} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />;
          }
          return null;
        })}
      </BarChart>
    </div>
  );
};

export default CSVReader;
