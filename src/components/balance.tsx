import React from 'react';
// import the core library.
import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import charts, all with Chart suffix

import styles from '@/pages/index.less';
import { getChartOptions } from '@/utils/dates';

export default function Balance({
  balances,
  filter,
}: {
  balances: Array<any>;
  filter: string;
}) {
  if (balances.length == 0) {
    return null;
  }
  const totalOption = getChartOptions(
    balances,
    filter,
    '资产合计',
    [
      '流动资产合计',
      '非流动资产合计',
      '流动负债合计',
      '非流动负债合计',
      '母公司股东权益合计',
      '少数股东权益',
    ],
    [
      'TotalCurrentAssets',
      'TotalNoncurrentAssets',
      'TotalCurrentLiab',
      'TotalNoncurrentLiab',
      'TotalQuityAtsopc',
      'MinorityEquity',
    ],
  );

  const currentOption = getChartOptions(
    balances,
    filter,
    '流动资产',
    [
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
    [
      'CurrencyFunds',
      'TradableFnnclAssets',
      'AccountReceivable',
      'PrePayment',
      'InterestReceivable',
      'DividendReceivable',
      'OthrReceivables',
      'DtAssets',
      'MinorityEquity',
      'ToSaleAsset',
      'NcaDueWithinOneYear',
      'OthrCurrentAssets',
    ],
  );

  const nocurrentOption = getChartOptions(
    balances,
    filter,
    '非流动资产',
    [
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
    [
      'LtReceivable',
      'LtEquityInvest',
      'OtherEqInsInvest',
      'OtherIlliquidFnnclAssets',
      'FixedAssetSum',
      'ConstructionInProcessSum',
      'IntangibleAssets',
      'Goodwill',
      'OthrNoncurrentAssets',
    ],
  );

  const currentLiabilitiesOption = getChartOptions(
    balances,
    filter,
    '流动负债',
    [
      '短期借款',
      '应付票据及应付账款',
      '预收款项',
      '合同负债',
      '应付职工薪酬',
      '一年内到期的非流动负债',
      '其他流动负债',
    ],
    [
      'StLoan',
      'AccountsPayable',
      'PreReceivable',
      'ContractLiabilities',
      'PayrollPayable',
      'NoncurrentLiabDueIn1y',
      'OthrCurrentLiab',
    ],
  );

  const nocurrentLiabilitiesOption = getChartOptions(
    balances,
    filter,
    '非流负债',
    [
      '长期借款',
      '应付债券',
      '长期应付款合计',
      '递延所得税负债',
      '递延收益-非流动负债',
    ],
    ['LtLoan', 'BondPayable', 'LtPayableSum', 'DtLiab', 'NoncurrentLiabDi'],
  );

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
