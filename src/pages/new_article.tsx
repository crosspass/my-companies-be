import React from 'react';
import { useState } from 'react'
import { connect } from 'dva';

import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

import styles from "./index.less"

import { Button, Divider, Select, Spin, Space } from 'antd';
import CompanyQuery from "@/components/company_query"

// Usage of DebounceSelect
interface UserValue {
  label: string;
  value: string;
}

// 想要在笔记里面展示经营数据， 怎么展示？
// 系统提供各种模版 csv，下载 csv 填充数据后，上传csv， 生产固定格式的数据 
// 按照日期统计， 按照分类统计
// 每个图形，可以提供一个链接， 链接在网站的日志里面
// 数据和关注的公司关联， 公司下面可以上传pdf， word， Excel 等文件, 文件大小做限制
function NewArticle({ dispatch }) {
  const [editorState, updateEditorState] = useState(BraftEditor.createEditorState(null))
  const [value, setValue] = React.useState<UserValue[]>([]);
  const saveArticle = () => {
    console.log("click me")
    const htmlContent = editorState.toHTML()
    const rawContent = editorState.toRAW()
    dispatch({
      type: "articles/save",
      payload: { htmlContent, rawContent, company_id: value }
    })
  }
  return (
    <div className={styles.mainContainer}>
      <BraftEditor
        value={editorState}
        onChange={updateEditorState}
      />
      <Divider/>
      <CompanyQuery
        mode="multiple"
        value={value}
        placeholder="选择关联公司"
        onChange={newValue => {
          setValue(newValue);
        }}
        style={{ width: '100%' }}
      />
      <Button type="primary" className={styles.gap} onClick={saveArticle}>保存</Button>
    </div>
  )
}


function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(NewArticle);