import React, { useEffect } from "react";
//import data from "../data";
///import axios from "axios";
import Product from "../Components/Products";
import LoadingBox from "../Components/LoadingBox";
import MessageBox from "../Components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/Productactions";


export default function Homescreen() {
  // const [products, setProducts] = useState([]);
  // const [Loading, setLoading] = useState(false);
  // const [Error, setError] = useState(false);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  console.log(productList)
  //const {loading,error,products}=productList
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      {loading? (<LoadingBox></LoadingBox>):
      error? (<MessageBox variant="danger">{error}</MessageBox>):
      (
      <div className="row center">
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
      )}
    </div>
    
  );
}
