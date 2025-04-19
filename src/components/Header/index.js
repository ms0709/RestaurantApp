import Cookies from 'js-cookie'
import {IoCart, IoLogOutSharp} from 'react-icons/io5'
// import { IoLogOutSharp } from "react-icons/io5";
import {Link, withRouter} from 'react-router-dom'
import CartContext from '../../CartContext'
import './index.css'

const Header = props => {
  const {restaurantName} = props

  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        const getCartCount = cartList.reduce(
          (sum, each) => each.quantity + sum,
          0,
        )

        return (
          <nav className="navbar px-4">
            <Link to="/">
              <h1 className="nav-head">UNI Resto Cafe</h1>
            </Link>
            <div className="nav-right-container">
              <button type="button" className="logout-btn" onClick={onLogout}>
                Logout
              </button>
              <button
                type="button"
                className="small-device-logout-btn"
                onClick={onLogout}
              >
                <IoLogOutSharp size={25} />
              </button>
              <Link to="/cart" className="cart-icon">
                <p className="d-none d-md-block mt-3">My Orders</p>

                <button type="button" data-testid="cart" className="nav-cart">
                  <IoCart size={23} />
                  <div className="header-count-container">
                    <p className="count">{cartList.length}</p>
                  </div>
                </button>
              </Link>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
