import React from 'react';

// import the core library.
import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import charts, all with Chart suffix
import { LineChart } from 'echarts/charts';
// import components, all suffixed with Component
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendPlainComponent,
} from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
  CanvasRenderer,
  // SVGRenderer,
} from 'echarts/renderers';

import styles from '@/pages/index.less';

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendPlainComponent,
  LineChart,
  CanvasRenderer,
]);

function getChartOptions(
  data: Array<any>,
  filter: string,
  title: string,
  key: string,
) {
  console.log('data', data);
  const legends = data.map((company: Array<any>) => {
    return company[0].Name;
  });
  let xData: Array<string> = [];
  const series = data.map((company: Array<any>) => {
    const filteredData = company.filter((summary) => {
      return summary.Category.includes(filter);
    });
    xData =
      xData.length < filteredData.length
        ? filteredData.map((v) => v.ReportName)
        : xData;
    const d = filteredData.map((v) => v[key]);
    return {
      name: company[0].Name,
      type: 'line',
      data: d,
    };
  });

  series.forEach((se) => {
    data = se.data;
    data.push(...new Array(xData.length - se.data.length));
    data.reverse();
  });

  const options = {
    title: {
      text: title,
      textStyle: {
        fontWeight: 'normal',
        fontSize: 16,
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: 40,
      data: legends,
    },
    grid: {
      top: 80,
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xData.reverse(),
    },
    yAxis: {
      type: 'value',
    },
    series: series,
  };
  return options;
}

// The usage of ReactEChartsCore are same with above.
function TotalRevenue({ stats, filter }) {
  if (!stats) {
    return null;
  }

  const options = getChartOptions(stats, filter, '营收', 'TotalRevenue');
  return (
    <section className={styles.chart}>
      <ReactEChartsCore
        className={styles.echarts}
        echarts={echarts}
        option={options}
        notMerge={true}
        lazyUpdate={true}
      />
    </section>
  );
}

// The usage of ReactEChartsCore are same with above.
function Net({ stats, filter }) {
  if (!stats) {
    return null;
  }

  const options = getChartOptions(
    stats,
    filter,
    '扣非净利润',
    'NetProfitAfterNrgalAtsolc',
  );
  return (
    <section className={styles.chart}>
      <ReactEChartsCore
        className={styles.echarts}
        echarts={echarts}
        option={options}
        notMerge={true}
        lazyUpdate={true}
      />
    </section>
  );
}

export default function Charts({ stats, filter }) {
  return (
    <section className={styles.articleCard}>
      <TotalRevenue stats={stats} filter={filter} />
      <Net stats={stats} filter={filter} />
    </section>
  );
}
