import React from 'react'
import clsx from 'clsx'
import type {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from 'react-hook-form'

import Button from '@/components/active/Button'
import Textbox, {
  type InputAutoComplete,
  type InputType,
} from '@/components/active/Textbox'

import FieldErrorMessage from '../FieldErrorMessage'

import classes from './TextboxListField.module.scss'

// Has to be nested. This is a limitation of the `react-hook-form` lib.
export interface TextboxListFieldItem {
  value: string
}

type HookData = { register: UseFormRegisterReturn<any>; id: string }[]

type Errors = Merge<
  FieldError,
  (Merge<FieldError, FieldErrorsImpl<TextboxListFieldItem>> | undefined)[]
>

interface Props {
  // Styling
  className?: string
  // Text contents
  title?: string
  deleteText?: string
  addText?: string
  // Input fields props
  type: InputType
  autoComplete?: InputAutoComplete
  placeholder?: string
  // Button callbacks
  onRemoveField: (index: number) => void
  onAddField: () => void
  // React Hook Form data
  hookData: HookData
  errors?: Errors
}

const TextboxListField: React.FC<Props> = ({
  className,
  title,
  deleteText = 'Delete',
  addText = 'Add',
  type,
  autoComplete,
  placeholder,
  onRemoveField,
  onAddField,
  hookData,
  errors,
}) => {
  const textFields = hookData.map(({ register, id }, index) => (
    <div key={id} className={classes.field}>
      <Textbox
        className={classes.textbox}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        invalid={!!errors?.[index]}
        register={register}
      />
      <Button
        className={classes.delete}
        appearance="danger"
        onClick={() => onRemoveField(index)}
      >
        {deleteText}
      </Button>
      {index === hookData.length - 1 && (
        <Button
          className={classes.add}
          appearance="info"
          onClick={() => onAddField()}
        >
          {addText}
        </Button>
      )}
      <FieldErrorMessage
        className={classes.error}
        error={errors?.[index]?.value ?? errors?.[index]}
      />
    </div>
  ))

  return (
    <div className={clsx(className, classes.layout)}>
      <span className={classes.title}>{title}</span>
      {textFields.length > 0 ? (
        textFields
      ) : (
        <Button
          className={classes.emptyAdd}
          appearance="info"
          onClick={() => onAddField()}
        >
          {addText}
        </Button>
      )}
    </div>
  )
}

export default TextboxListField
