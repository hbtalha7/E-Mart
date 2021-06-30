//import logo from "./logo.svg";
import "./index.css";
// import data from "./data";
// import Product from "./components/Product";
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Homescreen from "./screens/Homescreen";
import Cartscreeen from "./screens/Cartscreen";
import Productscreen from "./screens/Productscreen";
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import { signout } from './actions/userActions';
function App() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">        
          <div>          
            <Link className="brand" to="/">
            <img className="brandimg" src="./band.png" alt="Brand" />  
               SalehShop
            </Link>
          </div>
          <div>
          <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main>
        <Route path="/cart/:id?" component={Cartscreeen}></Route>
          <Route path="/product/:id" component={Productscreen}></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/" component={Homescreen} exact></Route>

          {/* <div>
          <div className="row center">
            {data.products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </div> */}
        </main>
        <footer className="row center">
          <p>Copyright Resvered 2021</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
