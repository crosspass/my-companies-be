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

// The usage of ReactEChartsCore are same with above.

function getChartOptions(
  data: any,
  filter: string,
  title: string,
  legends: Array<string>,
  keys: Array<string>,
) {
  const filteredData = data.filter((summary) => {
    return summary.Category.includes(filter);
  });
  let i = -1;
  const series = legends.map((legend) => {
    i += 1;
    return {
      name: legend,
      type: 'line',
      data: filteredData.map((v) => v[keys[i]]),
    };
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
      data: filteredData.map((v) => v.ReportName.substr(0, 4)),
    },
    yAxis: {
      type: 'value',
    },
    series: series,
  };
  return options;
}

function TotalRevenue({ reportSummary, filter }) {
  const options = getChartOptions(
    reportSummary,
    filter,
    '营收',
    ['营业收入', '净利润', '扣非净利润'],
    ['TotalRevenue', 'NetProfitAtsopc', 'NetProfitAfterNrgalAtsolc'],
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

function Increase({
  reportSummary,
  filter,
}: {
  reportSummary: Array<any>;
  filter: string;
}) {
  const annual_summary = reportSummary.filter((summary) => {
    return summary.Category.includes(filter);
  });
  if (reportSummary.length == 0) {
    return null;
  }
  const option = {
    title: {
      text: '增长率',
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
      data: ['营业收入同比增长', '净利润同比增长', '扣非净利润同比增长'],
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
      data: annual_summary.map((v) => v.ReportName.substr(0, 4)),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '营业收入同比增长',
        type: 'line',
        data: annual_summary.map((v) =>
          (+v.TotalRevenueIncrease * 100).toFixed(2),
        ),
      },
      {
        name: '净利润同比增长',
        type: 'line',
        data: annual_summary.map((v) =>
          (+v.NetProfitAtsopcIncrease * 100).toFixed(2),
        ),
      },
      {
        name: '扣非净利润同比增长',
        type: 'line',
        data: annual_summary.map((v) =>
          (+v.NetProfitAfterNrgalAtsolcIncrease * 100).toFixed(2),
        ),
      },
    ],
  };

  return (
    <section className={styles.chart}>
      <ReactEChartsCore
        className={styles.echarts}
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
      />
    </section>
  );
}

function ProfitAbility({ reportSummary, filter }) {
  if (!reportSummary) {
    return null;
  }
  if (reportSummary.length == 0) {
    return null;
  }
  const options = getChartOptions(
    reportSummary,
    filter,
    '盈利能力',
    [
      '净资产收益率',
      '净资产收益率-摊薄',
      '总资产报酬率',
      '人力投入回报率',
      '销售毛利率',
      '销售净利率',
    ],
    [
      'AvgRoe',
      'OreDlt',
      'NetInterestOfTotalAssets',
      'Rop',
      'GrossSellingRate',
      'NetSellingRate)',
    ],
  );

  return (
    <section className={styles.chart}>
      <h1>盈利能力</h1>
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

function OperationAbility({ reportSummary, filter }) {
  const annual_summary = reportSummary.filter((summary) => {
    return summary.Category.includes(filter);
  });
  if (reportSummary.length == 0) {
    return null;
  }
  const option = {
    title: {
      text: '周转天数',
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
      data: [
        '存货周转天数',
        '应收账款周转天数',
        '应付账款周转天数',
        '现金循环周期',
        '营业周期',
      ],
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
      data: annual_summary.map((v) => v.ReportName.substr(0, 4)),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '存货周转天数',
        type: 'line',
        data: annual_summary.map((v) => v.InventoryTurnoverDays),
      },
      {
        name: '应收账款周转天数',
        type: 'line',
        data: annual_summary.map((v) => v.ReceivableTurnoverDays),
      },
      {
        name: '应付账款周转天数',
        type: 'line',
        data: annual_summary.map((v) => v.AccountsPayableTurnoverDays),
      },
      {
        name: '现金循环周期',
        type: 'line',
        data: annual_summary.map((v) => v.CashCycle),
      },
      {
        name: '营业周期',
        type: 'line',
        data: annual_summary.map((v) => v.OperatingCycle),
      },
    ],
  };

  const cycleOption = {
    title: {
      text: '周转率',
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
      data: [
        '总资产周转率',
        '存货周转率',
        '应收账款周转率',
        '应付账款周转率',
        '流动资产周转率',
        '固定资产周转率',
      ],
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
      data: annual_summary.map((v) => v.ReportName.substr(0, 4)),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '总资产周转率',
        type: 'line',
        data: annual_summary.map((v) => v.TotalCapitalTurnover),
      },
      {
        name: '存货周转率',
        type: 'line',
        data: annual_summary.map((v) => v.InventoryTurnover),
      },
      {
        name: '应收账款周转率',
        type: 'line',
        data: annual_summary.map((v) => v.AccountReceivableTurnover),
      },
      {
        name: '应付账款周转率',
        type: 'line',
        data: annual_summary.map((v) => v.AccountsPayableTurnover),
      },
      {
        name: '流动资产周转率',
        type: 'line',
        data: annual_summary.map((v) => v.CurrentAssetTurnoverRate),
      },
      {
        name: '固定资产周转率',
        type: 'line',
        data: annual_summary.map((v) => v.FixedAssetTurnoverRatio),
      },
    ],
  };

  return (
    <section className={styles.chart}>
      <h1>运营能力</h1>
      <ReactEChartsCore
        className={styles.echarts}
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
      />
      <ReactEChartsCore
        className={styles.echarts}
        echarts={echarts}
        option={cycleOption}
        notMerge={true}
        lazyUpdate={true}
      />
    </section>
  );
}

function FinaRisk({ reportSummary, filter }) {
  const annual_summary = reportSummary.filter((summary) => {
    return summary.Category.includes(filter);
  });
  if (reportSummary.length == 0) {
    return null;
  }

  const assetLiabOption = {
    title: {
      text: '资产负债率',
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
      data: ['资产负债率'],
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
      data: annual_summary.map((v) => v.ReportName.substr(0, 4)),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '资产负债率',
        type: 'line',
        data: annual_summary.map((v) => v.AssetLiabRatio),
      },
    ],
  };

  const option = {
    title: {
      text: '财务风险',
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
      data: ['流动比率', '速动比率', '权益乘数', '产权比率', '现金流量比率'],
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
      data: annual_summary.map((v) => v.ReportName.substr(0, 4)),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '流动比率',
        type: 'line',
        data: annual_summary.map((v) => v.CurrentRatio),
      },
      {
        name: '速动比率',
        type: 'line',
        data: annual_summary.map((v) => v.QuickRatio),
      },
      {
        name: '权益乘数',
        type: 'line',
        data: annual_summary.map((v) => v.EquityMultiplier),
      },
      {
        name: '产权比率',
        type: 'line',
        data: annual_summary.map((v) => v.EquityRatio),
      },
      {
        name: '现金流量比率',
        type: 'line',
        data: annual_summary.map((v) => v.NcfFromOaToTotalLiab),
      },
    ],
  };

  return (
    <section className={styles.chart}>
      <h1>财务风险</h1>
      <ReactEChartsCore
        className={styles.echarts}
        echarts={echarts}
        option={assetLiabOption}
        notMerge={true}
        lazyUpdate={true}
      />
      <ReactEChartsCore
        className={styles.echarts}
        echarts={echarts}
        option={option}
        notMerge={true}
        lazyUpdate={true}
      />
    </section>
  );
}

export default function Summary({ summary, filter }) {
  return (
    <section className={styles.articleCard}>
      <TotalRevenue reportSummary={summary} filter={filter} />
      <Increase reportSummary={summary} filter={filter} />
      <ProfitAbility reportSummary={summary} filter={filter} />
      <OperationAbility reportSummary={summary} filter={filter} />
      <FinaRisk reportSummary={summary} filter={filter} />
    </section>
  );
}
