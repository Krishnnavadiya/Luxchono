import React from 'react'
import Button from '@mui/material/Button';

export default function Buttons(props: any) {
  return (
    <Button  {...props}>{props.text}</Button>
  )
}
