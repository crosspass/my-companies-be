import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import 'braft-editor/dist/output.css'

import { Modal, Button, Form, Input } from 'antd';

import styles from './index.less';

{/* 多种投资笔记的通用模式: 时间流模式 */}
{/* 时间流模式的笔记： 2018 年公司的经营情况......... */}
{/* 时间流模式的笔记： 2019 年公司的经营情况......... */}
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
