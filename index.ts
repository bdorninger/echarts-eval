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
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';

import { CanvasRenderer } from 'echarts/renderers';

type ECOption = echarts.ComposeOption<
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
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
]);

// Write TypeScript code!
const myChartElem: HTMLElement = document.getElementById('mychart');

var myChart = echarts.init(myChartElem);

const option: ECOption = {
  xAxis: {
    axisLabel: {
      show: true,
      color: '#fe00f0',
      rotate: 25
    },
    // scale: true,
    name: 'X',
    nameRotate: 0
  },
  yAxis: {
    name: "Foo",
    nameRotate: 90
  },
  series: [
    {
      data: [
        [3,9],
        [7,21],
        [10, 77],
        [21, 133],
        [30, 150],
      ],
      lineStyle: {
        color: "#00ff00",
        type: 'dashed',
        join: 'miter',
        width: 3
      },      
      // step: 'middle',
      // smoothMonotone: 'y',
      /*blur: {
        label: 'foo'
      },*/
      markPoint: {
        data: [{
          name: 'foo',
          value: 'dd'
        }]
      },
      smooth: 12,      
      showAllSymbol: true,
      type: 'line',
      markLine: {
        name: "moo",
        lineStyle: {
          color: "#aaaaaa"
        }

      }
    },
  ],
};

myChart.setOption(option);
