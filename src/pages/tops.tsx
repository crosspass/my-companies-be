// Tops
// 根据相关的财务信息进行排序

// 最近 10 年平均净资产收益率排行
// 最近 5 年平均净资产收益率排行
// 最近 3 年平均净资产收益率排行
// 最近 1 年净资产收益率排行
// 最近季度净资产收益率排行

// 最近 10 年平均总资产收益率排行
// 最近 5 年平均总资产收益率排行
// 最近 3 年平均总资产收益率排行
// 最近 1 年总资产收益率排行
// 最近季度总资产收益率排行

// 最近 10 年平均营业收入增量率排行
// 最近 5 年平均营业收入增量率排行
// 最近 3 年平均营业收入增量率排行
// 最近 1 年营业收入增量率排行
// 最近季度营业收入增长率排行

// 查看的是最近稳步增长的公司，或是剔除了大数字的公司

// select company_code, avg(avg_roe) as sum_avg_roe, count(avg_roe) as scount from report_summaries where category = 'Q4' and avg_roe_increase > 0 group by company_code having count(avg_roe) > 10 order by sum_avg_roe desc limit 100;
//  select company_code, avg(avg_roe) as avg_roe, count(avg_roe) as scount from report_summaries where category = 'Q4' and report_date >= 1514649600000 group by company_code having min(avg_roe) > 0 order by avg_roe desc limit 100;
// select company_code, avg(net_interest_of_total_assets), count(*) as count from report_summaries where company_code in (select company_code from report_summaries where category = 'Q4' and report_date >= 1514649600000 group by company_code having min(net_interest_of_total_assets) > 0 order by avg(net_interest_of_total_assets) desc limit 100) group by company_code order by count desc;
// select code, name from companies where code in (select company_code from report_summaries where category = 'Q4' and report_date >= 1514649600000 group by company_code having min(net_interest_of_total_assets) > 0 order by avg(net_interest_of_total_assets) desc limit 100);

// select code, name from companies where code in (select company_code from report_summaries where report_date >= 1514649600000 group by company_code having min(net_interest_of_total_assets) > 0 order by avg(net_interest_of_total_assets) desc limit 100);

import React, { useState } from 'react';
import {
  Button,
  Radio,
  Select,
  Card,
  message,
  List,
  Popconfirm,
  Timeline,
  Row,
  Col,
  Menu,
  Dropdown,
  Tag,
} from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { history, Link } from 'umi';
import { connect } from 'dva';
import 'braft-editor/dist/output.css';

import styles from './index.less';

const { Option } = Select;

function ListItem(item: {
  Code: string;
  Name: string;
  SumNetInterestOfTotalAssets: number;
}) {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Link to={`/companies/${item.Code}/finances`}>{item.Name}</Link>
      </Col>
      <Col span={8} className={styles.topValue}>
        {item.SumNetInterestOfTotalAssets.toFixed(2)}
      </Col>
    </Row>
  );
}

function RoaIncreaseItem(item: {
  Code: string;
  Name: string;
  SumNetInterestOfTotalAssetsIncrease: number;
}) {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Link to={`/companies/${item.Code}/finances`}>{item.Name}</Link>
      </Col>
      <Col span={8} className={styles.topValue}>
        {item.SumNetInterestOfTotalAssetsIncrease.toFixed(2)}
      </Col>
    </Row>
  );
}

function RoeItem(item: { Code: string; Name: string; SumAvgRoe: number }) {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Link to={`/companies/${item.Code}/finances`}>{item.Name}</Link>
      </Col>
      <Col span={8} className={styles.topValue}>
        {item.SumAvgRoe.toFixed(2)}
      </Col>
    </Row>
  );
}

function RoeIncreaseItem(item: {
  Code: string;
  Name: string;
  SumAvgRoeIncrease: number;
}) {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Link to={`/companies/${item.Code}/finances`}>{item.Name}</Link>
      </Col>
      <Col span={8} className={styles.topValue}>
        {item.SumAvgRoeIncrease.toFixed(2)}
      </Col>
    </Row>
  );
}

const options = [];
for (let i = 11; i < 31; i++) {
  options.push({ label: i, value: i });
}

function IndexPage({ tops, dispatch }) {
  const [years, setYears] = useState(1);

  const changeYear = (value) => {
    const params = { years: value };
    setYears(value);
    dispatch({ type: 'tops/fetchRoa', params });
    dispatch({ type: 'tops/fetchRoaIncrease', params });
    dispatch({ type: 'tops/fetchRoe', params });
    dispatch({ type: 'tops/fetchRoeIncrease', params });
  };

  return (
    <div className={styles.mainContainer}>
      {/* <-- 写点什么 --!> */}
      {/* 最近 12 个月的笔记 */}
      <>
        <Radio.Group onChange={(e) => changeYear(e.target.value)} value={years}>
          <Radio.Button value="1">1</Radio.Button>
          <Radio.Button value="2">2</Radio.Button>
          <Radio.Button value="3">3</Radio.Button>
          <Radio.Button value="4">4</Radio.Button>
          <Radio.Button value="5">5</Radio.Button>
          <Radio.Button value="6">6</Radio.Button>
          <Radio.Button value="7">7</Radio.Button>
          <Radio.Button value="8">8</Radio.Button>
          <Radio.Button value="9">9</Radio.Button>
          <Radio.Button value="10">10</Radio.Button>
          <Select
            options={options}
            style={{ width: 80 }}
            onChange={changeYear}
          ></Select>
        </Radio.Group>
      </>
      <Row>
        <Col span={6}>
          <section>
            <List
              header={<div>Roa Top 100</div>}
              split={true}
              dataSource={tops.roas}
              renderItem={ListItem}
            ></List>
          </section>
        </Col>
        <Col span={6}>
          <section>
            <List
              header={<div>Roe Top 100</div>}
              split={true}
              dataSource={tops.roes}
              renderItem={RoeItem}
            ></List>
          </section>
        </Col>
        <Col span={6}>
          <section>
            <List
              header={<div>Roa Increase Top 100</div>}
              split={true}
              dataSource={tops.roaIncreases}
              renderItem={RoaIncreaseItem}
            ></List>
          </section>
        </Col>
        <Col span={6}>
          <section>
            <List
              header={<div>Roe Increase Top 100</div>}
              split={true}
              dataSource={tops.roeIncreases}
              renderItem={RoeIncreaseItem}
            ></List>
          </section>
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    tops: state.tops,
  };
}

export default connect(mapStateToProps)(IndexPage);
