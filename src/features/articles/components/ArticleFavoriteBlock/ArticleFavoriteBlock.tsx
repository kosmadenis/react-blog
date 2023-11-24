import React from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'

import type { AppDispatch, RootState } from '@/store'

import { toggleFavorite } from '../../store/thunks/toggle-favorite'

import classes from './ArticleFavoriteBlock.module.scss'

interface Props {
  className?: string
  slug: string
  state: boolean
  count: number
}

const ArticleFavoriteBlock: React.FC<Props> = ({
  className,
  slug,
  state,
  count,
}) => {
  const dispatch = useDispatch<AppDispatch>()

  const isSignedIn = useSelector((state: RootState) => !!state.user.data)

  const onChange = (state: boolean) => {
    dispatch(toggleFavorite({ state, slug }))
  }

  return (
    <div className={clsx(className, classes.layout)}>
      <label className={classes.buttonContainer} aria-label="Favorite">
        <input
          className={classes.buttonInput}
          type="checkbox"
          disabled={!isSignedIn}
          checked={isSignedIn && state}
          onChange={(e) => onChange(e.target.checked)}
        />
        <svg
          className={classes.buttonIcon}
          width="16"
          height="14"
          viewBox="0 0 16 14"
        >
          <path d="M8 2.56911C7.26154 1.33835 6.03077 0.476807 4.55385 0.476807C2.46154 0.476807 0.861542 2.07681 0.861542 4.16911C0.861542 8.23065 3.07693 8.84604 8 13.523C12.9231 8.84604 15.1385 8.23065 15.1385 4.16911C15.1385 2.07681 13.5385 0.476807 11.4462 0.476807C9.96923 0.476807 8.73846 1.33835 8 2.56911Z" />
        </svg>
      </label>
      <span className={classes.count}>{count}</span>
    </div>
  )
}

export default ArticleFavoriteBlock
