import React from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
  Tooltip,
  Chip,
  Checkbox
} from '@material-ui/core'
import { Controller } from 'react-hook-form'

function SelectInput ({
  id,
  name,
  className,
  label,
  error,
  control,
  options = [],
  value,
  multiple = false,
  tooltip = ''
}) {
  const selectedRendered = (selected, multiple) => {
    return multiple ? (
      <div>
        {selected.map(value => (
          <Chip key={value} label={value} />
        ))}
      </div>
    ) : (
      <div>{selected}</div>
    )
  }

  const optionRenderer = options.map(ele => (
    <MenuItem key={ele.value} value={ele.value}>
      {multiple && <Checkbox checked={value.indexOf(ele.value) !== -1} />}
      {ele.label}
    </MenuItem>
  ))

  const element = (
    <FormControl className={className}>
      <InputLabel>{label}</InputLabel>
      <Controller
        as={
          <Select
            id={id}
            error={Boolean(error)}
            multiple={multiple}
            renderValue={selected => selectedRendered(selected, multiple)}
          >
            {optionRenderer}
          </Select>
        }
        name={name}
        control={control}
      />
      {error && error.message && (
        <FormHelperText error>{error.message}</FormHelperText>
      )}
    </FormControl>
  )

  let renderedElement = element
  if (tooltip) {
    renderedElement = (
      <Tooltip arrow title={tooltip} aria-label={tooltip}>
        {renderedElement}
      </Tooltip>
    )
  }

  return renderedElement
}

export default SelectInput
