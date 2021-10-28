import React from 'react';
// import the core library.
import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import charts, all with Chart suffix

import styles from '@/pages/index.less';

export default function CashFlows({ cashFlows }) {
  const annual_income = cashFlows.filter((cashflow) => {
    return cashflow.ReportName.includes('年');
  });
  if (cashFlows.length == 0) {
    return null;
  }

  const oaOption = {
    title: {
      text: '经营活动现金流',
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
        '经营收到的现金',
        '税费返还',
        '收到其他现金',
        '支付商品现金',
        '支付职工现金',
        '支付税费',
        '支付其他现金',
        '现金流量净额',
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
      data: annual_income.map((v) => v.ReportName.substr(0, 4)),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '经营收到的现金',
        type: 'line',
        data: annual_income.map((v) => v.CashReceivedOfSalesService),
      },
      {
        name: '税费返还',
        type: 'line',
        data: annual_income.map((v) => v.RefundOfTaxAndLevies),
      },
      {
        name: '收到其他现金',
        type: 'line',
        data: annual_income.map((v) => v.CashReceivedOfOthrOa),
      },
      {
        name: '支付商品现金',
        type: 'line',
        data: annual_income.map((v) => -v.GoodsBuyAndServiceCashPay),
      },
      {
        name: '支付职工现金',
        type: 'line',
        data: annual_income.map((v) => v.CashPaidToEmployeeEtc),
      },
      {
        name: '支付税费',
        type: 'line',
        data: annual_income.map((v) => -v.PaymentsOfAllTaxes),
      },
      {
        name: '支付其他现金',
        type: 'line',
        data: annual_income.map((v) => v.OthrcashPaidRelatingToOa),
      },
      {
        name: '现金流量净额',
        type: 'line',
        data: annual_income.map((v) => v.NcfFromOa),
      },
    ],
  };

  const iaOption = {
    title: {
      text: '投资活动现金流',
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
        '收回投资',
        '投资收益',
        '处置固定/无形/长期资产',
        '处置子公司',
        '收到其他现金',
        '购买固定/无形/长期资产',
        '投资支付',
        '获取子公司',
        '支付其他',
        '投资活动净额',
      ],
    },
    grid: {
      top: 100,
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: annual_income.map((v) => v.ReportName.substr(0, 4)),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '收回投资',
        type: 'line',
        data: annual_income.map((v) => v.CashReceivedOfDspslInvest),
      },
      {
        name: '投资收益',
        type: 'line',
        data: annual_income.map((v) => v.InvestIncomeCashReceived),
      },
      {
        name: '处置固定/无形/长期资产',
        type: 'line',
        data: annual_income.map((v) => v.NetCashOfDisposalAssets),
      },
      {
        name: '处置子公司',
        type: 'line',
        data: annual_income.map((v) => v.NetCashOfDisposalBranch),
      },
      {
        name: '收到其他现金',
        type: 'line',
        data: annual_income.map((v) => v.CashReceivedOfOthrIa),
      },
      {
        name: '购买固定/无形/长期资产',
        type: 'line',
        data: annual_income.map((v) => -v.CashPaidForAssets),
      },
      {
        name: '投资支付',
        type: 'line',
        data: annual_income.map((v) => -v.InvestPaidCash),
      },
      {
        name: '获取子公司',
        type: 'line',
        data: annual_income.map((v) => -v.NetCashAmtFromBranch),
      },
      {
        name: '支付其他',
        type: 'line',
        data: annual_income.map((v) => -v.OthrcashPaidRelatingToIa),
      },
      {
        name: '投资活动净额',
        type: 'line',
        data: annual_income.map((v) => v.NcfFromIa),
      },
    ],
  };

  const faOption = {
    title: {
      text: '筹资活动现金流',
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
        '吸收投资',
        '取得借款',
        '发行债券',
        '收到其他',
        '偿还债务',
        '分配股利、利润或偿付利息',
        '支付其他',
        '现金流量净额',
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
      data: annual_income.map((v) => v.ReportName.substr(0, 4)),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '吸收投资',
        type: 'line',
        data: annual_income.map((v) => v.CashReceivedOfAbsorbInvest),
      },
      {
        name: '取得借款',
        type: 'line',
        data: annual_income.map((v) => v.CashReceivedOfBorrowing),
      },
      {
        name: '发行债券',
        type: 'line',
        data: annual_income.map((v) => v.CashReceivedFromBondIssue),
      },
      {
        name: '收到其他',
        type: 'line',
        data: annual_income.map((v) => v.CashReceivedOfOthrFa),
      },
      {
        name: '偿还债务',
        type: 'line',
        data: annual_income.map((v) => -v.CashPayForDebt),
      },
      {
        name: '分配股利、利润或偿付利息',
        type: 'line',
        data: annual_income.map((v) => -v.CashPaidOfDistribution),
      },
      {
        name: '支付其他',
        type: 'line',
        data: annual_income.map((v) => -v.OthrcashPaidRelatingToFa),
      },
      {
        name: '现金流量净额',
        type: 'line',
        data: annual_income.map((v) => v.NcfFromFa),
      },
    ],
  };

  const totalOption = {
    title: {
      text: '总现金流',
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
      data: ['现金增加', '期初现金', '期末现金'],
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
      data: annual_income.map((v) => v.ReportName.substr(0, 4)),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '现金增加',
        type: 'line',
        data: annual_income.map((v) => v.NetIncreaseInCce),
      },
      {
        name: '期初现金',
        type: 'line',
        data: annual_income.map((v) => v.InitialBalanceOfCce),
      },
      {
        name: '期末现金',
        type: 'line',
        data: annual_income.map((v) => v.FinalBalanceOfCce),
      },
    ],
  };

  return (
    <section className={styles.articleCard}>
      <h1>现金流量表</h1>
      <div className={styles.chart}>
        <ReactEChartsCore
          className={styles.echarts}
          echarts={echarts}
          option={oaOption}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      <div className={styles.chart}>
        <ReactEChartsCore
          className={styles.echarts}
          echarts={echarts}
          option={iaOption}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      <div className={styles.chart}>
        <ReactEChartsCore
          className={styles.echarts}
          echarts={echarts}
          option={faOption}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      <div className={styles.chart}>
        <ReactEChartsCore
          className={styles.echarts}
          echarts={echarts}
          option={totalOption}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
    </section>
  );
}
