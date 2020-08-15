import React, { useEffect} from 'react'
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { CardElement } from '@stripe/react-stripe-js';


const PaymentForm = ({ checkoutProcessing, allowPayment }) => {
  const { errors, register, setValue } = useFormContext();

  useEffect(() => {
    if (allowPayment)
      register(
        { name: 'stripe' },
        { required: 'Please provide payment details' }
      );
  }, [allowPayment, register]);

  const handleStripeChange = e => setValue('stripe', e);


  return (
    <div>
      <h3>Payment</h3>
      <p>Testing: Use card # 4242 4242 4242 4242 with any valid expiry and CVC code.</p>
      <CardElement
        options={{ hidePostalCode: true }}
        disabled={checkoutProcessing}
        onChange={handleStripeChange}
      />

        {errors.stripe && 
          <ErrorMessage
                  as={<p />}
                  name="stripe"
                  errors={errors}
                />
        }  

      <button 
        type="submit"
        disabled={checkoutProcessing}
        >
        {checkoutProcessing ? 'Processing...' : 'Pay for order'}
        </button>
    </div>
  )
}

export default PaymentForm