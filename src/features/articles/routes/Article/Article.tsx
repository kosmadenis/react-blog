import React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '@/store'
import type { FetchError } from '@/store/fetch'
import StatusDisplay from '@/components/passive/StatusDisplay'

import ArticleCard from '../../components/ArticleCard'
import { fetchSingleArticle } from '../../store/thunks/fetch-single'

import classes from './Article.module.scss'

function createTitle(
  loading: boolean,
  error?: FetchError,
  article?: Model.Article,
) {
  if (loading) {
    return 'Article - loading...'
  }

  if (error === 'not-found') {
    return 'Article - not found'
  }

  if (error) {
    return 'Article - something went wrong...'
  }

  if (article) {
    return `Article - ${article.title}`
  }

  return 'Article'
}

interface Props {}

const Article: React.FC<Props> = () => {
  const { slug } = useParams()

  if (!slug) {
    // Should never happen if routes are set up correctly
    throw new Error("Route doesn't have the required parameter 'slug'")
  }

  const dispatch = useDispatch<AppDispatch>()

  const storeLoading = useSelector(
    (state: RootState) => state.articles.single.loading,
  )
  const storeSlug = useSelector(
    (state: RootState) => state.articles.single.params,
  )
  const error = useSelector((state: RootState) => state.articles.single.error)
  const article = useSelector((state: RootState) => state.articles.single.data)

  const shouldFetch = slug !== storeSlug

  const fetchArticle = React.useCallback(async () => {
    dispatch(fetchSingleArticle(slug))
  }, [dispatch, slug])

  React.useEffect(() => {
    if (shouldFetch) {
      fetchArticle()
    }
  }, [fetchArticle, shouldFetch])

  const loading = storeLoading || shouldFetch
  const title = createTitle(loading, error, article)

  const articleElement = !(loading || error) && article && (
    <ArticleCard className={classes.article} article={article} full />
  )

  const statusDisplay = (loading || error) && (
    <StatusDisplay
      className={classes.center}
      loading={loading}
      error={error}
      entityName="article"
      retry={fetchArticle}
    />
  )

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className={classes.layout}>
        {articleElement}
        {statusDisplay}
      </div>
    </>
  )
}

export default Article
