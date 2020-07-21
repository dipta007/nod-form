import React from 'react'
import { FormControl, Typography, FormHelperText } from '@material-ui/core'
import { Controller } from 'react-hook-form'
import MuiPhoneNumber from 'material-ui-phone-number'

function PhoneInput ({
  id,
  className,
  label,
  value,
  onChange,
  control,
  error
}) {
  return (
    <FormControl className={className}>
      <Typography variant='caption' color='textSecondary'>
        {label}
      </Typography>
      <Controller
        render={() => (
          <MuiPhoneNumber
            id={id}
            defaultCountry='au'
            value={value}
            onChange={e => onChange(e)}
          />
        )}
        name='phone'
        control={control}
      />
      {error && error.message && (
        <FormHelperText error>{error.message}</FormHelperText>
      )}
    </FormControl>
  )
}

export default PhoneInput
