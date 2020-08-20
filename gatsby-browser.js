import React from 'react';
import StripeProvider from './src/components/StripeProvider';

import { CartProvider } from 'react-use-cart'; // for shopping cart
import { GraphQLClient, ClientContext } from 'graphql-hooks';

import GlobalStyles from './src/components/globalstyles'

const client = new GraphQLClient({
    url: 'http://localhost:4000/graphql',
  });

  export const wrapPageElement = ({ element, props }) => { // allows a plugin to wrap the page element
    return <GlobalStyles {...props}>{element}</GlobalStyles>; // ie puts LAYOUT component around entire page
    // useful for setting wrappers that dont unmount on page change
  };

export const wrapRootElement = ({ element }) => {
    return (
    <StripeProvider>
      <ClientContext.Provider value={client}>
        <CartProvider>
        {element}
        </CartProvider>
      </ClientContext.Provider>
    </StripeProvider>
    )
}