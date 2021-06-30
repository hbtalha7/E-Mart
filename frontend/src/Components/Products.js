import React from "react";
import Rating from "./Rating";
import { Link } from 'react-router-dom';

export default function Product(props) {
  const { keyw, product } = props;
  return (
    <div key={keyw} className="card">
<Link to={`/product/${product._id}`}>
        <img className="medium" src={(product.image)} alt={product.name} />
      </Link>
      <div className="card-body">
      <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating rating={product.rating} numreview={product.numReviews}></Rating>
        <div className="price">
          <p>$ {product.price}</p>
        </div>
      </div>
    </div>
  );
}
