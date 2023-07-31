import { ADMIN_LOAD_PROD_FAIL, ADMIN_LOAD_PROD_REQUEST, ADMIN_LOAD_PROD_SUCCESS, ADMIN_PROD_DEL_REQUEST, ADMIN_PROD_DEL_SUCCESS, ADMIN_PROD_FAIL, ADMIN_PROD_REQUEST, ADMIN_PROD_SUCCESS } from "../constants/adminConstants";

export const prodReducer=(state={adminprod:[]},action)=>{
    switch (action.type) {
        case ADMIN_PROD_REQUEST:
            return{
                success:false,
            }   
        case ADMIN_PROD_SUCCESS:
            return{
                success:true,
                message:action.payload
            } 
        case ADMIN_PROD_FAIL:
            return{
                success:false,
                message:action.payload,
                adminprod:{}
            }
        case ADMIN_PROD_DEL_REQUEST:
            return{
                success:false
            }
        case ADMIN_PROD_DEL_SUCCESS:
            return{
                success:true,
                adminprod:state.adminprod.filter((x)=>x._id !== action.id),
                message:action.payload
            }
        case ADMIN_LOAD_PROD_REQUEST:
            return{
                success:false,
            } 
            case ADMIN_LOAD_PROD_SUCCESS:
                return{
                    adminprod:action.payload
                } 
            case ADMIN_LOAD_PROD_FAIL:
                return{
                    message:action.payload,
                    adminprod:{}
                }
        
        default:
            return state;
    }
}