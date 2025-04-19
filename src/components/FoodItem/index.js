import {useState} from 'react'
import CartContext from '../../CartContext'
import './index.css'

const FoodItem = ({details}) => {
  const {
    dishId,
    dishName,
    dishPrice,
    dishImage,
    dishCurrency,
    dishCalories,
    dishDescription,
    dishAvailability,
    dishType,
    addonCat,
    quantity,
  } = details
  const [itemQuantity, setItemQuantity] = useState(0)
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList, addCart, removeCart} = value
        console.log(cartList)

        const isInclude = cartList.find(each => each.dishId === dishId)

        const increment = () => {
          setItemQuantity(prevQuantity => prevQuantity + 1)
        }

        const onAddToCart = () => {
          addCart({...details, quantity: itemQuantity})
        }

        const decrement = () => {
          setItemQuantity(prevQuantity =>
            prevQuantity <= 0 ? 0 : prevQuantity - 1,
          )
          if (itemQuantity <= 0) {
            removeCart(dishId)
          }
        }

        return (
          <li className="food-item">
            <div className="food-details">
              <div
                style={{borderColor: dishType === 2 ? 'green' : 'red'}}
                className="dish-type"
              >
                <div style={{background: dishType === 2 ? 'green' : 'red'}}>
                  <p className="d-none" />
                </div>
              </div>
              <div className="details-card">
                <h1>{dishName}</h1>
                <p className="price">
                  {dishCurrency} {dishPrice}
                </p>
                <p className="dish-des">{dishDescription}</p>
                {dishAvailability ? (
                  <div className="add-to-cart-container">
                    <div className="d-flex align-items-center gap-2 my-2 counter-btn-container">
                      <button
                        onClick={decrement}
                        className="count-btn"
                        type="button"
                      >
                        -
                      </button>
                      <p>{itemQuantity}</p>
                      <button
                        onClick={increment}
                        className="count-btn"
                        type="button"
                      >
                        +
                      </button>
                    </div>
                    {itemQuantity > 0 && (
                      <button
                        type="button"
                        className="add-to-cart-btn"
                        onClick={onAddToCart}
                      >
                        ADD TO CART
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-danger fs-6">Not available</p>
                )}
                {addonCat.length > 0 && (
                  <p className="custom">Customizations available</p>
                )}
              </div>
            </div>
            <p className="calory">{dishCalories} calories</p>
            <div className="dish-image">
              <img src={dishImage} alt={dishName} />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default FoodItem
