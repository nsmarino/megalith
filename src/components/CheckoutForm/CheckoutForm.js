import React, { useState } from 'react';
import { useMutation } from 'graphql-hooks';

import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from 'react-use-cart';
import { useForm, FormProvider } from 'react-hook-form'

import BillingForm from './BillingForm';
import PaymentForm from './PaymentForm';
import ShippingForm from './ShippingForm';

const TotalInfo = ({ subtotal, tax, shipping }) => {
  return (
    <div>
      <p>Sub total: ${ (subtotal / 100).toFixed(2) }</p>
      <p>Tax: ${tax}</p>
      <p>Shipping: ${shipping}</p>
      <p>Total: ${((subtotal/100) + tax + shipping).toFixed(2)}</p>
    </div>
  )
}

const CALCULATE_MUTATION = `mutation estimateOrderCosts($input: EstimateOrderCostsInput!) {
  estimateOrderCosts(
    input: $input
  ) {
    currency
    shippingRate
    taxRate
    vatRate
  }
}`
// const CHECKOUT_MUTATION = ''
// const PAYMENT_INTENT_MUTATION = ''

const CheckoutForm = () => {
    const [separateBilling, setSeparateBilling] = useState(false)
    const [allowPayment, setAllowPayment] = useState(false)
    const [shippingRate, setShippingRate] = useState(0)
    const [tax, setTax] = useState(0)


    const [estimateOrderCosts] = useMutation(CALCULATE_MUTATION);
    // const [checkout] = useMutation(CHECKOUT_MUTATION);
    // const [createPaymentIntent] = useMutation(PAYMENT_INTENT_MUTATION);

    const stripe = useStripe();
    const elements = useElements();
    const { emptyCart, items, cartTotal } = useCart();

    const methods = useForm();


    // FUNCTION JUNCTION:
    const submitOrder = () => console.log('submit order')

    const calculateOrderCosts = async ({ shipping }) => {
      const printfulSyncVariants = items.map(item => {return { sync_variant_id: item.id, quantity: item.quantity}})
      const input = {
        recipient: shipping,
        items: printfulSyncVariants,
      }

      const { data } = await estimateOrderCosts({ variables: { input }})
      const { estimateOrderCosts: {
        shippingRate, taxRate, vatRate
      }} = data

      setTax(taxRate + vatRate)
      setShippingRate(shippingRate)
    }



    return (
    <>
      <TotalInfo subtotal={cartTotal} shipping={shippingRate} tax={tax} />

  <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(
          allowPayment ? submitOrder : calculateOrderCosts
        )}>
        <ShippingForm separateBilling={separateBilling} handleChange={() => setSeparateBilling(!separateBilling)} />
        {separateBilling && <BillingForm />}
        <PaymentForm />
      </form> 
  </FormProvider> 

      </>  
    )
}

export default CheckoutForm

// tasks for 8/12:
// 1. install react-hook-form and set up
// 2. focus only on ShippingForm component refer to UI of sample site while creating parts of form using react-hook-form
//   -- consider making Input and Select react components. Gatsby is just a way to write React. Think in components!
// 3. Once satisfied with logged submissions from handleSubmit of just the ShippingForm, do the same for BillingForm.
// 4. Complete PaymentForm using react-hook-form and Stripe.
// 5. Once the forms are complete and submission logs the person's info and the cart info, determine exact format for backend.
// 6. First ShippingForm will be submitted, which will use EstimateCosts API from Printful.
// 7. Find out what Printful API needs, then read up on how to handle a mutation on backend. Use dummy data to test the call to the Printful API.
// 8. Write a mutation in the frontend that matches the mutation in the backend.
// 9. Once the estimate cost mutation hook has been completed, it will be easier to understand how to do the other ones.
// 10. Use Stripe and Printful API to complete order:
  // a. Draft order
  // b. Estimate order costs
  // c. Use total to create payment intent on server -- or should paymentIntent be drawn directly from Printful API?
  // d. Send client_secret from payment intent to client so payment can be made to Stripe
  // e. Confirm order via webhook once charge is successful (not a mutation -- POST to express endpoint)
// 11. Create handlers for success and failure. Think about implementing a checkout context to manage state more easily.