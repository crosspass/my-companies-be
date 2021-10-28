import React from 'react';
// import the core library.
import * as echarts from 'echarts';
import ReactECharts from 'echarts-for-react';
import moment from 'moment';

// import components, all suffixed with Component

function getIinitData(year: string) {
  year = year || '2017';
  var date = +echarts.number.parseDate(year + '-01-01');
  var end = +echarts.number.parseDate(+year + 1 + '-01-01');
  var dayTime = 3600 * 24 * 1000;
  var data = [];
  for (var time = date; time < end; time += dayTime) {
    data.push([echarts.format.formatTime('yyyy-MM-dd', time), 0]);
  }
  return data;
}

function Month({
  year,
  stats,
}: {
  year: string;
  stats: Array<{ date: string; count: number }>;
}) {
  const data = getIinitData(year);
  stats.forEach((v) => {
    const index = moment(v.date).dayOfYear() - 1;
    data[index][1] = v.count;
  });
  const option = {
    title: {
      top: 30,
      left: 'center',
      text: `${year}年投资笔记`,
    },
    tooltip: {
      formatter: '{c}',
    },
    visualMap: {
      min: 0,
      max: 5,
      type: 'piecewise',
      orient: 'horizontal',
      left: 'center',
      top: 65,
      inRange: {
        color: ['#feffe6', '#34ed44'],
      },
    },
    calendar: {
      top: 120,
      left: 30,
      right: 30,
      cellSize: ['auto', 13],
      range: year,
      itemStyle: {
        borderWidth: 0.5,
      },
      splitLine: {
        show: false,
      },
      yearLabel: { show: false },
    },
    series: {
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: data,
    },
  };
  return (
    <section>
      <ReactECharts option={option} notMerge={true} lazyUpdate={true} />
    </section>
  );
}

export default Month;
