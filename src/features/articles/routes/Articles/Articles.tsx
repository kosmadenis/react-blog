import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from 'antd'

import type { AppDispatch, RootState } from '@/store'
import StatusDisplay from '@/components/passive/StatusDisplay'

import ArticleCard from '../../components/ArticleCard'
import { fetchArticlesList } from '../../store/thunks/fetch-list'

import classes from './Articles.module.scss'

function createTitle(loading: boolean, hasError: boolean, page: number) {
  if (loading) {
    return 'Articles - loading...'
  }

  if (hasError) {
    return 'Articles - something went wrong...'
  }

  return `Articles - page ${page}`
}

function parsePage(searchParams: URLSearchParams) {
  const value = searchParams.get('page')

  if (typeof value !== 'string') {
    return null
  }

  const number = Number.parseInt(value, 10)

  if (!Number.isFinite(number) || number < 1) {
    return null
  }

  return number
}

interface Props {}

const Articles: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // Query params fix-up
  React.useEffect(() => {
    if (parsePage(searchParams) === null) {
      setSearchParams(
        (params) => {
          params.set('page', '1')
          return params
        },
        {
          replace: true,
          preventScrollReset: true,
        },
      )
    }
  }, [searchParams, setSearchParams])

  const dispatch = useDispatch<AppDispatch>()

  const perPage = useSelector((state: RootState) => state.articles.list.perPage)
  const storeLoading = useSelector(
    (state: RootState) => state.articles.list.loading,
  )
  const storePage = useSelector(
    (state: RootState) => state.articles.list.params?.page,
  )
  const fetchedPerPage = useSelector(
    (state: RootState) => state.articles.list.params?.perPage,
  )
  const error = useSelector((state: RootState) => state.articles.list.error)
  const articles = useSelector(
    (state: RootState) => state.articles.list.data?.articles,
  )
  const total = useSelector(
    (state: RootState) => state.articles.list.data?.articlesCount,
  )

  const page = parsePage(searchParams) ?? 1
  const shouldFetch = page !== storePage || perPage !== fetchedPerPage

  const fetchArticles = React.useCallback(async () => {
    dispatch(fetchArticlesList({ page, perPage }))
  }, [dispatch, page, perPage])

  React.useEffect(() => {
    if (shouldFetch) {
      fetchArticles()
    }
  }, [fetchArticles, shouldFetch])

  const withPagination = (total ?? 0) > 5
  const loading = storeLoading || shouldFetch
  const title = createTitle(loading, !!error, page)

  const articlesElement = !(loading || error) && articles && (
    <ul className={classes.list}>
      {articles.map((article) => (
        <li key={article.slug}>
          <ArticleCard className={classes.article} article={article} />
        </li>
      ))}
    </ul>
  )

  const statusDisplay = (loading || error) && (
    <StatusDisplay
      className={classes.center}
      loading={loading}
      error={error}
      entityName="articles"
      retry={fetchArticles}
    />
  )

  const pagination = withPagination && (
    <Pagination
      className={classes.pagination}
      pageSize={perPage}
      current={page}
      total={total}
      showSizeChanger={false}
      onChange={(newPage) =>
        setSearchParams((params) => {
          params.set('page', newPage.toString())
          return params
        })
      }
    />
  )

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <div className={classes.layout}>
        {articlesElement}
        {statusDisplay}
        {pagination}
      </div>
    </>
  )
}

export default Articles
