import React from 'react';
import Chart from 'react-apexcharts';

const AreaChart = ({
  selectedYears,
  infoData,
  selectedInfo,
  handleInfoChange,
  handleYearChange,
  dataForApexCharts,
  dataColors,
}) => {
  const options = {
    chart: {
      height: 400,
      type: 'area',
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
      //dashArray: 5,
    },
    title: {
      text: 'Grafico em Area',
      align: 'left',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', '#f3f3f3'],
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
      categories: selectedYears,
    },
    colors: Object.values(dataColors),
    legend: {
      position: 'bottom',
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
  };

  const filteredDataForChart = selectedInfo.map((info) => ({
    name: info,
    data: selectedYears.map((year) =>
      dataForApexCharts.find((item) => item.nome === info)[year]
    ),
  }));

  return (
    <div>
      <div className='selector-info'>
        {infoData.length > 0 && (
          <select multiple value={selectedInfo} onChange={handleInfoChange}>
            {dataForApexCharts.map((item) => (
              <option key={item.nome} value={item.nome}>
                {item.nome}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className='selector-year'>         
      {infoData.length > 0 && (
        <select multiple value={selectedYears} onChange={handleYearChange}>
          {infoData
            .filter((header) => header !== 'nome')
            .map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>
      )}
      </div>   

      <Chart
        options={options}
        series={filteredDataForChart}
        type="area"
        height={500}
        width={500}
      />
    </div>
  );
};

export default AreaChart;