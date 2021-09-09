import React, { useState } from 'react'
import { Button, Card, Drawer, Form, message, List, Space, Upload } from "antd"
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { Link, connect } from "umi"

import CSVChart from "@/components/csv"
import { getToken } from "@/utils/localdb"
import { dateString } from "@/utils/dates"

import styles from "@/pages/index.less"

const UploadForm: React.FC = ({
  visible,
  onClose,
  dispatch,
  code,
}) => {
  const props = {
    name: 'file',
    action: `/api/csvs/upload?code=${code}`,
    headers: {
      token: getToken()
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Drawer
      visible={visible}
      title="上传CSV文件"
      placement={'bottom'}
      onClose={onClose}
    >
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>更新数据</Button>
      </Upload>
    </Drawer>
  );
};

const UpdateCsv: React.FC = ({
  dispatch,
  csv,
}) => {
  const props = {
    name: 'file',
    action: `/api/csvs/upload/${csv.ID}`,
    headers: {
      token: getToken()
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>更新数据</Button>
    </Upload>
  );
};

function page({ csvs, dispatch }) {
  const [modalShow, setModalShow] = useState(false)
  const csvCard = function (csv) {
    return (
      <Card className={styles.articleCard} title={csv.OriginName}>
        <CSVChart content={csv.Content} />
        <Space size="large">
          <a href={csv.Url}>{csv.OriginName}</a>
          <span>{dateString(csv.UpdatedAt)}</span>
          <UpdateCsv csv={csv} />
        </Space>
      </Card>
    )
  }
  return (
    <div className={styles.mainContainer}>
      <h1>XXX</h1>
      <Space>
        <h4>模版文件</h4>
        <Link to="">xx_01.csv</Link>
        <Link to="">xx_02.csv</Link>
        <Link to="">xx_03.csv</Link>
      </Space>
      {/* csv content chart card */}
      <List
        grid={{ gutter: 16, column: 1 }}
        size="large"
        dataSource={csvs.list}
        renderItem={csvCard}
      >
      </List>
      <Button className={styles.addBtn} type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => setModalShow(true)} />
      <UploadForm visible={modalShow} onClose={() => setModalShow(false)} dispatch={dispatch} code={csvs.code} />
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