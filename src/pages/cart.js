import React from 'react'
import { Link } from "gatsby"
import { useCart } from 'react-use-cart'


import Layout from '../components/layout'
import CartView from '../components/CartView'
import StyledButton from '../components/StyledButton'

const CartPage = () => {
    const { cartTotal } = useCart()
    return (
    <Layout>
        <CartView />
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{fontSize: '1.25rem'}}>Subtotal: ${cartTotal ? cartTotal / 100 : '0'}</div>  
          <StyledButton><Link to='/checkout'>Go to Checkout</Link></StyledButton>
        </div>
    </Layout>
)}

export default CartPage