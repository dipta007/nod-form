import React from 'react'
import { TextField, Tooltip } from '@material-ui/core'

function TextInput ({
  register,
  error,
  className,
  id,
  name,
  label,
  tooltip = ''
}) {
  const element = (
    <TextField
      id={id}
      name={name}
      label={label}
      inputRef={register}
      error={Boolean(error)}
      helperText={error && error.message}
      className={className}
    />
  )

  let renderedElement = element
  if (tooltip) {
    renderedElement = (
      <Tooltip arrow title={tooltip} aria-label={tooltip}>
        {element}
      </Tooltip>
    )
  }

  return renderedElement
}

export default TextInput
