import React, { useState, useEffect } from 'react';
import { connect } from 'dva';

import { Modal, Button, Form, Input, Radio, Typography } from 'antd';

import styles from '@/pages/index.less';
import Income from '@/components/income';
import Summary from '@/components/summary';
import CashFlow from '@/components/cash_flow';
import Balance from '@/components/balance';

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

const filterOptions = [
  { label: '年度', value: 'Q4' },
  { label: '季度', value: 'Q' },
];

function Page({ company }) {
  console.log('company', company);
  const { current } = company;
  if (!company || !company.current) {
    return null;
  }

  const [filter, setFilter] = useState('Q4');

  const onChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className={styles.mainContainer}>
      <Typography.Title level={2}>{company.current.Name}</Typography.Title>
      <Radio.Group
        options={filterOptions}
        onChange={onChangeFilter}
        value={filter}
        optionType="button"
        buttonStyle="solid"
      />
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
