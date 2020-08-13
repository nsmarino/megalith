import React from 'react';
import StripeProvider from './src/components/StripeProvider';

import { CartProvider } from 'react-use-cart'; // for shopping cart
import { GraphQLClient, ClientContext } from 'graphql-hooks';

const client = new GraphQLClient({
    url: 'http://localhost:4000/graphql',
  });

const randomCartId = () =>
  Math.random()
    .toString(36)
    .substring(7);

export const wrapRootElement = ({ element }) => {
    return (
    <StripeProvider>
      <ClientContext.Provider value={client}>
        <CartProvider
        id={randomCartId()}
        >
        {element}
        </CartProvider>
      </ClientContext.Provider>
    </StripeProvider>
    )
}