import {Formik, FormikHelpers} from 'formik';
import React from 'react';

interface Props<T> {
  initialValues: any;
  validationSchema: any;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void;
  children: React.ReactNode;
}

export default function Form({
  initialValues,
  validationSchema,
  onSubmit,
  children,
}: Props<object>) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {children}
    </Formik>
  );
}
