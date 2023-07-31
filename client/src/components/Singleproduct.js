import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addtocart } from '../redux/actions/cartAction';
import toast from 'react-hot-toast';
import {
  deleteReview,
  loadsingleProduct,
} from '../redux/actions/productActions';
import './css/single.css';
import { useNavigate } from 'react-router-dom';

function Singleproduct() {
  const navigate = useNavigate();
  let { id } = useParams();
  const dispatch = useDispatch();
  const sinproduct = useSelector((state) => state.product);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const review = useSelector((state) => state.review);
  let { loading, single } = sinproduct;
  const [userrating, setUserrating] = useState('');
  const [usercomment, setUsercomment] = useState('');
  const handleReview = async (e) => {
    e.preventDefault();
    if (userrating <= 0 || userrating > 5) {
      e.preventDefault();
      alert('enter between 0 and 5');
    } else {
      try {
        const { data } = await axios.put(
          `https://mernecommercewebsite-backend.vercel.app/api/v1/review/${id}`,
          {
            rating: userrating,
            comment: usercomment,
          }
        );
        if (data) {
          toast.success('Product review successfull');
          setUsercomment('');
          setUserrating('');
        }
      } catch (error) {
        toast.error(error.response.data.message);
        navigate('/login');
      }
    }
  };
  useEffect(() => {
    dispatch(loadsingleProduct(id));
    if (!userInfo) {
      navigate('/login');
    }
  }, [dispatch, review, id]);

  const addtocartHandler = (id) => {
    dispatch(addtocart(id, 1));
  };

  const delreview = () => {
    userInfo ? dispatch(deleteReview(id)) : toast.error('Please Login');
  };
  return (
    <>
      {loading
        ? 'Loading...'
        : single && (
            <>
              <div className="single">
                <div className="container">
                  <div className="simage">
                    <img src={single.img} alt={single._id}></img>
                  </div>
                  <div className="desc">
                    <div className="name">
                      <h3>{single.name}</h3>
                    </div>
                    <div className="price">
                      <h3>Price:${single.price}</h3>
                    </div>
                    <div className="cat centerv">
                      <h3>Category: </h3>
                      <span>{single.category}</span>
                    </div>
                    <div className="rating centervn flex">
                      <h3>Rating:</h3>
                      <span className="star">{single.rating}</span>
                    </div>
                    <div className={single.stock > 1 ? 'inStock' : 'oStock'}>
                      {single.stock > 1 ? 'In Stock' : 'Out Of Stock'}
                    </div>
                    <div className="pdes">
                      <h3>Description: </h3>
                      <span>{single.desc}</span>
                    </div>
                    <div className="deli">
                      <h3>Return Policy :</h3>
                      <span>
                        This product can only be returned within one week from
                        the day of delivery.
                      </span>
                    </div>
                    {single.stock >= 1 ? (
                      <div className="abtn">
                        <button onClick={() => addtocartHandler(single._id)}>
                          Add To Cart
                        </button>
                      </div>
                    ) : (
                      <div className="abtn">
                        <button>Out Of Stock</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="review-container">
                <h3>Reviews</h3>
                {!single.reviews ? (
                  <div className="com">No Reviews Yet</div>
                ) : (
                  <>
                    {single.reviews.map((rev) => {
                      return (
                        <div className="review" key={rev._id}>
                          <div className="user">
                            User:
                            {rev.name}
                          </div>
                          <div className="user">
                            Rating:
                            {rev.rating}
                          </div>
                          <div className="user">
                            Comment:
                            {rev.comment}
                          </div>
                          {rev.user == userInfo._id && (
                            <div className="rev-del" onClick={delreview}>
                              <button>Delete Your Review</button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
              {
                <div className="review-from">
                  <h3>Submit Your Own Review</h3>
                  <form className="rev-form" onSubmit={handleReview}>
                    <input
                      type="number"
                      placeholder="Leave Rating for the product..."
                      required
                      onChange={(e) => setUserrating(e.target.value)}
                      value={userrating}
                    ></input>
                    <textarea
                      cols="70"
                      rows="5"
                      type="text"
                      placeholder="Leave Comment For The Product..."
                      onChange={(e) => setUsercomment(e.target.value)}
                      value={usercomment}
                      required
                    ></textarea>
                    <input type="submit"></input>
                  </form>
                </div>
              }
            </>
          )}
    </>
  );
}

export default Singleproduct;
