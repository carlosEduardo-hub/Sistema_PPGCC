import React, { Component } from 'react';
import Chart from 'react-apexcharts'

class Column extends Component {

  constructor(props) {
    super(props);

    this.state = {
        options: {
            chart: {
              type: 'bar',
              height: 400,
              stacked:true,
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
          },
    }
    const filteredDataForChart = selectedInfo.map((info) => ({
        name: info,
        data: selectedYears.map((year) =>
            dataForApexCharts.find((item) => item.nome === info)[year]
        ),
        }));
  }

  render() {

    return (
      <div className="column">
        <Chart options={this.state.options} series={this.state.series} type="bar" width="500" />
      </div>
    );
  }
}

export default Column;