import React from 'react'
import clsx from 'clsx'
import { Popconfirm } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import type { AppDispatch } from '@/store'
import Link from '@/components/elements/Link'
import Button from '@/components/elements/Button'

import { deleteArticle } from '../../store/thunks/delete-article'

import classes from './ArticleButtons.module.scss'

interface Props {
  className?: string
  slug: string
}

const ArticleButtons: React.FC<Props> = ({ className, slug }) => {
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()

  const [deletePopupOpen, setDeletePopupOpen] = React.useState(false)
  const [deleteError, setDeleteError] = React.useState(false)

  const openDeletePopup = () => {
    setDeletePopupOpen(true)
  }

  const closeDeletePopup = () => {
    setDeletePopupOpen(false)
  }

  const onDelete = async () => {
    const result = await dispatch(deleteArticle(slug))

    if (result.status === 'ok') {
      navigate('/articles')
    } else {
      setDeleteError(true)
    }
  }

  const popupErrorText = deleteError && (
    <span className={classes.popupError}>Error deleting this article</span>
  )

  return (
    <div className={clsx(className, classes.layout)}>
      <Popconfirm
        title="Are you sure you want to delete this article?"
        description={popupErrorText}
        okText={deleteError ? 'Try again' : 'Yes'}
        cancelText={deleteError ? 'Cancel' : 'No'}
        placement="bottomRight"
        open={deletePopupOpen}
        onConfirm={onDelete}
        onCancel={closeDeletePopup}
      >
        <Button appearance="danger" onClick={openDeletePopup}>
          Delete
        </Button>
      </Popconfirm>
      <Link
        className={classes.editLink}
        to={`/articles/${slug}/edit`}
        appearance="success"
      >
        Edit
      </Link>
    </div>
  )
}

export default ArticleButtons
