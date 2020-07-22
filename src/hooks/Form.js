import React, { useRef } from 'react'
import FormComponent from '../components/Form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import validationSchema from '../util/schema/formSchema'
import { isValidNumber } from 'libphonenumber-js'
import moment from 'moment'

function Form () {
  const defaultValues = {
    fname: '',
    lname: '',
    dob: null,
    email: '',
    address: '',
    phone: '',
    gender: '',
    recommendation: []
  }
  const {
    register,
    handleSubmit,
    watch,
    errors,
    control,
    reset,
    setValue,
    setError,
    clearErrors
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues
  })
  const [download, setDownload] = React.useState(false);
  const csvLinkRef = useRef(null)

  const getProgress = values => {
    const keys = Object.keys(values)
    let completed = 0
    let total = keys.length

    for (let i in keys) {
      const key = keys[i]
      const isItCompleted =
        values[key] && typeof values[key] === 'object'
          ? !!Object.keys(values[key]).length
          : !!values[key]
      const error = !errors[key]
      completed += isItCompleted && error
    }

    return Math.ceil((completed * 100.0) / total)
  }

  const onSubmit = data => {
    const modifiedData = { ...data }
    modifiedData.dob = moment(modifiedData.dob).format("YYYY-MM-DD")
    setDownload([modifiedData])

    setTimeout(() => {
      csvLinkRef.current.link.click();
      setDownload(false)
    })
    reset(defaultValues)
  }

  const values = watch()
  const progress = getProgress(values)

  const handlePhoneNo = phone => {
    setValue('phone', phone)
    if (!isValidNumber(phone)) {
      if (!errors.phone)
        setError('phone', { type: 'manual', message: 'Invalid Phone Number' })
    } else {
      if (errors.phone) clearErrors('phone')
    }
  }

  const handleDateError = err => {
    if (!!err) {
      if (!errors.dob) setError('dob', { type: 'manual', message: err })
    } else {
      if (errors.dob) clearErrors('dob')
    }
  }

  return (
    <FormComponent
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      control={control}
      values={values}
      setValue={setValue}
      progress={progress}
      setError={setError}
      clearErrors={clearErrors}
      handlePhoneNo={handlePhoneNo}
      handleDateError={handleDateError}
      download={download}
      csvLinkRef={csvLinkRef}
    />
  )
}

export default Form
