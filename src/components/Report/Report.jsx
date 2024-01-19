import React from "react";
import ReactApexChart from "react-apexcharts";
import "./Report.css";

const Report = () => {
  // Dados fictícios para o gráfico de linha
  const chartData = {
    series: [
      {
        name: "Produção A",
        data: [50, 70, 60, 80, 75, 90, 85, 100, 95, 110],
      },
      {
        name: "Produção B",
        data: [40, 60, 50, 70, 65, 80, 75, 90, 85, 100],
      },
      {
        name: "Produção C",
        data: [60, 80, 70, 90, 85, 100, 95, 110, 105, 120],
      },
    ],
    options: {
      chart: {
        type: "line",
        height: 350,
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
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        categories: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5", "Semana 6", "Semana 7", "Semana 8", "Semana 9", "Semana 10"],
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
      title: {
        text: "Produção",
      },
      legend: {
        position: "bottom",
        offsetY: 0,
        labels: {
          colors: 'B0C4DE',
        },
      },
      tooltip: {
        x: {
          format: "dd/MM",
        },
      },
    },
  };

  return (
    <div className="grid-one-item grid-common grid-c3">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={350}
      />
    </div>
  );
}

export default Report;
