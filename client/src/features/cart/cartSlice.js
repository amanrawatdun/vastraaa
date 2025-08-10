import { createSlice } from "@reduxjs/toolkit";


const saveCartToLocalStorage = (cartItems)=>{
    try{
        localStorage.setItem('cartItems',JSON.stringify(cartItems));
    }catch(error){
        console.log("failed to save cart to localStorage", error);
    }
};

const loadCartFromLocalStorage=()=>{
    try{
        const cartItem = localStorage.getItem('cartItems');
        if(cartItem===null){
            return [];
        }
        return JSON.parse(cartItem)
    }catch(error){
        console.error("Failed to load cart from localStorage",error);
        return [];
    }
}


const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems:loadCartFromLocalStorage(),
    },
    reducers:{
        addItemToCart:(state , action)=>{
            const newItem=action.payload;
            const existingItem=state.cartItems.find(item=>
                item.id === newItem.id && 
                item.selectedSize === newItem.selectedSize && 
                item.selectedColor === newItem.selectedColor
            );
            if(existingItem){
                existingItem.quantity +=newItem.quantity || 1;
            }
            else{
                state.cartItems.push({...newItem , quantity:newItem.quantity})
            }
            console.log(state.cartItems);
            saveCartToLocalStorage(state.cartItems);
        },
        removeItemFromCart:(state,action)=>{
            const {id , selectedSize , selectedColor}= action.payload;
            state.cartItems = state.cartItems.filter(item=>
                !(item.id===id && item.selectedSize === selectedSize && item.selectedColor===selectedColor));
            saveCartToLocalStorage(state.cartItems);
        },

        updateItemQuantity:(state, action)=>{
            const {id , selectedSize , selectedColor , newQuantity}=action.payload;
            const itemToUpdate = state.cartItems.find(item=>
                item.id === id && 
                item.selectedSize === selectedSize && 
                item.selectedColor === selectedColor
            );

            if(itemToUpdate){
                itemToUpdate.quantity = newQuantity;
                if(itemToUpdate.quantity<=0){
                    state.cartItems = state.cartItems.filter(item=>!
                        (item.id ===id && item.selectedSize===selectedSize && item.selectedColor===selectedColor)
                    );
                }
            }
            saveCartToLocalStorage(state.cartItems);
        },

        clearCart:(state)=>{
            state.cartItems=[];
            saveCartToLocalStorage(state.cartItems);
        },
    },
    
});

export const {addItemToCart , removeItemFromCart , updateItemQuantity , clearCart}=cartSlice.actions
export default cartSlice.reducer;