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
import Income from '@/components/income';
import Summary from '@/components/summary';
import CashFlow from '@/components/cash_flow';
import Balance from '@/components/balance';

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendPlainComponent,
  LineChart,
  CanvasRenderer,
]);

const App = ({ dispatch, companyId, chart }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log('form values', form.getFieldsValue(true));
    const payload = form.getFieldsValue(true);
    payload['company_id'] = companyId;
    payload['chart'] = chart;

    dispatch({
      type: 'company/createComment',
      payload: payload,
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        点评利润
      </Button>
      <Modal
        title="点评利润表"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="点评利润表" name="content">
            <Input.TextArea rows={10} placeholder="input placeholder" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

function Page({ company }) {
  console.log('company', company);
  const { current } = company;
  if (!company) {
    return null;
  }
  const getChartComments = (chartName: string) => {
    if (company && company.Comments) {
      return company.Comments.filter((v) => v.Chart == chartName);
    } else {
      return [];
    }
  };

  const [filter, setFilter] = useState('Q4');

  return (
    <div className={styles.mainContainer}>
      <Button onClick={() => setFilter('Q4')}>年度</Button>
      <Button onClick={() => setFilter('Q')}>季度</Button>
      <Button onClick={() => setFilter('Q1')}>一季度</Button>
      <Button onClick={() => setFilter('Q ')}>二季度</Button>
      <Button onClick={() => setFilter('Q3')}>三季度</Button>
      <Summary summary={company.reportSummaries} filter={filter} />
      <Income incomes={company.incomes} filter={filter} />
      <CashFlow cashFlows={company.cashFlows} filter={filter} />
      <Balance balances={company.balances} filter={filter} />
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    company: state.company,
  };
}

export default connect(mapStateToProps)(Page);
