// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const sumOf = (total, curr) => total + curr
      const amount = cartList.map(each => each.quantity * each.price)
      const totalAmount = amount.reduce(sumOf)
      return (
        <div className="cart-summary-container">
          <div className="total-item-container">
            <div className="amount-container">
              <h1 className="order-heading">
                Order Total:
                <span className="total">{` Rs ${totalAmount}/-`}</span>
              </h1>
            </div>
            <div className="amount-container">
              <span className="items">{cartList.length}</span>
              <p className="items">Items in cart</p>
            </div>
          </div>
          <button className="checkout-button" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
