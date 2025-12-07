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
  name: Yup.string().min(2, 'Too shirt name').required('Name is required'),
  email: Yup.string().email().required('Email is required'),
  date: Yup.date().required('Date is rquired'),
  comment: Yup.string().max(500, 'Too long'),
});

export default function UserForm() {
  const handleSubmit = (values: UserInfoFormValues, actions: FormikHelpers<UserInfoFormValues>) => {
    console.log('Order data:', values);
    actions.resetForm();
  };
  return (
    <div className={css.formContainer}>
      <h3 className={css.formTitle}>Book your campervan now</h3>
      <p className={css.formText}>Stay connected! We are always ready to help you.</p>
      <Formik
        initialValues={InitialValues}
        onSubmit={handleSubmit}
        validationSchema={UserInfoFormSchema}
      >
        {({ setFieldValue, values }) => (
          <Form className={css.form}>
            <label>
              <Field name="name" type="text" placeholder="Name*" required />
              <ErrorMessage className={css.inputError} component="span" name="name" />
            </label>
            <label>
              <Field name="email" type="email" placeholder="Email*" required />
              <ErrorMessage className={css.inputError} component="span" name="email" />
            </label>
            <DatePicker
              selected={values.date}
              onChange={(value) => setFieldValue('date', value)}
              dateFormat="dd.MM.yyyy"
              placeholderText="Booking date*"
              className={css.dateInput}
              popperPlacement="bottom-start"
              required
            />
            <label>
              <Field as="textarea" name="comment" placeholder="Comment" className={css.comment} />
              <ErrorMessage className={css.inputError} component="span" name="comment" />
            </label>
            <button type="submit" className={css.btn}>
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
