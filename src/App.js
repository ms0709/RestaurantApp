import {Switch, Route} from 'react-router-dom'
import {useState, useEffect} from 'react'
import Home from './components/Home'
import CartContext from './CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Cart from './components/Cart'
import './App.css'

const App = () => {
  const [cartList, setCart] = useState([
    // {
    //   dishAvailability: true,
    //   dishCalories: 15,
    //   dishCurrency: 'SAR',
    //   dishDescription:
    //     'Fresh spinach, mushrooms, and hard-boiled egg served with warm bacon vinaigrette',
    //   dishId: '100000001',
    //   dishImage: 'https://i.imgur.com/PoJfqsD.jpg',
    //   dishName: 'Spinach Salad',
    //   dishPrice: 7.95,
    //   dishType: 2,
    //   dish_Availability: true,
    //   dish_Type: 2,
    //   dish_calories: 15,
    //   dish_currency: 'SAR',
    //   dish_description:
    //     'Fresh spinach, mushrooms, and hard-boiled egg served with warm bacon vinaigrette',
    //   dish_id: '100000001',
    //   dish_image: 'https://i.imgur.com/PoJfqsD.jpg',
    //   dish_name: 'Spinach Salad',
    //   dish_price: 7.95,
    //   nexturl:
    //     'http://snapittapp.snapitt.net/api/menu/30/?org=1010000001&branch_id=1000000001&menuItem=100000001&limit=10&offset=20&lang=en',
    //   quantity: 1,
    // },
  ])
  const [appName, setAppName] = useState('')

  const addCart = food => {
    setCart(prevCart => {
      const isInclude = cartList.some(
        eachDish => eachDish.dishId === food.dishId,
      )

      if (!isInclude) {
        return [...prevCart, food]
      }
      return prevCart.map(eachDish =>
        eachDish.dishId === food.dishId
          ? {...eachDish, quantity: eachDish.quantity + 1}
          : eachDish,
      )
    })
  }

  const incrementCartItemQuantity = food => {
    setCart(prevCart => {
      const isInclude = prevCart.find(each => each.dishId === food.dishId)

      if (!isInclude) {
        return [...prevCart, {...food, quantity: 1}]
      }

      return prevCart.map(each =>
        each.dishId === food.dishId
          ? {...each, quantity: each.quantity + 1}
          : each,
      )
    })
  }

  const decrementCartItemQuantity = food => {
    setCart(prevCart => {
      const isInclude = prevCart.find(each => each.dishId === food.dishId)

      if (!isInclude) {
        return [...prevCart]
      }

      return prevCart
        .map(each =>
          each.dishId === food.dishId
            ? {...each, quantity: each.quantity - 1}
            : each,
        )
        .filter(each => each.quantity > 0)
    })
  }

  const removeCartItem = id => {
    setCart(prevCart => prevCart.filter(each => each.dishId !== id))
  }

  const removeAllCartItems = () => {
    setCart([])
  }

  const addAppName = name => {
    setAppName(name)
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        appName,
        addAppName,
        addCart,
        removeCartItem,
        removeAllCartItems,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/cart" component={Cart} />
      </Switch>
    </CartContext.Provider>
  )
}

export default App
