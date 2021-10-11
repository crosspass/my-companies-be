import React, { useState } from 'react'
import { Popover, Button, Col, Modal, Card, Dropdown, Menu, Input, InputNumber, message, List, Radio, Row, Space, Tooltip, Upload } from "antd"
import { AppstoreOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Link, connect } from "umi"
import ReactDataSheet from 'react-datasheet'
import "react-datasheet/lib/react-datasheet.css";
import "@/pages/custom.css";

import CSVChart2 from "@/components/dcvs"
import CsvForm from "@/components/csv_form"
import { dateString } from "@/utils/dates"

import styles from "@/pages/index.less"

function page({ csvs, dispatch }) {
  const [modalShow, setModalShow] = useState(false)
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const cData =  {
    title: '图表主题',
    chartType: 'line',
    data: [
      [
        { readOnly: true, value: '' },
        { value: '数据1' },
        { value: '数据2' },
      ],
      [{ value: "2021.09" }, { value: 1 }, { value: 2 }],
      [{ value: "2021.10" }, { value: 1 }, { value: 4 }],
    ]
  }

  const [chartData, setChartData] = useState(cData)

  const onChange = ( data: {title?:string, chartType?:string, grid?:Array<any>}) => {
    setChartData(data)
  }

  const handleOk = async () => {
    setConfirmLoading(true);
    const data = JSON.stringify(chartData.data)
    await dispatch({
      type: 'csvs/create',
      payload: { code: csvs.code, ...chartData, data},
    })
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const csvCard = function (csv) {
    return (
      <Card className={styles.articleCard} title={csv.OriginName}>
        <CSVChart2 type={csv.chartType} data={csv.data} title={csv.title} />
        <Space size="large">
          <span>{dateString(csv.UpdatedAt)}</span>
          <Button onClick={showModal}>更新图表数据</Button>
        </Space>
      </Card>
    )
  }
  return (
    <div className={styles.mainContainer}>
      <h1>收集的数据</h1>
      {/* csv content chart card */}
      <List
        grid={{ gutter: 16, column: 1 }}
        size="large"
        dataSource={csvs.list}
        renderItem={csvCard}
      >
      </List>
      <Button className={styles.addBtn} type="primary" shape="circle" icon={<PlusOutlined />} onClick={showModal} />
      <Modal
        title="更新图表数据"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
      >
        <CsvForm initValue={chartData} onChange={onChange} />
      </Modal>
    </div>
  )
}


function mapStateToProps(state) {
  console.log("csvs.code", state.csvs.code)
  return {
    csvs: state.csvs
  };
}

export default connect(mapStateToProps)(page);