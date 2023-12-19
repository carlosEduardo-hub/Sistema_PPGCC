import React, { useState } from "react";
import * as XLSX from "xlsx";
import ColumnChart from "./chart-types/column";
import LineChart from "./chart-types/line";
import AreaChart from "./chart-types/area";
import BarChart from "./chart-types/bar";
import "./styles/graphicsTheme.css";

const XLSXReader = () => {
  const [allData, setAllData] = useState([]);
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [dataMap, setDataMap] = useState({});
  const [allYears, setAllYears] = useState([]);
  const [selectedChartType, setSelectedChartType] = useState("line");

  const handleFileChosen = (files) => {
    const readers = Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        let parsedData = XLSX.utils.sheet_to_json(
          workbook.Sheets[workbook.SheetNames[0]],
          { header: 1 }
        );
        parsedData = parsedData.map((row) => row.slice(2));
        console.log("Parsed Data:", parsedData);

        const years = parsedData[0]
          .slice(1)
          .filter(
            (item) => item !== "Instituição de Ensino" && item !== "nome"
          );
        console.log("Years:", years);

        const formattedData = parsedData.slice(1).map((item) => {
          return {
            nome: item[0],
            ...Object.fromEntries(
              years.map((header, index) => [
                header,
                parseInt(item[index + 1], 10),
              ])
            ),
          };
        });
        console.log("Formatted Data:", formattedData);
        setAllData((prevData) => [...prevData, ...formattedData]);
        console.log("Formatted Data2:", formattedData);

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
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    console.log("Selected Info:", selectedValues);
    setSelectedInfo(selectedValues || []);
  };

  const handleYearChange = (e) => {
    const selectedYearValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    console.log("Selected Years:", selectedYearValues);
    setSelectedYears(selectedYearValues || []);
  };

  const getSelectedInfoData = (info, year) => {
    const foundData = dataMap[info];
    return foundData && foundData[year] !== undefined ? foundData[year] : 0;
  };

  return (
    <div className="min-h-screen bg-bgcolor flex justify-center items-center flex-col gap-3">
      <div className="mt-8">
        <h1 className="text-hovercolor mb-4">Selecione arquivo(s)</h1>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={(e) => handleFileChosen(e.target.files)}
          multiple
          className="block w-full text-sm text-slate-400
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-200"
        />
      </div>
      {Object.keys(dataMap).length > 0 && (
        <div className="flex flex-col items-center w-full overflow-auto mt-4">
          <div className="flex justify-center align-center w-full">
            <div className="selector-year">
              <select
                multiple
                value={selectedInfo}
                onChange={handleInfoChange}
                className="bg-secondbgcolor rounded-l-lg border-solid border-2 border-sky-500"
              >
                {Object.keys(dataMap).map((item) => (
                  <option
                    key={item}
                    value={item}
                    className="hover:bg-hovercolor"
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="selector-info">
              <select
                multiple
                value={selectedYears}
                onChange={handleYearChange}
                className="bg-secondbgcolor rounded-r-lg border-solid border-2 border-sky-500"
              >
                {allYears.map((year) => (
                  <option
                    key={year}
                    value={year}
                    className="hover:bg-hovercolor"
                  >
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="border-solid border-4 border-graphicsbordercolor rounded-lg">
              <LineChart
                selectedChartType={selectedChartType}
                getSelectedInfoData={getSelectedInfoData}
                selectedYears={selectedYears}
                allYears={allYears}
                selectedInfo={selectedInfo}
                handleInfoChange={handleInfoChange}
                handleYearChange={handleYearChange}
                dataMap={dataMap}
              />
            </div>
            <div className="border-solid border-4 border-graphicsbordercolor rounded-lg">
              <AreaChart
                selectedChartType={selectedChartType}
                getSelectedInfoData={getSelectedInfoData}
                selectedYears={selectedYears}
                allYears={allYears}
                selectedInfo={selectedInfo}
                handleInfoChange={handleInfoChange}
                handleYearChange={handleYearChange}
                dataMap={dataMap}
              />
            </div>
            <div className="border-solid border-4 border-graphicsbordercolor rounded-lg">
              <BarChart
                selectedChartType={selectedChartType}
                getSelectedInfoData={getSelectedInfoData}
                selectedYears={selectedYears}
                allYears={allYears}
                selectedInfo={selectedInfo}
                handleInfoChange={handleInfoChange}
                handleYearChange={handleYearChange}
                dataMap={dataMap}
              />
            </div>
            <div className="border-solid border-4 border-graphicsbordercolor rounded-lg">
              <ColumnChart
                selectedChartType={selectedChartType}
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
        </div>
      )}
    </div>
  );
};

export default XLSXReader;
