

const cartReducer = (state,action) => {
   if(action.type === "ADD_TO_CART"){
    let {id, title, price} = action.payload;
   }

    return state;
}

export default cartReducer