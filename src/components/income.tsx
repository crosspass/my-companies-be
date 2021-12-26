import React from 'react';
// import the core library.
import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import charts, all with Chart suffix

import styles from '@/pages/index.less';
import { getChartOptions } from '@/utils/dates';

export default function Income({
  incomes,
  filter,
}: {
  incomes: Array<any>;
  filter: string;
}) {
  if (incomes.length == 0) {
    return null;
  }

  const option = getChartOptions(
    incomes,
    filter,
    '费用',
    ['销售费用', '管理费用', '研发费用', '财务费用'],
    ['SalesFee', 'ManageFee', 'RadCost', 'FinancingExpenses'],
  );

  const optionTotal = getChartOptions(
    incomes,
    filter,
    '营业收入与成本',
    ['营业收入', '总成本', '营业利润', '利润总额', '净利润', '所有者的净利润'],
    [
      'TotalRevenue',
      'OperatingCosts',
      'Op',
      'ProfitTotalAmt',
      'NetProfit',
      'NetProfitAtsopc',
    ],
  );

  const optionTotalProfit = getChartOptions(
    incomes,
    filter,
    '综合总收益',
    ['综合总收益', '归母股东收益', '其他综合收益', '少数股东收益'],
    [
      'TotalCompreIncome',
      'TotalCompreIncomeAtsopc',
      'OthrCompreIncome',
      'DltEarningsPerShare',
    ],
  );

  const optionShare = getChartOptions(
    incomes,
    filter,
    '每股收益',
    ['基本每股收益', '稀释每股收益'],
    ['BasicEps', 'DltEarningsPerShare'],
  );

  return (
    <section className={styles.articleCard}>
      <h1>利润表</h1>
      <div className={styles.chart}>
        <ReactEChartsCore
          className={styles.echarts}
          echarts={echarts}
          option={optionTotal}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      <div className={styles.chart}>
        <ReactEChartsCore
          className={styles.echarts}
          echarts={echarts}
          option={option}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      <div className={styles.chart}>
        <ReactEChartsCore
          className={styles.echarts}
          echarts={echarts}
          option={optionTotalProfit}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      <div className={styles.chart}>
        <ReactEChartsCore
          className={styles.echarts}
          echarts={echarts}
          option={optionShare}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
    </section>
  );
}
