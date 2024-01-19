import React from "react";
import ReactApexChart from "react-apexcharts";
import "./Budget.css";

const Budget = () => {
  // Dados fictícios para o gráfico de área
  const chartData = {
    series: [
      {
        name: "Despesas A",
        data: [10, 20, 15, 25, 18, 30, 22],
      },
      {
        name: "Despesas B",
        data: [15, 25, 20, 30, 23, 35, 27],
      },
      {
        name: "Despesas C",
        data: [12, 22, 17, 27, 20, 32, 24],
      },
    ],
    options: {
      chart: {
        type: "area",
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
        categories: ["Jan", "Fev", "Mar", "Abr", "Maio", "Jun", "Jul"],
        labels: {
          style: {
            colors: '#B0C4DE',
            fontSize: '10px',
            fontWeight: 'bold',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: '#B0C4DE',
            fontSize: '10px',
            fontWeight: 'bold',
          },
        },
      },
      title: {
        text: "Despesas",
      },
      legend: {
        position: "top",
        offsetY: 0,
        labels: {
          colors: 'B0C4DE',
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
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
    <div className="grid-two-item grid-common grid-c4">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
      />
    </div>
  );
}

export default Budget;

