import React from "react"
import { Card } from "antd"
import { Link } from "umi"

import { dateString } from "@/utils/dates"
import styles from "@/pages/index.less"

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
  const ctitle = `${title(article.Content)} ${dateString(article.CreatedAt)}`
  return(
      <Card title={ctitle} className={styles.articleCard} >
        <article>
          <div className="braft-output-content" dangerouslySetInnerHTML={{ __html: article.Content.substr(0, 100) + "..." }}></div>
          <Link to={`/articles/${article.ID}`}>详情</Link>
        </article>
      </Card>
  )
}

export default ArticleCard