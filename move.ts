import * as echarts from 'echarts/core';

const symbolSize = 20;
const data = [
  [2, 0],
  [10, 5.3],
  [14, 11],
  [24, 9],
  [30, 15],
];

let myChart: echarts.ECharts;

const option = {
  tooltip: {
    triggerOn: 'none',
    formatter: function (params) {
      return (
        'X: ' +
        params.data[0].toFixed(2) +
        '<br>Y: ' +
        params.data[1].toFixed(2)
      );
    },
  },
  grid: {
    top: '8%',
    bottom: '12%',
  },
  xAxis: {
    min: 0,
    max: 30,
    type: 'value',
    axisLine: { onZero: false },
  },
  yAxis: {
    min: 0,
    max: 20,
    type: 'value',
    axisLine: { onZero: false },
  },
  /*dataZoom: [
    {
      type: 'slider',
      xAxisIndex: 0,
      filterMode: 'none'
    },
    {
      type: 'slider',
      yAxisIndex: 0,
      filterMode: 'none'
    },
    {
      type: 'inside',
      xAxisIndex: 0,
      filterMode: 'none'
    },
    {
      type: 'inside',
      yAxisIndex: 0,
      filterMode: 'none'
    }
  ],*/
  series: [
    {
      id: 'a',
      type: 'line',
      smooth: false,
      symbolSize: symbolSize,
      data: data,
    },
  ],
};

function updatePosition() {
  myChart.setOption({
    graphic: data.map(function (item, dataIndex) {
      return {
        position: myChart.convertToPixel('grid', item),
      };
    }),
  });
}

function onPointDragging(dataIndex: number, pos: number[]) {
  data[dataIndex] = myChart.convertFromPixel('grid', pos);
  // Update data
  myChart.setOption({
    series: [
      {
        id: 'a',
        data: data,
      },
    ],
  });
}

export function setChart(chart: echarts.ECharts) {
  console.log('setting', chart.id);
  myChart = chart;
  myChart.setOption(option);

  setTimeout(function () {
    // Add shadow circles (which is not visible) to enable drag.
    myChart.setOption({
      graphic: data.map(function (item, dataIndex) {
        return {
          type: 'circle',
          position: myChart.convertToPixel('grid', item),
          shape: {
            cx: 0,
            cy: 0,
            r: symbolSize / 2,
          },
          invisible: true,
          draggable: true,
          ondrag: function (dx, dy) {
            onPointDragging(dataIndex, [this.x, this.y]);
          },
          z: 100,
        };
      }),
    });
  }, 0);
  window.addEventListener('resize', updatePosition);
  myChart.on('dataZoom', updatePosition);
}
