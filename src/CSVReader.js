import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Papa from 'papaparse';

const CSVReader = () => {
  const [dataForRecharts, setDataForRecharts] = useState([]);

  const handleFileChosen = (file) => {
    Papa.parse(file, {
      complete: (results) => {
        const formattedData = results.data.slice(1).map((item) => ({
          nome: item.nome,
          valor: item.valor
        }));
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
    <BarChart width={600} height={600} data={dataForRecharts}>
      <Bar dataKey="valor" fill="purple" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="nome" />
      <YAxis />
    </BarChart>
  );
};

export default CSVReader;
