import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import type { AppDispatch } from '@/store'

import { editArticle } from '../../store/thunks/edit-article'
import CreateEditArticleForm, { type FormData } from '../CreateEditArticleForm'

interface Props {
  className?: string
  article: Model.Article
}

const EditArticleWrapper: React.FC<Props> = ({ className, article }) => {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()

  const { slug } = article

  const submitAction = React.useCallback(
    async (data: FormData) => {
      const newArticle: Model.BaseArticle = {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList.map((obj) => obj.value),
      }

      const result = await dispatch(editArticle({ slug, article: newArticle }))

      if (result.status === 'ok') {
        navigate(`/articles/${result.value.slug}`)
      }

      if (result.status === 'error') {
        return result
      }

      return null
    },
    [slug, dispatch, navigate],
  )

  return (
    <CreateEditArticleForm
      className={className}
      submitAction={submitAction}
      title={article.title}
      description={article.description}
      body={article.body}
      tagList={article.tagList}
    />
  )
}

export default EditArticleWrapper
