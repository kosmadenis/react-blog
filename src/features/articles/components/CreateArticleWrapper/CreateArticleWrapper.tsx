import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import type { AppDispatch } from '@/store'

import { createArticle } from '../../store/thunks/create-article'
import CreateEditArticleForm, { type FormData } from '../CreateEditArticleForm'

interface Props {
  className?: string
}

const CreateArticleWrapper: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()

  const submitAction = React.useCallback(
    async (data: FormData) => {
      const newArticle: Model.BaseArticle = {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tagList.map((obj) => obj.value),
      }

      const result = await dispatch(createArticle(newArticle))

      if (result.status === 'ok') {
        navigate(`/articles/${result.value.slug}`)
      }

      if (result.status === 'error') {
        return result
      }

      return null
    },
    [dispatch, navigate],
  )

  return (
    <CreateEditArticleForm className={className} submitAction={submitAction} />
  )
}

export default CreateArticleWrapper
