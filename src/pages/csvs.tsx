import React, { useState, useReducer } from 'react';
import {
  Popover,
  Button,
  Col,
  Modal,
  Card,
  Dropdown,
  Menu,
  Input,
  InputNumber,
  message,
  List,
  Radio,
  Row,
  Space,
  Tooltip,
  Upload,
} from 'antd';
import {
  AppstoreOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Link, connect } from 'umi';
import '@/pages/custom.css';

import CSVChart2 from '@/components/dcvs';
import CsvForm from '@/components/csv_form';
import { dateString } from '@/utils/dates';

import styles from '@/pages/index.less';

function page({ csvs, dispatch }) {
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const cData = {
    title: '图表主题',
    chartType: 'line',
    data: [
      [{ readOnly: true, value: '' }, { value: '数据1' }, { value: '数据2' }],
      [{ value: '2021.09' }, { value: 1 }, { value: 2 }],
      [{ value: '2021.10' }, { value: 1 }, { value: 4 }],
    ],
  };

  const showModal = () => {
    setState({ visible: true, data: cData });
  };

  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { visible: false, data: cData },
  );

  const onChange = (data: {
    title?: string;
    chartType?: string;
    grid?: Array<any>;
  }) => {
    const newData = { ...state.data, ...data };
    setState({ data: newData });
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let data = state.data.data;
    if (typeof state.data.data == 'object') {
      data = JSON.stringify(state.data.data);
    }
    if (state.data.id) {
      await dispatch({
        type: 'csvs/update',
        payload: { code: csvs.code, ...state.data, data },
      });
    } else {
      await dispatch({
        type: 'csvs/create',
        payload: { code: csvs.code, ...state.data, data },
      });
    }
    setState({ visible: false });
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setState({ visible: false });
  };

  const setUpdateCsv = (csv) => {
    const data = {
      id: csv.ID,
      title: csv.title,
      chartType: csv.chartType,
      data: csv.data,
    };
    setState({
      visible: true,
      data: data,
    });
  };
  const csvCard = function (csv) {
    return (
      <Card className={styles.articleCard}>
        <CSVChart2 type={csv.chartType} data={csv.data} title={csv.title} />
        <Space size="large">
          <span>{dateString(csv.UpdatedAt)}</span>
          <Button onClick={() => setUpdateCsv(csv)}>更新图表数据</Button>
        </Space>
      </Card>
    );
  };
  return (
    <div className={styles.mainContainer}>
      <h1>收集的数据</h1>
      {/* csv content chart card */}
      <List
        grid={{ gutter: 16, column: 1 }}
        size="large"
        dataSource={csvs.list}
        renderItem={csvCard}
      ></List>
      <Button
        className={styles.addBtn}
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        onClick={showModal}
      />
      <Modal
        title="更新图表数据"
        visible={state.visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
      >
        <CsvForm initValue={state.data} onChange={onChange} />
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  console.log('csvs.code', state.csvs.code);
  return {
    csvs: state.csvs,
  };
}

export default connect(mapStateToProps)(page);
