import React from 'react';
import Chart from 'react-apexcharts';

const BarChart = ({
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
      type: 'bar',
      height: 400,
      stacked:false,
      zoom: {
        enabled: true,
      },
      selection: {
        enabled: true,
      },
      zoomedArea: {
        fill: {
          color: '#90CAF9',
          opacity: 0.4,
        },
        stroke: {
          color: '#0D47A1',
          opacity: 0.7,
          width: 1,
        },
      },
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        borderRadius: 5,
        // borderRadiusApplication: 'end',
        horizontal: true,
        //columnWidth: '55%',
        //endingShape: 'rounded',
        dataLabels: {
          //position: 'top', // top, center, bottom
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        },
      }
    },
    dataLabels: {
      position: 'top',
      enabled: true,
      offsetY: 0,
      style: {
        fontSize: '12px',
        colors: ["#ADD8E6"]
      }
    },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent']
    },
    title: {
      text: 'Grafico em Barra',
      align: 'left',
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
        type="bar"
        height={500}
        width={500}
      />
    </div>
  );
};

export default BarChart;
