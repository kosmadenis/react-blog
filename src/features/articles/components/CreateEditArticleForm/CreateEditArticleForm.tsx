import React from 'react'
import { type SubmitHandler, useForm, useFieldArray } from 'react-hook-form'

import setFieldErrors from '@/util/forms/set-field-errors'
import Form from '@/components/forms/Form'
import TextboxField from '@/components/forms/TextboxField'
import TextboxListField, {
  type TextboxListFieldItem,
} from '@/components/forms/TextboxListField'

import classes from './CreateEditArticleForm.module.scss'

export interface FormData {
  title: string
  description: string
  body: string
  tagList: TextboxListFieldItem[]
}

interface Props {
  className?: string
  title?: string
  description?: string
  body?: string
  tagList?: string[]
  submitAction: (data: FormData) => Promise<null | { error: any }>
}

const CreateEditArticleForm: React.FC<Props> = ({
  className,
  title,
  description,
  body,
  tagList,
  submitAction,
}) => {
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      title,
      description,
      body,
      tagList: tagList?.map((value) => ({ value })),
    },
  })

  const { fields, append, remove } = useFieldArray<FormData>({
    name: 'tagList',
    control,
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result = await submitAction(data)

    if (result) {
      setFieldErrors(result.error, setError, [
        'title',
        'description',
        'body',
        'tagList',
      ])
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

export default CreateEditArticleForm
