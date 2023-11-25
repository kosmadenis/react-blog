import React from 'react'
import clsx from 'clsx'

import Link from '@/components/active/Link'

import ArticleFavoriteBlock from '../ArticleFavoriteBlock'

import classes from './ArticleHeader.module.scss'

interface Props {
  className?: string
  full?: boolean
  slug: string
  title: string
  tagList: string[]
  description: string
  favorited: boolean
  favoritesCount: number
}

const ArticleHeader: React.FC<Props> = ({
  className,
  full,
  slug,
  title,
  tagList,
  description,
  favorited,
  favoritesCount,
}) => {
  const tags = tagList.map((tag, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <li className={classes.tag} key={i}>
      {tag}
    </li>
  ))

  return (
    <div className={className}>
      <Link to={`/articles/${slug}`}>
        <h2 className={classes.title}>{title}</h2>
      </Link>
      <ArticleFavoriteBlock
        slug={slug}
        state={favorited}
        count={favoritesCount}
      />
      <ul className={classes.tags}>{tags}</ul>
      <p className={clsx(classes.description, full && classes.descriptionGray)}>
        {description}
      </p>
    </div>
  )
}

export default ArticleHeader
