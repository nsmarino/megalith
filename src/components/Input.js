import React from 'react';
import { ErrorMessage } from '@hookform/error-message';

function Input({ errors = {}, register, name, cy, ...rest }) {

  return (
    <>
      <input
        name={name}
        ref={register}
        data-cy={cy}
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
