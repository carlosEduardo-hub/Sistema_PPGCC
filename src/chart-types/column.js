import React from 'react';
import Chart from 'react-apexcharts';

const ColumnChart = ({
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
      type: 'bar',
      height: 400,
      stacked: true,
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
        horizontal: false,
        //columnWidth: '55%',
        //endingShape: 'rounded',
        dataLabels: {
          //position: 'top', // top, center, bottom
          total: {
            enabled: true,
            style: {
              color: '#B0C4DE',
              fontSize: '13px',
              fontWeight: 'bold',
              
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
      text: 'Grafico em Coluna',
      margin: 10,
      align: 'left',
      style: {
       color: '#B0C4DE',
       fontSize: '20px',
       fontWeight: 'bold',
      },
    },
<<<<<<< HEAD
    legend: {
      labels: {
        colors: '#B0C4DE',
      },
    },          
    xaxis: {
      categories: selectedInfo,
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
=======
    xaxis: {
      categories: selectedInfo,
>>>>>>> ff05ecabbcc5b0813b3744b793148166ef80e3bc
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

      <Chart
        options={options}
        series={series}
        type="bar"
        height={500}
        width={500}
      />
    </div>
  );
};

export default ColumnChart;
