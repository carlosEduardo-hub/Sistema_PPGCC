import React from "react";
import ReactApexChart from "react-apexcharts";
import "./Cards.css";

const Cards = () => {
  // Dados fictícios para o gráfico de coluna
  const chartData = {
    series: [
      {
        name: "Vendas",
        data: [30, 40, 35, 50, 49, 21, 70, 51, 49, 62],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro"],
      },
      yaxis: {
        title: {
          text: "Vendas",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " unidades";
          },
        },
      },
    },
  };

  return (
    <div className="grid-one-item grid-common grid-c1">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default Cards;
