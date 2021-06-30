import React, { useEffect, useState } from "react";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import Rating from "../Components/Rating";
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/Productactions";
export default function Productscreen(props) {
  // const y = props.match.params.id;
  // const product = data.products.find((x) => x._id === Number(y));
  // console.log(y.trim());
  const productId=props.match.params.id
  const dispatch=useDispatch()
  const [qty, setQty] = useState(1);
  const  productDetails=useSelector((state)=> state.productDetails)
  const {loading,error,product}=productDetails;

  useEffect(()=>{
    dispatch(detailsProduct(productId))
  },[dispatch,productId])
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  return (     
    
    <div>
      {loading? (<LoadingBox></LoadingBox>):
      error? (<MessageBox variant="danger">{error}</MessageBox>):
      (
        <div >
        <Link to="/">Back to Home</Link>
        <div className="row top">
        <div className="col-2">
          <img className="large" src={(product.image)} alt={product.name}></img>
        </div>
  
        <div className="col-1">
          <ul>
            <li>
              <h1>{product.name}</h1>
            </li>
            <li>
              <Rating
                rating={product.rating}
                numreview={product.numReviews}
              ></Rating>
            </li>
            <li>
              <h1>{product.description}</h1>
            </li>
            <li>
              <h1>${product.price}</h1>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <div className="row">
                  <div>Price:</div>
                  <div className="price">${product.price}</div>
                </div>
              </li>
              <li>
                <div className="row">Status:{product.numReviews > 1 ? (
                    <span className="success">In Stock</span>
                  ) : (
                    <span className="error">Unavailable</span>
                  )}</div>              
                  
              </li>
              {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                    </>
                  )}
            </ul>
          </div>
        </div>
        </div>
      </div>
      )}
    </div>
    
    
  );
}
