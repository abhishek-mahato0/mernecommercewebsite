import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useState } from 'react'
import './css/shipping.css'
import { shippingAddress } from '../redux/actions/cartAction'
const Shipping = () => {
    const {userInfo} = useSelector(state=>state.user)
    const {cart} = useSelector(state=>state.cartItems)
    const {shipping} = useSelector(state=>state.shipping)
    const navigate = useNavigate()
    const dispatch= useDispatch()
    const [fullname, setFullname] = useState(shipping.fullname)
    const [city, setCity] = useState(shipping.city)
    const [address, setAddress] = useState(shipping.address)
    const [phone, setPhone] = useState(shipping.phone)

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(shippingAddress({fullname,city,address,phone}))  
        if(userInfo && cart){
            navigate('/confirmOrder')
        }  
        else{
            navigate('/cart')
        }  
    }
  return (
    <div>
        <div className='shippingfrom'>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor='full name'>Full Name</label>
                    <input type="text" id="name" value={fullname} placeholder="Enter full name" onChange={(e)=>setFullname(e.target.value)} required ></input>
                </div>
                <div>
                    <label htmlFor='city'>City Name</label>
                    <input type="text" id="city" value={city} placeholder="Enter city name" onChange={(e)=>setCity(e.target.value)} required ></input>
                </div>
                <div>
                    <label htmlFor='address'>Address</label>
                    <input type="text" id="address" value={address} placeholder="Enter Your Address" onChange={(e)=>setAddress(e.target.value)} required ></input>
                </div>
                <div>
                    <label htmlFor='number'>Phone Number</label>
                    <input type="number" id="number" value={phone} placeholder="Enter Your Phone Number" onChange={(e)=>setPhone(e.target.value)} required ></input>
                </div>
                <div className='fbtn'>
                    <button type='submit'>Continue...</button>
                </div>
            </form>
        </div>
    </div>
  )
}


export default Shipping