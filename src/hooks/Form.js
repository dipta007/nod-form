import React from 'react'
import FormComponent from '../components/Form'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import validationSchema from '../util/schema/formSchema'

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
    clearErrors,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
    defaultValues
  })

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
      const error = !errors[key];
      completed += isItCompleted && error
    }

    return Math.ceil((completed * 100.0) / total)
  }
  const onSubmit = data => {
    console.log('data', data)
    reset(defaultValues)
  }

  const values = watch()
  const progress = getProgress(values)

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
    />
  )
}

export default Form
