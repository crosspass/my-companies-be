import React from "react"
import { connect, history } from "umi"
import { PlusOutlined } from '@ant-design/icons';

import { Button, List, Row, Col } from "antd"

import ArticleCard from "@/components/article_card"

import styles from "@/pages/index.less"

function title(content: string): string {
  const match = content.match(/>([^<]+?)</)
  if (match) {
    return match[1]
  }
  return ""
}

function Articles({ articles, dispatch }) {
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