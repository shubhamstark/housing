import React from 'react'
import { Description } from './components/description'
import Form from './components/form'

export const AbstractForm = () => {
  return (
    <div>
      <img
        src="https://iuc-website-abstracts-fall-pts-2022.s3.us-east-2.amazonaws.com/PTS_logo_72_RGB.jpg"
        alt="new"
        style={{height:100}}
      />
      <Description />
      <Form />
    </div>
  )
}
