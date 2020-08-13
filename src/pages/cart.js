import React from 'react'
import { Link } from "gatsby"

import { useCart } from 'react-use-cart'

import Layout from '../components/layout'

const CartView = () => {
    const { items, cartTotal } = useCart()
    return (<div>
        {items.map(item => (
            <div key={item.id} style={{display: 'flex'}}>
                <h2>{item.name}</h2>
                <p>quantity: {item.quantity}</p>
                <p>${item.itemTotal / 100}</p>
            </div>
        )
        )}
        <h3>Total: ${cartTotal / 100}</h3>
    </div>)
}

const CartPage = () => (
    <Layout>
        <CartView />
        <button><Link to='/checkout'>checkout</Link></button>
    </Layout>
)

export default CartPage