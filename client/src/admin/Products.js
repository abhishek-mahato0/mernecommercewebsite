import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { createprod } from '../redux/actions/AdminProd';
import { loadAllProduct } from '../redux/actions/productActions';
import toast from 'react-hot-toast';
const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [price, setprice] = useState('');
  const [stock, setstock] = useState('');
  const [category, setcategory] = useState('');
  const [rating, setrating] = useState('');
  const [desc, setdesc] = useState('');
  const [img, setimg] = useState('');
  const [prodimg, setProdImg] = useState();
  const setImage = (e) => {
    e.preventDefault();
    const files = e.target.files[0];
    setProdImg(e.target.files[0]);
    imageDisplay(files);
  };
  const imageDisplay = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setimg(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProd = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !price ||
      !desc ||
      !stock ||
      !category ||
      !rating ||
      !prodimg
    ) {
      toast.error('Please fill all the required values');
    } else {
      const form = new FormData();
      form.append('name', name);
      form.append('price', price);
      form.append('desc', desc);
      form.append('stock', stock);
      form.append('category', category);
      form.append('rating', rating);
      form.append('myfile', prodimg);
      const { data } = await axios.post(
        'https://mernecommercewebsite-backend.vercel.app/api/v1/products',
        form,
        {
          withCredentials: true, // Include cookies and other credentials with the request
        }
      );
      if (data) {
        toast.success('Product Created successfully');
        navigate('/admin');
      }
    }
  };
  return (
    <div className="prod-form">
      <>
        <Link to="/admin" className="link">
          <h3 className="red">Go Back</h3>
        </Link>
      </>

      <h1>Create a product</h1>
      {img && <img src={img ? img : ''} alt="productImageHere"></img>}
      <form className="prod-form" onSubmit={handleProd}>
        <div className="ad-name">
          <label>Product Name:</label>
          <input
            type="text"
            placeholder="enter product name"
            required
            onChange={(e) => setname(e.target.value)}
            value={name}
          ></input>
        </div>
        <div className="ad-name">
          <label>Product Rating:</label>
          <input
            type="number"
            placeholder="enter product rating"
            required
            onChange={(e) => setrating(e.target.value)}
            value={rating}
          ></input>
        </div>
        <div className="ad-name">
          <label>Product Price:</label>
          <input
            type="number"
            placeholder="enter product price"
            required
            onChange={(e) => setprice(e.target.value)}
            value={price}
          ></input>
        </div>
        <div className="ad-name">
          <label>Product Category:</label>
          <input
            type="text"
            placeholder="enter product category"
            required
            onChange={(e) => setcategory(e.target.value)}
            value={category}
          ></input>
        </div>
        <div className="ad-name">
          <label>Product Stock:</label>
          <input
            type="number"
            placeholder="enter product count"
            required
            onChange={(e) => setstock(e.target.value)}
            value={stock}
          ></input>
        </div>
        <div className="ad-name">
          <label>Product Description:</label>
          <textarea
            cols="50"
            rows="5"
            type="text"
            placeholder="enter product description"
            required
            onChange={(e) => setdesc(e.target.value)}
            value={desc}
          ></textarea>
        </div>
        <div className="ad-name">
          <label>Product Image:</label>
          <input type="file" onChange={setImage} required></input>
        </div>
        <div className="ad-name">
          <button type="submit">Create Prod</button>
        </div>
      </form>
    </div>
  );
};

export default Products;
