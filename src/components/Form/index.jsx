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
  Tooltip,
  Typography
} from '@material-ui/core'
import { Controller } from 'react-hook-form'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { genderOptions, recommendationOptions } from '../../util/options'
import Progress from './Progress'
import MuiPhoneNumber from 'material-ui-phone-number'

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
  values: { recommendation, dob, phone }
}) {
  const classes = useStyles()
  console.log('tcl', errors)
  return (
    <>
      <Progress progress={progress} />
      <form onSubmit={onSubmit}>
        <Grid container direction='column'>
          <TextField
            id='1'
            name='fname'
            label='First Name'
            inputRef={register}
            error={Boolean(errors.fname)}
            helperText={errors.fname && errors.fname.message}
            className={classes.margin}
          />

          <TextField
            id='2'
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
                    id='3'
                    disableFuture
                    autoOk
                    openTo='year'
                    variant='dialogue'
                    format='yyyy-MM-DD'
                    label='Date of Birth'
                    views={['year', 'month', 'date']}
                    value={dob}
                    maxDateMessage='Date can not be on Future'
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
              id='4'
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
              id='5'
              name='address'
              label='Address'
              inputRef={register}
              error={Boolean(errors.address)}
              helperText={errors.address && errors.address.message}
              multiline
              className={classes.margin}
            />
          </Tooltip>

          <FormControl className={classes.margin}>
            <Typography variant='caption' color="textSecondary">Contact Number</Typography>
            <Controller
              as={(
                <MuiPhoneNumber
                  defaultCountry="au"
                  value={phone}
                  onChange={e => setValue('phone', e)}
                />
              )}
              name="phone"
              control={control}
            />
          </FormControl>

          <FormControl className={classes.margin}>
            <InputLabel>Gender</InputLabel>
            <Controller
              as={
                <Select id='7'>
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
                    id='8'
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

          <Button
            type='submit'
            size='medium'
            color='primary'
            variant='contained'
            disabled={progress !== 100}
          >
            Submit
          </Button>
        </Grid>
      </form>
    </>
  )
}

export default Index
