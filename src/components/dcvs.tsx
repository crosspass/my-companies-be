import React from 'react';
// import the core library.
import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import charts, all with Chart suffix
import {
  LineChart,
} from 'echarts/charts';
// import components, all suffixed with Component

export default function CsvChart({ type, title, data }:{type:string, title: string, data:Array<any>}) {
  if (typeof(data) == "string") {
    data = JSON.parse(data)
  }
  const header = data[0].slice(1)
  const body = data.slice(1)
  const indexs = []
  let stack: string|null = null
  if (type == 'stack') {
    type = 'bar' 
    stack = 'stack'
  }
  for(let i = 1; i <= header.length; i++) {
    indexs.push(i)
  }
  const totalOption = {
    title: {
      text: title 
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: header.map(v => v.value)
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: body.map(v=>v[0].value)
    },
    yAxis: {
      type: 'value'
    },
    series: indexs.map(i => ({
        name: header[i-1].value,
        type: type,
        stack: stack,
        data: body.map(v=>v[i].value)
    }))
  };

  return (
    <section>
      <ReactEChartsCore
        echarts={echarts}
        option={totalOption}
        notMerge={true}
        lazyUpdate={true}
      />
    </section>
  )
}