import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import 'braft-editor/dist/output.css'

import { Modal, Button, Form, Input } from 'antd';

import styles from './index.less';

function Page({ dispatch, article }) {
  return (
    <div className={styles.mainContainer}>
      <article>
        {article &&
          <div className="braft-output-content" dangerouslySetInnerHTML={{ __html: article.Content }}></div>
        }
      </article>
    </div>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    article: state.articles.current
  };
}

export default connect(mapStateToProps)(Page);
