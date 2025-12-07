'use client';

import { useState } from 'react';
import { Field, Formik, FormikHelpers, Form, ErrorMessage } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import css from './UserForm.module.css';
import * as Yup from 'yup';

interface UserInfoFormValues {
  name: string;
  email: string;
  date: Date | null;
  comment?: string;
}

const InitialValues: UserInfoFormValues = {
  name: '',
  email: '',
  date: null,
  comment: '',
};

const UserInfoFormSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too short name').required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  date: Yup.date().nullable().required('Date is required'),
  comment: Yup.string().max(500, 'Too long'),
});

export default function UserForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDateChange = (
    value: Date | null,
    setFieldValue: FormikHelpers<UserInfoFormValues>['setFieldValue']
  ) => {
    setFieldValue('date', value);
  };

  const handleSubmit = (values: UserInfoFormValues, actions: FormikHelpers<UserInfoFormValues>) => {
    actions.setSubmitting(true);

    console.log('Order data:', values);

    setTimeout(() => {
      actions.setSubmitting(false);

      actions.resetForm();

      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1000);
  };

  return (
    <div className={css.formContainer}>
      <h3 className={css.formTitle}>Book your campervan now</h3>
      <p className={css.formText}>Stay connected! We are always ready to help you.</p>

      {isSuccess && (
        <div className={css.successNotification}>Booking confirmed! We will contact you soon.</div>
      )}

      <Formik
        initialValues={InitialValues}
        onSubmit={handleSubmit}
        validationSchema={UserInfoFormSchema}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className={css.form}>
            <label>
              <Field name="name" type="text" placeholder="Name*" />
              <ErrorMessage className={css.inputError} component="span" name="name" />
            </label>
            <label>
              <Field name="email" type="email" placeholder="Email*" />
              <ErrorMessage className={css.inputError} component="span" name="email" />
            </label>

            <DatePicker
              selected={values.date}
              onChange={(value) => handleDateChange(value, setFieldValue)}
              dateFormat="dd.MM.yyyy"
              placeholderText="Booking date*"
              className={css.dateInput}
              popperPlacement="bottom-start"
            />
            <ErrorMessage className={css.inputError} component="span" name="date" />

            <label>
              <Field as="textarea" name="comment" placeholder="Comment" className={css.comment} />
              <ErrorMessage className={css.inputError} component="span" name="comment" />
            </label>

            <button type="submit" className={css.btn} disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
