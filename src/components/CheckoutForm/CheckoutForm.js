import React, { useState } from 'react';
import { navigate } from 'gatsby';
import styled from '@emotion/styled'

import { useMutation } from 'graphql-hooks';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from 'react-use-cart';
import { useForm, FormProvider } from 'react-hook-form'

import BillingForm from './BillingForm';
import PaymentForm from './PaymentForm';
import ShippingForm from './ShippingForm';
import OrderInfo from './OrderInfo';

const StyledForm = styled.form`
  h3 {
    font-weight: 400;
    font-size: 2rem;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }

  input {

    border: 1px solid black;
    margin-bottom: 0.25rem;
    margin-top: 0.25rem;
    display: block;
    height: 2rem;
    width: 20rem;
  }

  input::-webkit-input-placeholder { 
    font-style: italic;
  }
  input::-moz-placeholder { 
    font-style: italic;
  }
  input:-ms-input-placeholder { 
    font-style: italic;
  }
  input:-moz-placeholder { 
    font-style: italic;
  }
`
const StyledCheckoutContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

// Mutations:
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
const CHECKOUT_MUTATION = `mutation checkout($input: CheckoutInput!) {
  checkout(
    input: $input
  ) {
    printfulOrderId
    orderTotal
  }
}`

const PAYMENT_INTENT_MUTATION = `mutation createPaymentIntent($input: PaymentIntentInput!) {
  createPaymentIntent(
    input: $input
  ) {
    id
    clientSecret
    status
  }
}`

const CheckoutForm = () => {
 
// Checkout state:
    const [checkoutProcessing, setCheckoutProcessing] = useState(false)
    const [separateBilling, setSeparateBilling] = useState(false)
    const [allowPayment, setAllowPayment] = useState(false)
    const [shippingRate, setShippingRate] = useState(0)
    const [paymentVis, setPaymentVis] = useState(false)
    const [tax, setTax] = useState(0)

// Mutation hooks:
    const [estimateOrderCosts] = useMutation(CALCULATE_MUTATION);
    const [checkout] = useMutation(CHECKOUT_MUTATION);
    const [createPaymentIntent] = useMutation(PAYMENT_INTENT_MUTATION);

// Stripe:
    const stripe = useStripe();
    const elements = useElements();

// Cart:
    const { emptyCart, items, cartTotal } = useCart();

// React-hook-form:
    const methods = useForm();

// Functions:
    const handleCheckoutSuccess = (orderId) => {
      console.log('in checkout success handler', orderId)
      emptyCart();

      navigate('../success', { state: { orderId } });
    }
    const handleCheckoutError = (err) => {
      console.log('checkout failure', err)
    }
    const submitOrder = async ({ shipping }) => {
      setCheckoutProcessing(true)

      try {
        // Checkout mutation:
        const printfulSyncVariants = items.map(item => {
          return { 
            sync_variant_id: item.id, 
            quantity: item.quantity
          }
        })
 
        const input = {
          recipient: shipping,
          items: printfulSyncVariants,
        }
        const { data } = await checkout({ variables: { input }})
        
        const total = parseInt(cartTotal,10) + (parseInt(shippingRate,10)*100) + (parseInt(tax,10)*100)
        
        // PaymentIntent mutation:
        const paymentIntentInput = {
          email: shipping.email,          
          orderId: data.checkout.printfulOrderId,
          total,
        }

        const { data : { 
          createPaymentIntent: {
            id,
            clientSecret,
            }
          } 
        } = await createPaymentIntent({ variables: { input: paymentIntentInput }})

        // Confirm Stripe payment:
        const stripeConfirmation = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement('card'),
          },
        });
        if (stripeConfirmation.error) throw new Error(stripeConfirmation.error.message);
        
        console.log('before being passed to checkout success handler', id)
        handleCheckoutSuccess(id)

      } catch (err) {
        handleCheckoutError(err)
      }
    }
    const calculateOrderCosts = async ({ shipping }) => {
      const printfulSyncVariants = items.map(item => {
        return { 
          sync_variant_id: item.id, 
          quantity: item.quantity
        }
      })
      
      const input = {
        recipient: shipping,
        items: printfulSyncVariants,
      }
      console.log(input)
      try {
        const { data } = await estimateOrderCosts({ variables: { input }})
        console.log('estimated order costs,', data)
        const { estimateOrderCosts: {
          shippingRate, taxRate, vatRate
        }} = data
  
        setTax(taxRate + vatRate)
        setShippingRate(shippingRate)
        setPaymentVis(true)
        setAllowPayment(true)

        } catch (err) {
          console.log(err)
        }
    }

  return (
    <StyledCheckoutContainer>

    <FormProvider {...methods}>
      <StyledForm onSubmit={methods.handleSubmit(
          allowPayment ? submitOrder : calculateOrderCosts
        )}>
        <ShippingForm separateBilling={separateBilling} handleChange={() => setSeparateBilling(!separateBilling)} />
        { separateBilling && <BillingForm /> }
        { paymentVis && <PaymentForm checkoutProcessing={checkoutProcessing} allowPayment={allowPayment} /> }
      </StyledForm> 
    </FormProvider> 

    <OrderInfo subtotal={cartTotal} shipping={shippingRate} tax={tax} />

    </StyledCheckoutContainer>  
  )
}

export default CheckoutForm
