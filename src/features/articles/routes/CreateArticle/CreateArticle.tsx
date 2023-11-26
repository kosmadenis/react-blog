import React from 'react'

import Card from '@/components/containers/Card'

import CreateArticleWrapper from '../../components/CreateArticleWrapper/CreateArticleWrapper'

import classes from './CreateArticle.module.scss'

interface Props {}

const CreateArticle: React.FC<Props> = () => {
  return (
    <div className={classes.layout}>
      <Card className={classes.card} title="Create new article">
        <CreateArticleWrapper />
      </Card>
    </div>
  )
}

export default CreateArticle
