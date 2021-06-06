import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

function Item ({company}) {
   return (
      <Link  to={`/companies/${company.Code}`}>{company.Name}</Link>
   )
}

function Page({companies}) {
  console.log('companies', companies);
  return (
    <div>
      <h1>Page companies</h1>
      { companies.map(company => <Item key={company.Code} company={company}></Item>) }
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    companies: state.companies.list,
  };
}

export default connect(mapStateToProps)(Page);
