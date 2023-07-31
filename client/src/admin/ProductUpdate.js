import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './product.css';
const ProductUpdate = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminprod } = useSelector((state) => state.adminproduct);
  const single = adminprod.find((x) => x._id === id);
  const [avatar, setAvatar] = useState(single.img);
  const [name, setName] = useState(single.name);
  const [price, setPrice] = useState(single.price);
  const [category, setCategory] = useState(single.category);
  const [desc, setDesc] = useState(single.desc);
  const [stock, setStock] = useState(single.stock);
  const updateadminproduct = (e) => {
    e.preventDefault();
    const prodUpdate = async () => {
      const { data } = await axios.put(
        `https://mernecommercewebsite-backend.vercel.app/api/v1/product/${id}`,
        {
          name: name,
          desc: desc,
          price: price,
          img: avatar,
          category: category,
          stock: stock,
        }
      );
    };
    prodUpdate();
    alert('product Updated Successfully');
    navigate('/admin');
  };

  const updatePic = (e) => {
    e.preventDefault();
    const files = e.target.files[0];
    imageDisplay(files);
  };
  const imageDisplay = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="update">
      <form className="update-form" onSubmit={updateadminproduct}>
        <h1>Update Product</h1>
        <img src={avatar} alt="avatar"></img>
        <div className="comp">
          <label>Product Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></input>
        </div>
        <div className="comp">
          <label>Product Price</label>
          <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          ></input>
        </div>
        <div className="comp">
          <label>Product Category</label>
          <input
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          ></input>
        </div>
        <div className="comp">
          <label>Product Stock</label>
          <input
            type="number"
            onChange={(e) => setStock(e.target.value)}
            value={stock}
          ></input>
        </div>
        <div className="comp">
          <label>Product Description</label>
          <textarea
            cols="40"
            rows="10"
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          ></textarea>
        </div>
        <div className="comp">
          <input type="file" onChange={updatePic}></input>
        </div>
        <div className="btn">
          <input type="submit"></input>
        </div>
      </form>
    </div>
  );
};

export default ProductUpdate;
