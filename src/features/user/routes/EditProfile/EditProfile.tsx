import React from 'react'

import Card from '@/components/containers/Card'

import EditProfileForm from '../../components/EditProfileForm'

import classes from './EditProfile.module.scss'

interface Props {}

const EditProfile: React.FC<Props> = () => {
  return (
    <div className={classes.layout}>
      <Card className={classes.card} title="Edit profile">
        <EditProfileForm />
      </Card>
    </div>
  )
}

export default EditProfile
