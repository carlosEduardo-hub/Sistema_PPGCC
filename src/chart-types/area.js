import React from 'react';
import Chart from 'react-apexcharts';

const AreaChart = ({
  selectedInfo,
  selectedYears,
  getSelectedYearsData,
  chartName,
}) => {
  const options = {
    chart: {
      height: 400,
      type: 'area',
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false
        }
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
      text: chartName,
      align: 'left',
      style: {
        color: '#B0C4DE',
        fontSize: '20px',
        fontWeight: 'bold',
       },
    },
    grid: {
      row: {
        colors: ['#f3f3f3', '#f3f3f3'],
        opacity: 0.5,
      },
    },
    legend: {
      labels: {
        colors: '#B0C4DE',
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
      labels: {
        style: {
          colors: '#B0C4DE',
          fontSize: '12px',
          fontWeight: 'bold',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#B0C4DE',
          fontSize: '12px',
          fontWeight: 'bold',
        },
      },
    },
    fill: {
      opacity: 1
    }
  };

  const series = selectedInfo.map((year) => ({
    name: year,
    data: selectedYears.map((info) => getSelectedYearsData(info, year)),
  }))

  return (
    <div>
     <Chart options={options} 
     series={series} 
     type="area"
     height={500} 
     width={500} />
    </div>
  );
};

export default AreaChart;