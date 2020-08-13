import React from 'react';
import { ErrorMessage } from '@hookform/error-message';

function Input({ errors = {}, register, name, ...rest }) {

  return (
    <>
      <input
        name={name}
        ref={register}
        {...rest}
      />
      <ErrorMessage
        as={<p />}
        name={name}
        errors={errors}
      />
    </>
  );
}

export default Input;
