import {useFormikContext} from 'formik';
import React from 'react';
import AppButton from '../../ui/AppButton';

interface Props {
  title: string;
}

export default function SubmitBtn({title}: Props) {
  const {handleSubmit, isSubmitting} = useFormikContext();
  return (
    <AppButton
      busy={isSubmitting}
      title={title}
      onPress={() => handleSubmit()}
    />
  );
}
