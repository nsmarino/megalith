import React from 'react';
import StripeProvider from './src/components/StripeProvider';
import { CartProvider } from 'react-use-cart'; // for shopping cart
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import { ToastContainer } from 'react-toastify'; // add-on for client notifications
import GlobalStyles from './src/components/GlobalStyles.js'

require('es6-promise').polyfill();
require('isomorphic-fetch');

const client = new GraphQLClient({
  url: 'https://evening-cove-56542.herokuapp.com/graphql',
  });

  // For when framer-motion page transitions are added:
  // const transitionDelay = 500;
  // export const shouldUpdateScroll = ({
  //   routerProps: { location },
  //   getSavedScrollPosition
  // }) => {
  //   if (location.action === "PUSH") {
  //     window.setTimeout(() => window.scrollTo(0, 0), transitionDelay);
  //   } else {
  //     const savedPosition = getSavedScrollPosition(location);
  //     window.setTimeout(
  //       () => window.scrollTo(...(savedPosition || [0, 0])),
  //       transitionDelay
  //     );
  //   }
  //   return false;
  // };

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

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          closeButton={false}
        />

        </ClientContext.Provider>
    </StripeProvider>
    )
}