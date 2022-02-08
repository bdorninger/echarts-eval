// Import stylesheets
import './style.css';
import * as echarts from 'echarts/core';
import { LineChart, LineSeriesOption } from 'echarts/charts';

import {
  TitleComponent,
  // The component types are defined with the suffix ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // Dataset
  DatasetComponent,
  DatasetComponentOption,
  // Built-in transform (filter, sort)
  TransformComponent,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  VisualMapComponentOption,
  MarkAreaComponent,
  MarkLineComponent,
  MarkPointComponent,
  AxisPointerComponent,
  AxisPointerComponentOption,
  DataZoomComponent,
  DataZoomComponentOption,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  GraphicComponent,
  GraphicComponentOption
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';

import { CanvasRenderer } from 'echarts/renderers';
import {
  MarkAreaOption,
  MarkLineOption,
  MarkPointOption,
} from 'echarts/types/dist/shared';
import { setChart } from './move';

type ECOption = echarts.ComposeOption<  
  LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
  | VisualMapComponentOption
  | MarkAreaOption
  | MarkPointOption
  | MarkLineOption
  | AxisPointerComponentOption
  | DataZoomComponentOption
  | GraphicComponentOption
>;

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  VisualMapComponent,
  VisualMapContinuousComponent,
  VisualMapPiecewiseComponent,
  MarkAreaComponent,
  MarkLineComponent,
  MarkPointComponent,
  AxisPointerComponent,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  GraphicComponent
]);

// Write TypeScript code!
const myChartElem: HTMLElement = document.getElementById('mychart');

var myChart = echarts.init(myChartElem);

const option: ECOption = {
  xAxis: [
    {
      id: 'time-axis',
      name: 't',
      type: 'value',
      boundaryGap: false,
      axisLabel: {
        show: true,
        color: '#fe00f0',
        rotate: 25,
      },
      // data: ['A', 'B', 'C', 'D', 'E'],
      // scale: true,
      nameRotate: 0,
      axisPointer: {
        show: true,
      },
    },
    {},
  ],
  yAxis: [
    {
      type: 'value',
      id: 'pressure-y-axis',
      name: 'Pressure',
      nameLocation: 'middle',
      nameGap: 25,
      nameRotate: 90,
      axisPointer: {
        show: true,
      },
    },
  ],
  dataZoom: [
    {
      yAxisId: 'pressure-y-axis',
      // xAxisId: 'time-axis',
      type: 'inside',
      filterMode: 'none',
    },
    {
      xAxisId: 'time-axis',
      type: 'slider',
      filterMode: 'none',
    },
  ],

  visualMap: {
    type: 'piecewise',
    show: false,
    seriesIndex: 0,
    dimension: 0,

    pieces: [
      //{ lt: 0, color: '#3f3' },
      { lt: 5, color: '#44f', symbolSize: 10 },
      {
        gte: 5,
        lt: 10,
        color: '#333',
        symbolSize: 10,
        label: 'muh',
      },
      {
        gte: 10,
        lt: Infinity,
        color: '#f03',
        symbol: 'square',
        symbolSize: 10,
      },
    ],
  },
  series: [
    {
      type: 'line',
      data: [
        [0, 9, 1],
        [5, 21, 0],
        [10, 77, 1] /*{
          value: [10, 77],
          symbol: 'diamond',
          symbolSize: 10,
        },*/,
        [15, 133, 0],
        [20, 150, 1],
      ],
      /*lineStyle: {
        color: '#00ff00',
        type: 'dashed',
        join: 'miter',
        width: 3,
      },*/
      // step: 'middle',
      // smoothMonotone: 'y',
      /*blur: {
        label: 'foo'
      },*/
      markLine: {
        tooltip: {
          show: true,
        },
        name: 'critical',
        label: {
          silent: true,
          tag: 'crit',
          rotate: 20,
        },
        itemStyle: {},
        data: [
          {
            xAxis: 5,
          },
        ],
      },
      /*markPoint: {
        data: [
          {
            name: 'foo',
            symbolSize: 25,
            symbol: 'triangle',
            symbolRotate: 180,
            itemStyle: {
              color: '#0f0',
            },
            //x: 104.5, pixel
            //y: 22,
            xAxis: 6,
            yAxis: 29,
          },
        ],
      },*/
      /* markArea: {
        itemStyle: {
          color: '#f0a',
          opacity: 0.5,
        },
        data: [
          [
            {
              name: 'Highlight',
              itemStyle: {
                color: '#4ff',
              },
              //valueDim: '',
              //valueIndex: 1,
              xAxis: 3,
            },
            {
              // valueDim: '0',
              // valueIndex: 3,
              xAxis: 11,
            },
          ],
          [
            {
              name: 'From 60 to 80',
              yAxis: 90.22,
            },
            {
              yAxis: 108.55,
            },
          ],
        ],
      },*/
      smooth: true,
      smoothMonotone: 'x',
      showAllSymbol: true,
      symbolSize: 10,
    },
    {
      type: 'line',
      silent: true,
      data: [
        [0, 34],
        [2.3, 48],
        [6.6, 66.6],
        [15.6, 55.8],
        [20, 77],
      ],
      lineStyle: {
        color: '#00ff00',
        width: 3,
      },
      step: 'middle',
    },
  ],
};

// myChart.setOption(option);
setChart(myChart);

myChart.on('click', (params) => {
  console.log('clicked', params);
  // params.event.cancelBubble = true;
  params.event.event.stopPropagation();
});

(myChartElem as HTMLDivElement).addEventListener('click', (ev) => {
  console.log('div clk', ev);
});
