import React from 'react'
import {
  TextField,
  Grid,
  Button,
  makeStyles,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Checkbox,
  Chip,
  Tooltip
} from '@material-ui/core'
import { Controller } from 'react-hook-form'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { genderOptions, recommendationOptions } from '../../util/options'
import Progress from './Progress'

const useStyles = makeStyles(theme => ({
  margin: {
    marginBottom: theme.spacing(3)
  }
}))

function Index ({
  onSubmit,
  register,
  errors,
  control,
  setValue,
  progress,
  values: { recommendation, dob }
}) {
  const classes = useStyles()
  console.log('tcl', errors, progress)
  return (
    <>
      <Progress progress={progress} />
      <form onSubmit={onSubmit}>
        <Grid container direction='column'>
          <TextField
            name='fname'
            label='First Name'
            inputRef={register}
            error={Boolean(errors.fname)}
            helperText={errors.fname && errors.fname.message}
            className={classes.margin}
          />

          <TextField
            name='lname'
            label='Last Name'
            inputRef={register}
            error={Boolean(errors.lname)}
            helperText={errors.lname && errors.lname.message}
            className={classes.margin}
          />

          <FormControl className={classes.margin}>
            <Controller
              as={
                <MuiPickersUtilsProvider utils={MomentUtils}>
                  <KeyboardDatePicker
                    disableFuture
                    autoOk
                    openTo='year'
                    variant='dialogue'
                    format='yyyy-MM-DD'
                    label='Date of Birth'
                    views={['year', 'month', 'date']}
                    value={dob}
                    maxDateMessage="Date should not be on Future"
                    onChange={e => setValue('dob', e)}
                  />
                </MuiPickersUtilsProvider>
              }
              control={control}
              name='dob'
            />
          </FormControl>

          <Tooltip
            arrow
            title='The customers primary contact email address'
            aria-label='The customers primary contact email address'
          >
            <TextField
              name='email'
              label='Email'
              inputRef={register}
              error={Boolean(errors.email)}
              helperText={errors.email && errors.email.message}
              className={classes.margin}
            />
          </Tooltip>

          <Tooltip
            arrow
            title='The customers current residential address'
            aria-label='The customers current residential address'
          >
            <TextField
              name='address'
              label='Address'
              inputRef={register}
              error={Boolean(errors.address)}
              helperText={errors.address && errors.address.message}
              multiline
              className={classes.margin}
            />
          </Tooltip>

          <TextField
            name='phone'
            label='Contact No'
            inputRef={register}
            error={Boolean(errors.phone)}
            helperText={errors.phone && errors.phone.message}
            className={classes.margin}
          />

          <FormControl className={classes.margin}>
            <InputLabel>Gender</InputLabel>
            <Controller
              as={
                <Select>
                  {genderOptions.map(ele => (
                    <MenuItem key={ele.value} value={ele.value}>
                      {ele.label}
                    </MenuItem>
                  ))}
                </Select>
              }
              name='gender'
              control={control}
            />
          </FormControl>

          <Tooltip
            arrow
            title='Select all of the areas that you are providing a recommendation for'
            aria-label='Select all of the areas that you are providing a recommendation for'
          >
            <FormControl className={classes.margin}>
              <InputLabel>Areas of Recommendation</InputLabel>
              <Controller
                as={
                  <Select
                    multiple
                    renderValue={selected => (
                      <div>
                        {selected.map(value => (
                          <Chip key={value} label={value} />
                        ))}
                      </div>
                    )}
                  >
                    {recommendationOptions.map(ele => (
                      <MenuItem value={ele.value} key={ele.value}>
                        <Checkbox
                          checked={recommendation.indexOf(ele.value) !== -1}
                        />
                        {ele.label}
                      </MenuItem>
                    ))}
                  </Select>
                }
                name='recommendation'
                control={control}
              />
            </FormControl>
          </Tooltip>

          <Button type='submit' size='medium' color='primary' variant='contained' disabled={progress !== 100}>
            Submit
          </Button>
        </Grid>
      </form>
    </>
  )
}

export default Index
