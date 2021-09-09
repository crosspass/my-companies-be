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

function parseContent(content:string) {
  let token = "\n"
  if (content.includes("\r\n")) {
    token = "\r\n"
  }
  const datas = content.split(token)
  return datas.map(v => v.split(','))
}

export default function CsvChart({ content }) {
  const datas = parseContent(content)
  const headers = datas.shift()
  const totalOption = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: [headers[1]]
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: datas.map(v=>v[0])
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: headers[1],
        type: 'line',
        data: datas.map(v=>v[1])
      },
    ]
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