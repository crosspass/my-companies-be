import React from 'react';
// import the core library.
import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import charts, all with Chart suffix

import styles from '@/pages/index.less';

export default function Balance({ balances }) {
  const annual_income = balances.filter((balance) => {
    return balance.ReportName.includes('年');
  });
  if (balances.length == 0) {
    return null;
  }

  const totalOption = {
    title: {
      text: '资产合计',
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
        '流动资产合计',
        '非流动资产合计',
        '流动负债合计',
        '非流动负债合计',
        '母公司股东权益合计',
        '少数股东权益',
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
        name: '流动资产合计',
        type: 'line',
        data: annual_income.map((v) => v.TotalCurrentAssets),
      },
      {
        name: '非流动资产合计',
        type: 'line',
        data: annual_income.map((v) => v.TotalNoncurrentAssets),
      },
      {
        name: '流动负债合计',
        type: 'line',
        data: annual_income.map((v) => v.TotalCurrentLiab),
      },
      {
        name: '非流动负债合计',
        type: 'line',
        data: annual_income.map((v) => v.TotalNoncurrentLiab),
      },
      {
        name: '母公司股东权益合计',
        type: 'line',
        data: annual_income.map((v) => v.TotalQuityAtsopc),
      },
      {
        name: '少数股东权益',
        type: 'line',
        data: annual_income.map((v) => v.MinorityEquity),
      },
    ],
  };

  const currentOption = {
    title: {
      text: '流动资产',
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
        '货币资金',
        '交易性金融资产',
        '应收票据及应收账款',
        '预付款项',
        '应收利息',
        '应收股利',
        '其他应收款',
        '存货',
        '合同资产',
        '持有待售的资产',
        '一年内到期的非流动资产',
        '其他流动资产',
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
        name: '货币资金',
        type: 'line',
        data: annual_income.map((v) => v.CurrencyFunds),
      },
      {
        name: '交易性金融资产',
        type: 'line',
        data: annual_income.map((v) => v.TradableFnnclAssets),
      },
      {
        name: '应收票据及应收账款',
        type: 'line',
        data: annual_income.map((v) => v.AccountReceivable),
      },
      {
        name: '预付款项',
        type: 'line',
        data: annual_income.map((v) => v.PrePayment),
      },
      {
        name: '应收利息',
        type: 'line',
        data: annual_income.map((v) => v.InterestReceivable),
      },
      {
        name: '应收股利',
        type: 'line',
        data: annual_income.map((v) => v.DividendReceivable),
      },
      {
        name: '其他应收款',
        type: 'line',
        data: annual_income.map((v) => v.OthrReceivables),
      },
      {
        name: '存货',
        type: 'line',
        data: annual_income.map((v) => v.DtAssets),
      },
      {
        name: '合同资产',
        type: 'line',
        data: annual_income.map((v) => v.MinorityEquity),
      },
      {
        name: '持有待售的资产',
        type: 'line',
        data: annual_income.map((v) => v.ToSaleAsset),
      },
      {
        name: '一年内到期的非流动资产',
        type: 'line',
        data: annual_income.map((v) => v.NcaDueWithinOneYear),
      },
      {
        name: '其他流动资产',
        type: 'line',
        data: annual_income.map((v) => v.OthrCurrentAssets),
      },
    ],
  };

  const nocurrentOption = {
    title: {
      text: '非流动资产',
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
        '长期应收款',
        '长期股权投资',
        '其他权益工具投资',
        '其他非流动金融资产',
        '固定资产合计',
        '在建工程合计',
        '无形资产',
        '商誉',
        '其他非流动资产',
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
        name: '长期应收款',
        type: 'line',
        data: annual_income.map((v) => v.LtReceivable),
      },
      {
        name: '长期股权投资',
        type: 'line',
        data: annual_income.map((v) => v.LtEquityInvest),
      },
      {
        name: '其他权益工具投资',
        type: 'line',
        data: annual_income.map((v) => v.OtherEqInsInvest),
      },
      {
        name: '其他非流动金融资产',
        type: 'line',
        data: annual_income.map((v) => v.OtherIlliquidFnnclAssets),
      },
      {
        name: '固定资产合计',
        type: 'line',
        data: annual_income.map((v) => v.FixedAssetSum),
      },
      {
        name: '在建工程合计',
        type: 'line',
        data: annual_income.map((v) => v.ConstructionInProcessSum),
      },
      {
        name: '无形资产',
        type: 'line',
        data: annual_income.map((v) => v.IntangibleAssets),
      },
      {
        name: '商誉',
        type: 'line',
        data: annual_income.map((v) => v.Goodwill),
      },
      {
        name: '其他非流动资产',
        type: 'line',
        data: annual_income.map((v) => v.OthrNoncurrentAssets),
      },
    ],
  };

  const currentLiabilitiesOption = {
    title: {
      text: '流动负债',
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
        '短期借款',
        '应付票据及应付账款',
        '预收款项',
        '合同负债',
        '应付职工薪酬',
        '一年内到期的非流动负债',
        '其他流动负债',
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
        name: '短期借款',
        type: 'line',
        data: annual_income.map((v) => v.StLoan),
      },
      {
        name: '应付票据及应付账款',
        type: 'line',
        data: annual_income.map((v) => v.AccountsPayable),
      },
      {
        name: '预收款项',
        type: 'line',
        data: annual_income.map((v) => v.PreReceivable),
      },
      {
        name: '合同负债',
        type: 'line',
        data: annual_income.map((v) => v.ContractLiabilities),
      },
      {
        name: '应付职工薪酬',
        type: 'line',
        data: annual_income.map((v) => v.PayrollPayable),
      },
      {
        name: '一年内到期的非流动负债',
        type: 'line',
        data: annual_income.map((v) => v.NoncurrentLiabDueIn1y),
      },
      {
        name: '其他流动负债',
        type: 'line',
        data: annual_income.map((v) => v.OthrCurrentLiab),
      },
    ],
  };

  const nocurrentLiabilitiesOption = {
    title: {
      text: '非流动负债',
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
        '长期借款',
        '应付债券',
        '长期应付款合计',
        '递延所得税负债',
        '递延收益-非流动负债',
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
        name: '长期借款',
        type: 'line',
        data: annual_income.map((v) => v.LtLoan),
      },
      {
        name: '应付债券',
        type: 'line',
        data: annual_income.map((v) => v.BondPayable),
      },
      {
        name: '长期应付款合计',
        type: 'line',
        data: annual_income.map((v) => v.LtPayableSum),
      },
      {
        name: '递延所得税负债',
        type: 'line',
        data: annual_income.map((v) => v.DtLiab),
      },
      {
        name: '递延收益-非流动负债',
        type: 'line',
        data: annual_income.map((v) => v.NoncurrentLiabDi),
      },
    ],
  };

  return (
    <section className={styles.articleCard}>
      <h1>资产负债表</h1>
      <div className={styles.chart}>
        <ReactEChartsCore
          className={styles.echarts}
          echarts={echarts}
          option={totalOption}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      <div className={styles.chart}>
        <ReactEChartsCore
          className={styles.echarts}
          echarts={echarts}
          option={currentOption}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      <div className={styles.chart}>
        <ReactEChartsCore
          className={styles.echarts}
          echarts={echarts}
          option={nocurrentOption}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      <div className={styles.chart}>
        <ReactEChartsCore
          className={styles.echarts}
          echarts={echarts}
          option={currentLiabilitiesOption}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
      <div className={styles.chart}>
        <ReactEChartsCore
          className={styles.echarts}
          echarts={echarts}
          option={nocurrentLiabilitiesOption}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
    </section>
  );
}
