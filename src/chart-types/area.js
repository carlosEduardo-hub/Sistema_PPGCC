import React from 'react';
import Chart from 'react-apexcharts';
import '../styles/graphicsTheme.css'

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
    <div className='flex gap-3'>
      <div className='flex'>
        <div className='selector-info'>
          {infoData.length > 0 && (
            <select multiple value={selectedInfo} onChange={handleInfoChange} className='bg-secondbgcolor rounded-l-lg border-solid border-2 border-sky-500'>
              {dataForApexCharts.map((item) => (
                <option key={item.nome} value={item.nome} className='hover:bg-hovercolor'>
                  {item.nome}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className='selector-year'>
          {infoData.length > 0 && (
            <select multiple value={selectedYears} onChange={handleYearChange} className='bg-secondbgcolor rounded-r-lg border-solid border-2 border-sky-500'>
              {infoData
                .filter((header) => header !== 'nome')
                .map((year) => (
                  <option key={year} value={year} className='hover:bg-hovercolor'>
                    {year}
                  </option>
                ))}
            </select>
          )}
        </div>
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