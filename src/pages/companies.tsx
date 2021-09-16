import React, { useRef, useState } from 'react';
import { Button, Card, message, List, Space, Tooltip, Row, Col, } from 'antd';
import { EditTwoTone, FundTwoTone, HeartTwoTone } from '@ant-design/icons';


import { history, Link } from 'umi';
import { connect } from 'dva';

import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import CompanyQuery from "@/components/company_query"

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

interface Company {
  ID: number,
  Name: string,
  Code: string,
  ArticleCount: number,
  CsvCount: number,
}

// 只能查看自己关注的企业图表信息，避免无意义的对比

import { Drawer } from 'antd';

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
      type: "companies/star",
      payload: { id: value }
    })
  }
  return (
    <Drawer
      visible={visible}
      title="关注企业"
      placement={'bottom'}
      onClose={onClose}
    >
      <Row>
        <Col span={4}>
          <CompanyQuery
            showSearch
            value={value}
            placeholder="选择关联公司"
            onChange={newValue => {
              setValue(newValue);
            }}
            style={{ width: '100%' }}
          />
        </Col>
        <Col span={4}>
          <Button type="primary" htmlType="submit" className={styles.leftM1} onClick={star}>关注</Button>
        </Col>
      </Row>
    </Drawer >
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
                  <Link to={`/companies/${company.ID}/articles`}>{company.ArticleCount}</Link>
                </Tooltip>
              </Space>
            </Col>
            <Col span={12}>
              <Space>
                <FundTwoTone />
                <Tooltip title="跟踪数据">
                  <Link to={`/companies/${company.Code}/csvs`}>{company.CsvCount}</Link>
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
      <SearchForm visible={modalShow} onClose={() => setModalShow(false)} dispatch={dispatch} />
    </div >
  );
}

function mapStateToProps(state) {
  return {
    companies: state.companies
  };
}

export default connect(mapStateToProps)(IndexPage);