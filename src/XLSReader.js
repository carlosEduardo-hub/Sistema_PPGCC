import React from 'react';
import * as XLSX from 'xlsx';

const XLSXConverter = () => {
  const convertXLStoXLSX = (file) => {
    if (!file.name.endsWith('.xls')) {
      alert('Por favor, selecione um arquivo XLS.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const newWorkBook = XLSX.utils.book_new();

      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        const newSheet = XLSX.utils.aoa_to_sheet(XLSX.utils.sheet_to_json(sheet, { header: 1 }));
        XLSX.utils.book_append_sheet(newWorkBook, newSheet, sheetName);
      });

      XLSX.writeFile(newWorkBook, 'convertedFile.xlsx');
    };

    reader.readAsArrayBuffer(file);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    convertXLStoXLSX(selectedFile);
  };

  return (
    <div>
      <input type="file" accept=".xls" onChange={handleFileChange} />
    </div>
  );
};

export default XLSXConverter;
