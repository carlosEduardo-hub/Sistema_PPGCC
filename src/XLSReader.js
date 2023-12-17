import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const XLSXReader = () => {
  const [workbook, setWorkbook] = useState(null);

  const handleFileChosen = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      let parsedData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1 });
      parsedData = parsedData.map((row) => row.slice(2));

      const newWorkbook = XLSX.utils.book_new();
      const newWorksheet = XLSX.utils.aoa_to_sheet(parsedData);
      XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');

      setWorkbook(newWorkbook);
    };

    reader.readAsArrayBuffer(file);
  };

  const saveAsXLSX = () => {
    if (workbook) {
      const wbout = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
      const file = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

      saveAs(file, 'novo_arquivo.xlsx');
    }
  };

  return (
    <div>
      <input
        type='file'
        accept='.xlsx, .xls'
        onChange={(e) => handleFileChosen(e.target.files[0])}
      />
      <button onClick={saveAsXLSX}>Salvar como XLSX</button>
    </div>
  );
};

export default XLSXReader;




// npm install file-saver
// npm install xlsx 
