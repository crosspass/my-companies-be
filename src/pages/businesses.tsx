import React, { useState } from 'react';
import {
  Button,
  Card,
  Form,
  message,
  Input,
  List,
  Space,
  Tooltip,
  Row,
  Col,
} from 'antd';
import { EditTwoTone, FundTwoTone, HeartTwoTone } from '@ant-design/icons';
import { Popconfirm, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';

import { Link } from 'umi';
import { connect } from 'dva';

import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import CompanyQuery from '@/components/company_query';

// Usage of DebounceSelect
interface UserValue {
  ID: number;
  Name: string;
}

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

interface Business {
  ID: number;
  Name: string;
  Description: string;
  Companies: Array<any>;
  CsvCount: number;
  ArticleCount: number;
}

// 只能查看自己关注的企业图表信息，避免无意义的对比

interface SearchFormProps {
  visible: boolean;
  onClose: () => void;
  dispatch: (playload: any) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  visible,
  onClose,
  dispatch,
}) => {
  const [value, setValue] = React.useState<UserValue[]>([]);
  const star = () => {
    dispatch({
      type: 'businesses/star',
      payload: { id: value },
    });
  };
  const onFinish = (values: any) => {
    dispatch({
      type: 'businesses/create',
      payload: values,
    });
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Drawer
      visible={visible}
      title="关注生意"
      width={736}
      placement={'right'}
      onClose={onClose}
    >
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: '生意名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="详情"
          name="description"
          rules={[{ required: true, message: '生意详情' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="选择关联公司"
          name="company_ids"
          rules={[{ required: true, message: '选择公司' }]}
        >
          <CompanyQuery
            showSearch
            value={value}
            mode={'multiple'}
            placeholder="选择关联公司"
            onChange={(newValue) => {
              setValue(newValue);
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 40 }}>
          <Button type="primary" htmlType="submit">
            关注生意
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

function IndexPage({ businesses, dispatch }) {
  const [modalShow, setModalShow] = useState(false);
  const BusinessCard = (business: Business) => {
    const confirm = () => {
      dispatch({
        type: 'business/delete',
        payload: business.ID,
      });
      message.info('删除文章成功！');
    };

    const menu = (
      <Menu>
        <Menu.Item>
          <Link to={`/businesses/${business.ID}/edit`}>编辑</Link>
        </Menu.Item>
        <Menu.Item danger>
          <Popconfirm
            title="你确定要删除这门生意？"
            onConfirm={confirm}
            okText="确定"
            cancelText="取消"
          >
            删除
          </Popconfirm>
        </Menu.Item>
      </Menu>
    );

    const dropdown = (
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          操作 <DownOutlined />
        </a>
      </Dropdown>
    );

    const ctitle = `${business.Name}`;
    return (
      <List.Item>
        <Card
          title={<Link to={`/businesses/${business.ID}/stats`}>{ctitle} </Link>}
          extra={dropdown}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Space>
                <EditTwoTone />
                <Tooltip title="笔记数量">
                  <Link to={`/businesses/${business.ID}/articles`}>
                    {business.ArticleCount}
                  </Link>
                </Tooltip>
              </Space>
            </Col>
            <Col span={12}>
              <Space>
                <FundTwoTone />
                <Tooltip title="跟踪数据">
                  <Link to={`/businesses/${business.ID}/csvs`}>
                    {business.CsvCount}
                  </Link>
                </Tooltip>
              </Space>
            </Col>
          </Row>
        </Card>
      </List.Item>
    );
  };

  console.log('businesses', businesses);
  return (
    <div className={styles.mainContainer}>
      {/* 关注所有的公司 */}
      <section>
        <List
          grid={{ gutter: 16, column: 3 }}
          size="large"
          dataSource={businesses.list}
          renderItem={BusinessCard}
        ></List>
      </section>
      <Button
        className={styles.addBtn}
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
        onClick={() => setModalShow(true)}
      />
      <SearchForm
        visible={modalShow}
        onClose={() => setModalShow(false)}
        dispatch={dispatch}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    businesses: state.businesses,
  };
}

export default connect(mapStateToProps)(IndexPage);
