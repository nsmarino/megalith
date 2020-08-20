import React, { createContext, useReducer } from 'react'
import { useCart } from 'react-use-cart'

// basically creating a STORE where i can reliably and cleanly alter state
const CheckoutContext = createContext()

function reducer(state, {payload, type}) {
  switch (type) {
    case 'CHECKOUT_PROCESSING':
      return {
        ...state,
        processing: true,
        error: null,
      };
    case 'CHECKOUT_ERROR':
      return { ...state, processing: false, error: payload.message };
    case 'CHECKOUT_SUCCESS':
        return {
            ...state,
            allowPayment: false,
            processing: false,
            error: null,
            success: true,
        }
    case 'CHECKOUT_UPDATE_SHIPPING':
        return {
            ...state,
            shipping: payload,
        }
    case 'CHECKOUT_UPDATE_TAX':
        return {
            ...state,
    
            tax: payload,
        };
    case 'CHECKOUT_PAYMENT':
    return {
        ...state,
        allowPayment: true,
        processing: false,
        error: null,
    };
    default:
    throw new Error('Invalid action');
  }
}

function CheckoutProvider({ children }) { 
    const { cartTotal } = useCart()

    // initial state:
    const [state, dispatch] = useReducer(reducer, {
        allowPayment: false,
        processing: false,
        error: null,
        success: false,
        shipping: 0,
        tax: 0,
    })

    const orderTotal = cartTotal + state.tax + state.shipping;


    // dispatchers:
    const checkoutError = payload => {
        dispatch({ type: 'CHECKOUT_ERROR', payload})
    }

    const checkoutPayment = payload => {
        dispatch({ type: 'CHECKOUT_PAYMENT'})
    }

    const checkoutProcessing = payload => {
        dispatch({ type: 'CHECKOUT_PROCESSING'})
    }

    const checkoutSuccess = () => {
        dispatch({ type: 'CHECKOUT_SUCCESS' })
    }

    const updateShipping = payload => {
        dispatch({ type: 'CHECKOUT_UPDATE_SHIPPING', payload})
    }

    const updateTax = payload => {
        dispatch({ type: 'CHECKOUT_UPDATE_TAX', payload})
    }

    return (
        <CheckoutContext.Provider
          value={{
              ...state,
              checkoutError,
              checkoutPayment,
              checkoutProcessing,
              checkoutSuccess,
              orderTotal,
              updateShipping,
              updateTax,
          }}
        >
            {children}
        </CheckoutContext.Provider>
    )
}

export { CheckoutProvider, CheckoutContext as default };