import React, { useEffect } from 'react';
import { useCart } from 'react-use-cart';
import { navigate } from 'gatsby';

import { CheckoutProvider } from '../context/Checkout';
import CheckoutForm from '../components/CheckoutForm/CheckoutForm';

function Checkout() {
  const { isEmpty } = useCart();

  useEffect(() => {
    if (isEmpty) {
      const navigateTimer = setTimeout(() => {
        navigate(`/store`);
      }, 3000);

      return () => clearTimeout(navigateTimer);
    }
  }, [isEmpty]);

  if (isEmpty) return <p>Your cart is empty</p>;

  return (
    <CheckoutProvider>
          <CheckoutForm />
    </CheckoutProvider>
  );
}

export default Checkout;
