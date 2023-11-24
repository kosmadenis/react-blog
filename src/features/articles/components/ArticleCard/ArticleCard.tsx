import React from 'react'
import Markdown from 'react-markdown'

import Card from '@/components/containers/Card'

import ArticleHeader from '../ArticleHeader'
import ArticleMetadata from '../ArticleMetadata'

import classes from './ArticleCard.module.scss'

interface Props {
  className?: string
  article: Model.Article
  full?: boolean
}

const ArticleCard: React.FC<Props> = ({ className, article, full }) => {
  return (
    <Card className={className}>
      <ArticleMetadata
        className={classes.metadata}
        full={full}
        slug={article.slug}
        username={article.author.username}
        date={article.createdAt}
        picture={article.author.image}
      />
      <ArticleHeader
        full={full}
        slug={article.slug}
        title={article.title}
        tagList={article.tagList}
        description={article.description}
        favorited={article.favorited}
        favoritesCount={article.favoritesCount}
      />
      {full && (
        <div className={classes.body}>
          <Markdown>{article.body}</Markdown>
        </div>
      )}
    </Card>
  )
}

export default ArticleCard
