import { ORDER_FAIL, ORDER_REQUEST, ORDER_SUCCESS } from "../constants/orderConstants";

export const createOrderreducer=(state={userOrder:{}},action)=>{
    switch (action.type) {
        case ORDER_REQUEST:
            return{
                loading:true
            }
        case ORDER_SUCCESS:
            return{
                loading:false,
                userOrder:action.payload
            }
        case ORDER_FAIL:
        return{
            loading:true,
            error:action.payload
        }
        default:
           return state;
    }
}