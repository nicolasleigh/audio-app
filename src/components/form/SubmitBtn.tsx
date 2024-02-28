import {useFormikContext} from 'formik';
import React from 'react';
import {Button} from 'react-native';

interface Props {
  title: string;
}

export default function SubmitBtn({title}: Props) {
  const {handleSubmit} = useFormikContext();
  return <Button title={title} onPress={() => handleSubmit()} />;
}
