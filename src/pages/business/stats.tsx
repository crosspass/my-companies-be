import React, { useState } from 'react';
import { Link } from 'umi';
import { connect } from 'dva';

import { Button, List } from 'antd';

import styles from '@/pages/index.less';
import Charts from '@/components/business_charts';

function Page({ business }) {
  console.log('business', business);
  if (!business.current) {
    return null;
  }
  const [filter, setFilter] = useState('Q4');
  return (
    <div className={styles.mainContainer}>
      <div className={styles.pT1}>
        <List
          grid={{
            gutter: 4,
            xs: 2,
            sm: 2,
            md: 4,
            lg: 6,
            xl: 16,
            xxl: 16,
          }}
          size="small"
          itemLayout="vertical"
          dataSource={business.current.Companies}
          renderItem={(item) => (
            <Link to={`/companies/${item.Code}/finances`}>{item.Name}</Link>
          )}
        />
      </div>
      <div className={styles.pT1}>
        <Button onClick={() => setFilter('Q4')}>年度</Button>
        <Button onClick={() => setFilter('Q')}>季度</Button>
      </div>
      <Charts stats={business.stats} filter={filter} />
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    business: state.business,
  };
}

export default connect(mapStateToProps)(Page);
