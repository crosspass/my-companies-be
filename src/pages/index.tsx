import React from 'react';
import { Button, Card, List, Timeline, Row, Col } from 'antd';
import styles from './index.less';
import Month from '@/components/month';

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
const articles = [
  {
    title: '光线传媒投资分析',
    created_at: '2021.08.01',
    summary: '光线传媒在 2021 年预计排片： 《阳光姐妹淘》 《革命者》 《坚如磐石》 《狙击手》《5个扑水少年》'
  },
  {
    title: '光线传媒投资分析',
    created_at: '2021.08.01',
    summary: '光线传媒在 2021 年预计排片： 《阳光姐妹淘》 《革命者》 《坚如磐石》 《狙击手》《5个扑水少年》'
  },
  {
    title: '光线传媒投资分析',
    created_at: '2021.08.01',
    summary: '光线传媒在 2021 年预计排片： 《阳光姐妹淘》 《革命者》 《坚如磐石》 《狙击手》《5个扑水少年》'
  },
  {
    title: '光线传媒投资分析',
    created_at: '2021.08.01',
    summary: '光线传媒在 2021 年预计排片： 《阳光姐妹淘》 《革命者》 《坚如磐石》 《狙击手》《5个扑水少年》'
  },
]

interface Article {
  title: string,
  created_at: string,
  summary: string,
}

function ArticleCard(article:Article) {
  const title = `${article.title} ${article.created_at}`
  return (
    <Card title={title} className={styles.articleCard}>
      <article className="film_review">
        <header>
          <p>
            {article.summary}
          </p>
        </header>
      </article>
    </Card>
  )
}

export default function IndexPage() {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.title}>Page index</h1>
      {/* <-- 写点什么 --!> */}
      {/* 最近 12 个月的笔记 */}

      <Row>
        <Col span={18}>
          <Month />
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
        <Col span={6}>
          <Timeline className={styles.timeline} >
            <Timeline.Item><Button type="primary">2021</Button></Timeline.Item>
            <Timeline.Item><Button>2020</Button></Timeline.Item>
            <Timeline.Item><Button>2019</Button></Timeline.Item>
            <Timeline.Item><Button>2018</Button></Timeline.Item>
          </Timeline>
        </Col>
      </Row>

    </div>
  );
}
