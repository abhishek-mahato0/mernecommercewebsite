import { ADD_CART_SUCCESS, DECREASE_QTY, REMOVE_CART_SUCCESS, SHIPPING_ADDRESS } from "../constants/cartConstants";
import { LOG_OUT } from "../constants/loginConstant";

export const addtocartReducer=(state={cart:[],shipping:{}},action)=>{
    switch (action.type) {
        case ADD_CART_SUCCESS:
            const item = action.payload
            const exists = state.cart.find((x)=>x.id===item.id)
            if(exists){
                return{
                    ...state,cart:[...state.cart]
                }
            }else{
                return{
                    ...state,cart:[...state.cart,item]
                }
            }
        case DECREASE_QTY:
            const decid = action.payload
            console.log(decid.id)
            const exist = state.cart.find((x)=>x.id===decid.id)
            if(exist){
                if(exist.qty>1){
                    return{
                        ...state,cart:[state.cart.map((x)=>x.id===decid.id ? {...exist,qty:exist.qty-1}:x)]
                    } 
                }
                else{
                    const filtered = state.cart.filter((x)=>x.id !==decid.id)
                    return{
                        cart:[...filtered]
                    } 
                }
                 
            }else{
                return{
                    ...state,cart:[...state.cart,item]
                }
            }
           
        case REMOVE_CART_SUCCESS:
            const id= action.payload
            const filtered = state.cart.filter((x)=>x.id !==id.id)
            return{
                cart:[...filtered]
            }

        case LOG_OUT:
        return{
            cart:[]
        }
        default:
            return state;
    }
}

export const shippingreducer=(state={shipping:{}},action)=>{
    switch (action.type) {
        case SHIPPING_ADDRESS:
            return{
                shipping:action.payload
            }
        default:
        return state;
    }
   
}
