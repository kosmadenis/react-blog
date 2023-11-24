import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { type SubmitHandler, useForm, useFieldArray } from 'react-hook-form'

import setFieldErrors from '@/util/forms/set-field-errors'
import type { AppDispatch } from '@/store'
import Form from '@/components/forms/Form'
import TextboxField from '@/components/forms/TextboxField'
import TextboxListField, {
  type TextboxListFieldItem,
} from '@/components/forms/TextboxListField'

import { editArticle } from '../../store/thunks/edit-article'
import { createArticle } from '../../store/thunks/create-article'

import classes from './CreateEditArticleForm.module.scss'

interface FormData {
  title: string
  description: string
  body: string
  tagList: TextboxListFieldItem[]
}

interface Props {
  className?: string
  article?: Model.Article
}

const CreateEditArticleFrom: React.FC<Props> = ({ className, article }) => {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()

  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      title: article?.title,
      description: article?.description,
      body: article?.body,
      tagList: article?.tagList.map((value) => ({ value })),
    },
  })

  const { fields, append, remove } = useFieldArray<FormData>({
    name: 'tagList',
    control,
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const newArticle: Model.BaseArticle = {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tagList.map((obj) => obj.value),
    }

    const action = article
      ? editArticle({ slug: article.slug, article: newArticle })
      : createArticle(newArticle)

    const result = await dispatch(action)

    if (result.status === 'error') {
      setFieldErrors(result.error, setError, [
        'title',
        'description',
        'body',
        'tagList',
      ])
    }

    if (result.status === 'ok') {
      navigate(`/articles/${result.value.slug}`)
    }
  }

  const titleField = register('title', { required: 'Title is required' })
  const descriptionField = register('description', {
    required: 'Description is required',
  })
  const bodyField = register('body', { required: 'Body text is required' })
  const tagFields = fields.map(({ id }, index) => ({
    id,
    register: register(`tagList.${index}.value`, {
      required: 'Tag cannot be empty ',
    }),
  }))

  const onRemoveTag = (index: number) => {
    remove(index)
  }

  const onAddTag = () => {
    append({ value: '' })
  }

  return (
    <Form
      className={className}
      rootError={errors.root}
      submitMessage="Send"
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isSubmitting}
    >
      <TextboxField
        type="text"
        name="Title"
        register={titleField}
        error={errors.title}
      />
      <TextboxField
        type="text"
        name="Short description"
        register={descriptionField}
        error={errors.description}
      />
      <TextboxField
        className={classes.bodyText}
        type="area"
        name="Text"
        register={bodyField}
        error={errors.body}
      />
      <TextboxListField
        title="Tags"
        addText="Add tag"
        type="text"
        placeholder="Tag"
        onRemoveField={onRemoveTag}
        onAddField={onAddTag}
        hookData={tagFields}
        errors={errors.tagList}
      />
    </Form>
  )
}

export default CreateEditArticleFrom
