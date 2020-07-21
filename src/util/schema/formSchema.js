import * as yup from "yup";

const schema = yup.object().shape({
  fname: yup.string().required('First Name is Required'),
  lname: yup.string().required('Last Name is Required'),
  dob: yup.date().max(new Date(), 'Date can not be on Future'),
  email: yup.string().email('Invalid Email Address').required('Email is Required'),
  address: yup.string().required('Address is Required'),
  phone: yup.string().required('Contact Number is Required'),
  gender: yup.string().required('Gender is Required'),
  recommendation: yup.array().of(yup.string()).min(1, 'Area of Recommendation is Required')
});

export default schema;