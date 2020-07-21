import React from 'react'
import { FormControl } from '@material-ui/core'
import { Controller } from 'react-hook-form'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

function DateInput ({ className, value, id, setValue, handleError, control }) {
  return (
    <FormControl className={className}>
      <Controller
        as={
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              id={id}
              disableFuture
              autoOk
              openTo='year'
              variant='dialogue'
              format='yyyy-MM-DD'
              label='Date of Birth'
              views={['year', 'month', 'date']}
              value={value}
              maxDateMessage='Date can not be on Future'
              onChange={e => setValue('dob', e)}
              onError={e => handleError(e)}
            />
          </MuiPickersUtilsProvider>
        }
        control={control}
        name='dob'
      />
    </FormControl>
  )
}

export default DateInput
