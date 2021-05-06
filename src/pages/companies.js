import React from 'react';
import { connect } from 'dva';
import styles from './companies.css';

function Item ({company}) {
   return (
     <div>
       <p>{company.Name}</p>
     </div>
   )
}

function Page({companies}) {
  console.log('companies', companies);
  return (
    <div>
      <h1>Page companies</h1>
      { companies.map(company => <Item key={company.ID} company={company}></Item>) }
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    companies: state.company.list,
  };
}

export default connect(mapStateToProps)(Page);
