import React, { useState } from 'react';
import { navigate } from 'gatsby';

import { useMutation } from 'graphql-hooks';

import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from 'react-use-cart';
import { useForm, FormProvider } from 'react-hook-form'

import BillingForm from './BillingForm';
import PaymentForm from './PaymentForm';
import ShippingForm from './ShippingForm';
import TotalInfo from './TotalInfo';

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
      emptyCart();

      navigate('./success', { state: { orderId } });
    }
    const handleCheckoutError = (err) => {
      console.log('checkout failure', err)
    }
    const submitOrder = async ({ shipping }) => {
      setCheckoutProcessing(true)

      try {
        // Checkout mutation:
        const printfulSyncVariants = items.map(item => {return { sync_variant_id: item.id, quantity: item.quantity}})
 
        const input = {
          recipient: shipping,
          items: printfulSyncVariants,
        }
        const { data } = await checkout({ variables: { input }})
        
        const total = parseInt(cartTotal,10) + (parseInt(shippingRate,10)*100) + (parseInt(tax,10)*100)
        
        // PaymentIntent mutation:
        const paymentIntentInput = {
          description: 'megalith.supply payment',
          email: shipping.email,          
          metadata: { printfulOrderId: data.checkout.printfulOrderId, },
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
        console.log(stripeConfirmation)
        if (stripeConfirmation.error) throw new Error(stripeConfirmation.error.message);
        
        handleCheckoutSuccess(id)

      } catch (err) {
        handleCheckoutError(err)
      }
    }
    const calculateOrderCosts = async ({ shipping }) => {
      const printfulSyncVariants = items.map(item => {return { sync_variant_id: item.id, quantity: item.quantity}})
      const input = {
        recipient: shipping,
        items: printfulSyncVariants,
      }
      try {
        const { data } = await estimateOrderCosts({ variables: { input }})
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
    <>
    <TotalInfo subtotal={cartTotal} shipping={shippingRate} tax={tax} />

    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(
          allowPayment ? submitOrder : calculateOrderCosts
        )}>
        <ShippingForm separateBilling={separateBilling} handleChange={() => setSeparateBilling(!separateBilling)} />
        { separateBilling && <BillingForm /> }
        { paymentVis && <PaymentForm checkoutProcessing={checkoutProcessing} allowPayment={allowPayment} /> }
      </form> 
    </FormProvider> 

    </>  
  )
}

export default CheckoutForm


// 8/14:
// Integrate checkout mutation. ✓
// Integrate payment_intent mutation. ✓
// Send client secret to stripe to complete payment. ✓
// Webhook will confirm Printful order. However, how to test? 
// Navigate to success or failure page. ✓

// 8/15:
// Simple css to make site presentable.

// 8/16:
// Error handling
// Test suites

// Aug 17-31:
// Deploy simple static portfolio site, create PDF resume, polish 3 projects for job applications starting September 1.

// September:
// Apply to 3 jobs per day while working on sketchbook, working on design of personal site, improving 3 full-stack projects, and maybe doing leetcode problems?
// GOAL: get a job interview by end of september.