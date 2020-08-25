const reactUseCart = jest.requireActual("react-use-cart")

module.exports = {
    ...reactUseCart,
    useCart: jest.fn(()=>{
        return {
            totalItems: 5
        }
    })
}


