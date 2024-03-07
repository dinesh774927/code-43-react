import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updateList = cartList.filter(each => each.id !== id)
    this.setState({cartList: updateList})
  }

  addQuantity = id => {
    const {cartList} = this.state
    const updateList = cartList.map(each => {
      if (each.id === id) {
        return {
          availability: each.availability,
          brand: each.brand,
          imageUrl: each.imageUrl,
          description: each.description,
          price: each.price,
          rating: each.rating,
          title: each.title,
          totalReviews: each.totalReviews,
          id: each.id,
          quantity: each.quantity + 1,
        }
      }
      return each
    })
    this.setState({cartList: updateList})
  }

  subQuantity = id => {
    const {cartList} = this.state
    const updateList = cartList.map(each => {
      if (each.id === id) {
        return {
          availability: each.availability,
          brand: each.brand,
          description: each.description,
          imageUrl: each.imageUrl,
          price: each.price,
          rating: each.rating,
          title: each.title,
          totalReviews: each.totalReviews,
          id: each.id,
          quantity: each.quantity - 1,
        }
      }
      return each
    })
    this.setState({cartList: updateList})
  }
  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const checkProduct = cartList.every(each => each.id !== product.id)
    if (checkProduct) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const updateList = cartList.map(each => {
        if (each.id === product.id) {
          return {
            availability: each.availability,
            brand: each.brand,
            description: each.description,
            imageUrl: each.imageUrl,
            price: each.price,
            rating: each.rating,
            title: each.title,
            totalReviews: each.totalReviews,
            id: each.id,
            quantity: each.quantity + product.quantity,
          }
        }
        return each
      })
      this.setState({cartList: updateList})
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.addQuantity,
          decrementCartItemQuantity: this.subQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
