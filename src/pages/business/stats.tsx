import React, { useState, useEffect } from 'react';
import { connect } from 'dva';

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

import { Modal, Button, Form, Input, Space } from 'antd';

import styles from '@/pages/index.less';
import Charts from '@/components/business_charts';

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendPlainComponent,
  LineChart,
  CanvasRenderer,
]);

function Page({ business }) {
  console.log('business', business);
  if (!business) {
    return null;
  }
  const [filter, setFilter] = useState('Q4');
  return (
    <div className={styles.mainContainer}>
      <Button onClick={() => setFilter('Q4')}>年度</Button>
      <Button onClick={() => setFilter('Q')}>季度</Button>
      <Button onClick={() => setFilter('Q1')}>一季度</Button>
      <Button onClick={() => setFilter('Q ')}>二季度</Button>
      <Button onClick={() => setFilter('Q3')}>三季度</Button>
      <Charts stats={business.stats} filter={filter} />
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    business: state.business,
  };
}

export default connect(mapStateToProps)(Page);
