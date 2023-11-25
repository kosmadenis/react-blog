import React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '@/store'
import type { FetchError } from '@/store/fetch'
import Link from '@/components/elements/Link'
import StatusDisplay from '@/components/widgets/StatusDisplay'
import Card from '@/components/containers/Card'

import { fetchSingleArticle } from '../../store/thunks/fetch-single'
import CreateEditArticleForm from '../../components/CreateEditArticleForm'

import classes from './EditArticle.module.scss'

function createTitle(
  loading: boolean,
  editingNotAllowed: boolean,
  error?: FetchError,
  article?: Model.Article,
) {
  if (loading) {
    return 'Edit article - loading...'
  }

  if (error === 'not-found') {
    return 'Edit article - not found'
  }

  if (error) {
    return 'Edit article - something went wrong...'
  }

  if (editingNotAllowed) {
    return 'Edit article - not allowed'
  }

  if (article) {
    return `Edit article - ${article.title}`
  }

  return 'Edit article'
}

interface Props {}

const EditArticle: React.FC<Props> = () => {
  const { slug } = useParams()

  if (!slug) {
    // Should never happen if routes are set up correctly
    throw new Error("Route doesn't have the required parameter 'slug'")
  }

  const dispatch = useDispatch<AppDispatch>()

  const selfUser = useSelector((state: RootState) => state.user.data?.username)

  const storeLoading = useSelector(
    (state: RootState) => state.articles.single.loading,
  )
  const storeSlug = useSelector(
    (state: RootState) => state.articles.single.params,
  )
  const error = useSelector((state: RootState) => state.articles.single.error)
  const article = useSelector((state: RootState) => state.articles.single.data)

  // Assuming aricle authorship doesn't just change (?)
  const editingNotAllowed =
    !selfUser ||
    (!storeLoading &&
      !error &&
      !!article &&
      article.slug === slug &&
      article.author.username !== selfUser)
  const shouldFetch = slug !== storeSlug && !editingNotAllowed

  const fetchArticle = React.useCallback(async () => {
    dispatch(fetchSingleArticle(slug))
  }, [dispatch, slug])

  React.useEffect(() => {
    if (shouldFetch) {
      fetchArticle()
    }
  }, [fetchArticle, shouldFetch])

  const loading = storeLoading || shouldFetch
  const title = createTitle(loading, editingNotAllowed, error, article)

  const articleElement = !(loading || error || editingNotAllowed) &&
    article && (
      <Card className={classes.card} title="Edit article">
        <CreateEditArticleForm article={article} />
      </Card>
    )

  const statusDisplay = !editingNotAllowed && (loading || error) && (
    <StatusDisplay
      className={classes.center}
      loading={loading}
      error={error}
      entityName="article"
      retry={fetchArticle}
    />
  )

  const notAllowedElement = editingNotAllowed && (
    <div className={classes.notEditable}>
      <h1>You don&apos;t have enough rights to edit this article</h1>
      <Link to={`/articles/${slug}`}>Return to article</Link>
    </div>
  )

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className={classes.layout}>
        {articleElement}
        {statusDisplay}
        {notAllowedElement}
      </div>
    </>
  )
}

export default EditArticle
