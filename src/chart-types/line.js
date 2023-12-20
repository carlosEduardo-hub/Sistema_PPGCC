import React from 'react';
import Chart from 'react-apexcharts';

const LineChart = ({
  selectedYears,
  allYears,
  selectedInfo,
  handleInfoChange,
  handleYearChange,
  dataMap,
  selectedChartType,
  getSelectedInfoData,
}) => {
  const options = {
    chart: {
      height: 400,
      type: 'line',
      zoom: {
        enabled: true,
      },
      toolbar: {
        autoSelected: 'pan',
        show: true
      }
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      width: 5,
      curve: 'straight', // stepline 
      dashArray: 0,
    },
    title: {
      text: 'Grafico em Linha',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6
      }
    },
    xaxis: {
      categories: selectedInfo,
      labels: {
        style: {
          colors: 'white',
          fontSize: '12px',
          fontWeight: 'bold',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: 'white',
          fontSize: '12px',
          fontWeight: 'bold',
        },
      },
    },
    fill: {
      opacity: 1
    }
  };

  const series = selectedYears.map((year) => ({
    name: year,
    data: selectedInfo.map((info) => getSelectedInfoData(info, year)),
  }));

  return (
    <div>
      {/* <select multiple value={selectedInfo} onChange={handleInfoChange}>
       {Object.keys(dataMap).map((item) => (
         <option key={item} value={item}>
           {item}
         </option>
       ))}
     </select>
     <select multiple value={selectedYears} onChange={handleYearChange}>
       {allYears.map((year) => (
         <option key={year} value={year}>
           {year}
         </option>
       ))}
     </select> */}
     <Chart options={options} 
     series={series} 
     type="line"
     height={500} 
     width={500} />
   </div>
  );
};

export default LineChart;
