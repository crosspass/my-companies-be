import React from 'react';
import { Button, Card, List, Timeline, Row, Col, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import { history, Link } from 'umi';
import { connect } from 'dva';
import 'braft-editor/dist/output.css'

import styles from './index.less';
import { PlusOutlined } from '@ant-design/icons';
import Month from '@/components/month';
import { dateString } from "@/utils/dates"

// 项目的目的： 提升个人投资者的价值投资能力
// 个人投资者真的知道企业的生意
// 要求： 做笔记足够便捷
// 记录点滴，集腋成裘
// 首页展示什么？
// 关注的企业的信息提醒？
// 按照月度，显示写过的投资笔记?
// 企业月度关键数据记录, 生成图表展示?
// 跟踪企业的商业数据
// 用户关注企业   用户  N: ----- :N 企业

interface Article {
  ID: number,
  Content: string,
  CreatedAt: string,
  summary: string,
}

function title(content: string): string {
  const match = content.match(/>([^<]+?)</)
  if (match) {
    return match[1]
  }
  return ""
}


function ArticleCard(article: Article) {
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={`/articles/${article.ID}/edit`}>编辑</Link>
      </Menu.Item>
      <Menu.Item danger>删除</Menu.Item>
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
        <Link to={`/articles/${article.ID}`}>详情</Link>
      </article>
    </Card>
  )
}

function goNewArticle() {
  history.push('/articles/new')
}

function IndexPage({ articles }) {
  console.log("articles", articles)
  return (
    <div className={styles.mainContainer}>
      {/* <-- 写点什么 --!> */}
      {/* 最近 12 个月的笔记 */}

      <Row>
        <Col span={18}>
          <Month />
          <section>
            <List
              size="large"
              split={false}
              dataSource={articles.list}
              renderItem={ArticleCard}
            >
            </List>
          </section>
        </Col>
        <Col span={6}>
          <Timeline className={styles.timeline} >
            <Timeline.Item><Button type="primary">2021</Button></Timeline.Item>
            <Timeline.Item><Button>2020</Button></Timeline.Item>
            <Timeline.Item><Button>2019</Button></Timeline.Item>
            <Timeline.Item><Button>2018</Button></Timeline.Item>
          </Timeline>
          <Button className={styles.addBtn} type="primary" shape="circle" icon={<PlusOutlined />} onClick={goNewArticle} />
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    articles: state.articles
  };
}

export default connect(mapStateToProps)(IndexPage);