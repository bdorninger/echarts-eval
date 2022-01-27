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
      const pos = {
        position: myChart.convertToPixel('grid', item),
      };
      console.log(pos);
      return pos;
    }),
  });
}

function onPointDragging(dataIndex: number, pos: number[]) {
  const left = dataIndex === 0 ? -1 : dataIndex - 1;
  const right = dataIndex === data.length - 1 ? -1 : dataIndex + 1;

  const xleft = left < 0 ? 0 : data[left][0];
  const xright = right < 0 ? 30 : data[right][0];

  const newdata = myChart.convertFromPixel('grid', pos);
  // console.log('drag', newdata[0], xleft, xright);
  let boundsHit = false;
  if (newdata[0] < xleft) {
    newdata[0] = xleft;
    boundsHit = true;
  }
  if (newdata[0] > xright) {
    newdata[0] = xright;
    boundsHit = true;
  }

  data[dataIndex] = newdata;
  // Update data
  myChart.setOption({
    series: [
      {
        id: 'a',
        data: data,
      },
    ],
  });

  if (boundsHit) {
    mapDragPoints();
  }
}

function mapDragPoints() {
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
        invisible: false,
        draggable: true,
        ondrag: function (dx, dy) {
          onPointDragging(dataIndex, [this.x, this.y]);
        },
        z: 100,
      };
    }),
  });
}

export function setChart(chart: echarts.ECharts) {
  console.log('setting', chart.id);
  myChart = chart;
  myChart.setOption(option);

  setTimeout(function () {
    // Add shadow circles (which is not visible) to enable drag.
    mapDragPoints();
  }, 0);
  window.addEventListener('resize', updatePosition);
  myChart.on('dataZoom', updatePosition);
}
