import React from 'react';
import { useState } from 'react'
import { connect } from 'dva';

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import styles from "./index.less"


// 想要在笔记里面展示经营数据， 怎么展示？
// 系统提供各种模版 csv，下载 csv 填充数据后，上传csv， 生产固定格式的数据 
// 按照日期统计， 按照分类统计
// 每个图形，可以提供一个链接， 链接在网站的日志里面
// 数据和关注的公司关联， 公司下面可以上传pdf， word， Excel 等文件, 文件大小做限制
function NewArticle({ dispatch }) {
  const [editorState, updateEditorState] = useState(BraftEditor.createEditorState(null))
  const saveArticle = () => {
    const htmlContent = editorState.toHTML()
    dispatch({
      type: "articles/save",
      payload: htmlContent,
    })
  }
  return (
    <div className={styles.mainContainer}>
      <h1>写点什么吧！</h1>
      <p>
        <BraftEditor
          value={editorState}
          onChange={updateEditorState}
          onSave={saveArticle}
        />
      </p>
    </div>
  )
}


function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(NewArticle);