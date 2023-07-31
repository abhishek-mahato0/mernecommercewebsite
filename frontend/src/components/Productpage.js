import React from 'react';
import { Link } from 'react-router-dom';
import './css/product.css';
import { useEffect } from 'react';
import { loadAllProduct } from '../redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Productpage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { loading, prod } = products;

  useEffect(() => {
    dispatch(loadAllProduct({}));
  }, [dispatch]);
  return (
    <div className="pcontainer">
      {loading ? (
        'Loading...'
      ) : prod.length > 0 ? (
        <div className="products">
          {prod.map((item) => {
            return (
              <div className="product" key={item._id}>
                <Link to={`/single/${item._id}`}>
                  <div className="primg center">
                    <img src={item.img} alt={item._id}></img>
                  </div>
                </Link>
                <div className="ptitle centerv">
                  <h3>Name:</h3>
                  <span>{item.name}</span>
                </div>
                <div className="price centerv">
                  <h3>Price:</h3>
                  <span>${item.price}</span>
                </div>
                <div className="rating centervn flex">
                  <h3>Rating:</h3>
                  <span className="star">{item.rating}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h1>No products Found</h1>
      )}
    </div>
  );
}

export default Productpage;
