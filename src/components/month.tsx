import React from 'react'
// import the core library.
import { Button, Timeline } from 'antd';
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react'

// import components, all suffixed with Component

function getVirtulData(year: string) {
  year = year || '2017';
  var date = +echarts.number.parseDate(year + '-01-01');
  var end = +echarts.number.parseDate((+year + 1) + '-01-01');
  var dayTime = 3600 * 24 * 1000;
  var data = [];
  for (var time = date; time < end; time += dayTime) {
    data.push([
      echarts.format.formatTime('yyyy-MM-dd', time),
      Math.floor(Math.random() * 10)
    ]);
  }
  return data;
}

function Month() {
  const option = {
    title: {
      top: 30,
      left: 'center',
      text: '2020年记录投资笔记'
    },
    tooltip: {},
    visualMap: {
      min: 0,
      max: 10,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: 65
    },
    calendar: {
      top: 120,
      left: 30,
      right: 30,
      cellSize: ['auto', 13],
      range: '2016',
      itemStyle: {
        borderWidth: 0.5
      },
      yearLabel: { show: false }
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: getVirtulData('2016')
    }
  };
  return (
    <section>
      <ReactECharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
      />
    </section>
  )
}

export default Month