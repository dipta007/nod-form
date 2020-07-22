import React from 'react'
import { Grid, Button, makeStyles } from '@material-ui/core'
import { CSVLink } from 'react-csv'

import { genderOptions, recommendationOptions } from '../../util/options'
import Progress from './Progress'
import TextInput from './TextInput'
import DateInput from './DateInput'
import PhoneInput from './PhoneInput'
import SelectInput from './SelectInput'

const useStyles = makeStyles(theme => ({
  margin: {
    marginBottom: theme.spacing(3)
  },
  noneDisplay: {
    display: 'none'
  }
}))

function Index ({
  onSubmit,
  register,
  errors,
  control,
  setValue,
  progress,
  handleDateError,
  handlePhoneNo,
  values: { recommendation, dob, phone, gender },
  download,
  csvLinkRef
}) {
  const classes = useStyles()
  return (
    <>
      <Progress progress={progress} />
      <form onSubmit={onSubmit}>
        <Grid container direction='column'>
          <TextInput
            id='1'
            name='fname'
            label='First Name'
            register={register}
            error={errors.fname}
            className={classes.margin}
          />

          <TextInput
            id='2'
            name='lname'
            label='Last Name'
            register={register}
            error={errors.lname}
            className={classes.margin}
          />

          <DateInput
            id='3'
            value={dob}
            className={classes.margin}
            setValue={setValue}
            handleError={handleDateError}
            control={control}
          />

          <TextInput
            id='4'
            name='email'
            label='Email'
            register={register}
            error={errors.email}
            className={classes.margin}
            tooltip='The customers primary contact email address'
          />

          <TextInput
            id='5'
            name='address'
            label='Address'
            register={register}
            error={errors.address}
            className={classes.margin}
            tooltip='The customers current residential address'
          />

          <PhoneInput
            id="6"
            className={classes.margin}
            label='Contact Number'
            value={phone}
            control={control}
            error={errors.phone}
            onChange={handlePhoneNo}
          />

          <SelectInput
            id='7'
            name='gender'
            className={classes.margin}
            label='Gender'
            error={errors.gender}
            control={control}
            options={genderOptions}
            value={gender}
          />

          <SelectInput
            id='8'
            name='recommendation'
            className={classes.margin}
            label='Areas of Recommendation'
            error={errors.recommendation}
            control={control}
            options={recommendationOptions}
            multiple
            value={recommendation}
          />

          <Button
            type='submit'
            size='medium'
            color='primary'
            variant='contained'
            disabled={progress !== 100}
          >
            Submit
          </Button>

          {download && (
            <CSVLink
              data={download}
              target='_blank'
              filename='submission.csv'
              separator=','
              ref={csvLinkRef}
              className={classes.noneDisplay}
            >
              Submit
            </CSVLink>
          )}
        </Grid>
      </form>
    </>
  )
}

export default Index
