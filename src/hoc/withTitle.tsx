import React from 'react'
import { Helmet } from 'react-helmet-async'

const withTitle =
  <Props,>(title: string, Component: React.ComponentType<Props>) =>
  (props: Props & React.JSX.IntrinsicAttributes) => (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Component {...props} />
    </>
  )

export default withTitle
