import React from "react"
import { connect, history, Link } from "umi"
import { DownOutlined } from '@ant-design/icons';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, message, List, Popconfirm, Row, Col, Menu, Dropdown, Tag } from 'antd';

import { dateString } from "@/utils/dates"

import styles from "@/pages/index.less"

function title(content: string): string {
  const match = content.match(/>([^<]+?)</)
  if (match) {
    return match[1]
  }
  return ""
}

function Articles({ articles, dispatch }) {
  const ArticleCard = (article: Article) => {
    if (!article) {
      return null
    }
    const confirm = () => {
      dispatch({
        type: 'articles/delete',
        payload: article.ID
      })
      message.info('删除文章成功！')
    }
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to={`/articles/${article.ID}/edit`}>编辑</Link>
        </Menu.Item>
        <Menu.Item danger>
          <Popconfirm
            title="删除后将存放到暂存箱保留 20 天, 你确定要删除这篇文章？"
            onConfirm={confirm}
            okText="确定"
            cancelText="取消"
          >
            删除
        </Popconfirm>
        </Menu.Item>
      </Menu>
    );
    const dropdown = (
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          操作 <DownOutlined />
        </a>
      </Dropdown>
    )
    const ctitle = `${title(article.Content)} ${dateString(article.CreatedAt)}`
    return (
      <Card title={ctitle} className={styles.articleCard} extra={dropdown} >
        <article>
          <div className="braft-output-content" dangerouslySetInnerHTML={{ __html: article.Content.substr(0, 100) + "..." }}></div>
          <div className={styles.gap}>
            {(article.Companies ||[]).map((company) => {
              return <Tag color="green">{company.Name}</Tag>
            })}
          </div>
          <Link to={`/articles/${article.ID}`}>详情</Link>
        </article>
      </Card>
    )
  }

  return (
    <div className={styles.mainContainer}>
      <Row>
        <Col span={24}>
          <section>
            <List
              size="large"
              split={false}
              dataSource={articles}
              renderItem={ArticleCard}
            >
            </List>
          </section>
        </Col>
      </Row>
      <Button
       className={styles.addBtn}
       type="primary"
       shape="circle"
       icon={<PlusOutlined />}
       onClick={() => history.push("/articles/new")} />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    articles: state.company.articles
  };
}

export default connect(mapStateToProps)(Articles);