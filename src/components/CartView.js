import React from 'react'
import { useCart } from 'react-use-cart'

import ItemInCart from './ItemInCart'

const CartView = () => {
    const { items, removeItem, updateItemQuantity } = useCart()
    return (
      <div style={{margin: '3rem 0rem'}}>
        {items.map(item => <ItemInCart item={item} key={item.id} removeItem={removeItem} updateItemQuantity={updateItemQuantity} />)}
      </div>
    )
}

export default CartView