import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import { Line } from '@ant-design/charts';

const DemoLine: React.FC = ({data}) => {
  data.forEach(profit => profit.YingShou /= 100 )
  var config = {
    data: data,
    padding: 'auto',
    xField: 'Year',
    yField: 'YingShou',
  };
  console.log('config', config)
  return <Line {...config} />
};

function Profit ({profits}) {
  console.log('profits', profits);
   return (
     <section>
       <DemoLine data={profits} />
     </section>
   )
}

function Asset ({company}) {
   return (
      <Link  to={`/companies/${company.ID}`}>{company.Name}</Link>
   )
}

function Crash ({company}) {
   return (
      <Link  to={`/companies/${company.ID}`}>{company.Name}</Link>
   )
}

function Page({company}) {
  console.log('company', company);
  if (!company) {
    return null;
  }
  return (
    <div>
      <h1>{ company.Name }</h1>
      <Profit profits={company.Profits} />
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  console.log('state.company', state.company)
  return {
    loading: state.loading.global,
    company: state.company.current,
  };
}

export default connect(mapStateToProps)(Page);
