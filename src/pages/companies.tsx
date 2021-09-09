import React, { useRef, useState } from 'react';
import { Button, Card, message, List, Space, Tooltip, Modal, Popconfirm, Timeline, Row, Col, Menu, Dropdown } from 'antd';
import { EditOutlined, EditTwoTone, FundOutlined, FundTwoTone, HeartOutlined, LikeOutlined, HeartTwoTone } from '@ant-design/icons';


import { history, Link } from 'umi';
import { connect } from 'dva';
import 'braft-editor/dist/output.css'

import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import Month from '@/components/month';
import { dateString } from "@/utils/dates"

// 项目的目的： 提升个人投资者的价值投资能力
// 个人投资者真的知道企业的生意
// 要求： 做笔记足够便捷
// 记录点滴，集腋成裘
// 首页展示什么？
// 关注的企业的信息提醒？
// 按照月度，显示写过的投资笔记?
// 企业月度关键数据记录, 生成图表展示?
// 跟踪企业的商业数据
// 用户关注企业   用户  N: ----- :N 企业

interface Company {
  ID: number,
  Name: string,
  Code: string,
  NoteCount: number,
  CsvCount: number,
}

// 只能查看自己关注的企业图表信息，避免无意义的对比

import { Drawer, Form, Input } from 'antd';
import { Select, Spin } from 'antd';

const { Option } = Select;

interface Values {
  name: string;
}

interface SearchFormProps {
  visible: boolean;
  onClose: () => void;
  dispatch: (playload:any) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  visible,
  onClose,
  dispatch,
}) => {
  const [form] = Form.useForm();
  const search = (values:Values) => {
    console.log("value", values)
    dispatch({
      type: "companies/star",
      payload: values
    })
  }
  return (
    <Drawer
      visible={visible}
      title="关注企业"
      placement={'bottom'}
      onClose={onClose}
    >
      <Form
        form={form}
        layout="inline"
        name="search_company"
        onFinish={search}
      >
        <Form.Item
          name="key"
          rules={[{ required: true, message: '请输入关注的企业' }]}
        >
          {/* 精确查找, 知道企业名称最基本的要求 */}
          <Input placeholder="公司名称或股票代码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">关注</Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

function IndexPage({ companies, dispatch }) {
  const [modalShow, setModalShow] = useState(false)
  const CompanyCard = (company: Company) => {
    const confirm = () => {
      dispatch({
        type: 'companies/unflow',
        payload: company.ID
      })
      message.info('取消关注成功！')
    }
    const ctitle = `${company.Name} (${company.Code})`
    return (
      <List.Item>
        <Card title={<Link to={`/companies/${company.Code}`}>{ctitle} </Link>} extra={<HeartTwoTone twoToneColor="#eb2f96" />}>
          <Row gutter={16}>
            <Col span={12}>
              <Space>
                <EditTwoTone />
                <Tooltip title="笔记数量">
                  <Link to={`/companies/${company.ID}/articles`}>10</Link>
                </Tooltip>
              </Space>
            </Col>
            <Col span={12}>
              <Space>
                <FundTwoTone />
                <Tooltip title="跟踪数据">
                  <Link to={`/companies/${company.Code}/csvs`}>5</Link>
                </Tooltip>
              </Space>
            </Col>
          </Row>
        </Card>
      </List.Item>
    )
  }

  console.log("companies", companies)
  return (
    <div className={styles.mainContainer}>
      {/* 关注所有的公司 */}
      <section>
        <List
          grid={{ gutter: 16, column: 3 }}
          size="large"
          dataSource={companies.list}
          renderItem={CompanyCard}
        >
        </List>
      </section>
      <Button className={styles.addBtn} type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => setModalShow(true)} />
      <SearchForm visible={modalShow} onClose={() => setModalShow(false)} dispatch={dispatch}/>
    </div >
  );
}

function mapStateToProps(state) {
  return {
    companies: state.companies
  };
}

export default connect(mapStateToProps)(IndexPage);