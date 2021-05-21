import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

// import the core library.
import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import charts, all with Chart suffix
import {
  LineChart,
} from 'echarts/charts';
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

import { Modal, Button, Form, Input } from 'antd';

const App = ({dispatch, companyId, chart}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log('form values', form.getFieldsValue(true))
    const payload = form.getFieldsValue(true)
    payload['company_id'] = companyId
    payload['chart'] = chart
   
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
      <Modal title="点评利润表" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form
          layout="vertical"
          form={form}
        >
          <Form.Item label="点评利润表" name="content">
            <Input.TextArea rows={10} placeholder="input placeholder" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

// Register the required components
echarts.use(
  [TitleComponent, TooltipComponent, GridComponent, LegendPlainComponent, LineChart, CanvasRenderer]
);

// The usage of ReactEChartsCore are same with above.

const YingShouLine: React.FC = ({ data }) => {
  const option = {
    title: {
      text: '营收'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['营业收入', '利润']
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
      data: data.map(v => v.Year)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '营业收入',
        type: 'line',
        data: data.map(v => v.YingShou / 100)
      },
      {
        name: '利润',
        type: 'line',
        data: data.map(v => v.LiRun / 100)
      },
      {
        name: '现金净流入',
        type: 'line',
        data: data.map(v => v.LiRun / 100)
      },
    ]
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
    />
  )
};

const LiRunRateChart: React.FC = ({ data }) => {
  const option = {
    title: {
      text: '利润率'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['毛利率', '净利率']
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
      data: data.map(v => v.Year)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '营业收入',
        type: 'line',
        data: data.map(v => v.YingShou / 100)
      },
      {
        name: '利润',
        type: 'line',
        data: data.map(v => v.LiRun / 100)
      },
      {
        name: '现金净流入',
        type: 'line',
        data: data.map(v => v.LiRun / 100)
      },
    ]
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
    />
  )
};

const KuCunChart: React.FC = ({ data }) => {
  const option = {
    title: {
      text: '库存'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['毛利率', '净利率']
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
      data: data.map(v => v.Year)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '营业收入',
        type: 'line',
        data: data.map(v => v.YingShou / 100)
      },
      {
        name: '利润',
        type: 'line',
        data: data.map(v => v.LiRun / 100)
      },
      {
        name: '现金净流入',
        type: 'line',
        data: data.map(v => v.LiRun / 100)
      },
    ]
  };

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      notMerge={true}
      lazyUpdate={true}
    />
  )
};


function Profit({ profits, comments }) {
  console.log('profits', profits);
  console.log('comments', comments);
  return (
    <section>
      <h1>营业收入</h1>
      <YingShouLine data={profits} />
      { comments.length > 0 &&
        <p>{comments.lastItem.Content}</p>
      }
    </section>
  )
}

function Asset({ company }) {
  return (
    <Link to={`/companies/${company.ID}`}>{company.Name}</Link>
  )
}

function Crash({ company }) {
  return (
    <Link to={`/companies/${company.ID}`}>{company.Name}</Link>
  )
}

function Page({ dispatch, company }) {
  console.log('company', company);
  if (!company) {
    return null;
  }
  const getChartComments = (chartName:string) => {
    if (!company) {
      return []
    } else {
      return company.Comments.filter(v => v.Chart == chartName )
    }
  }
  return (
    <div>
      <h1>{company.Name}</h1>
      <Profit profits={company.Profits} comments={getChartComments('Profit')}/>
      <App dispatch={dispatch} companyId={company.ID} chart="Profit"/>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  console.log('state.company', state.company)
  return {
    loading: state.loading.global,
    company: state.company.current,
  };
}

export default connect(mapStateToProps)(Page);
