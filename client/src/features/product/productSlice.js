import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createProductAPi, deleteProductAPI, getNewArrivalProductsAPI, getProductAPI, getProductByBrandAPI, getProductByPagesAPI, getProductBySearchAPI, getSaleProductsAPI, updateProductAPI } from "./productAPI"

const initialState={
    products:[],
    loading:false,
    error:false,
    currentPage:1,
    totalPages:1,
    totalProducts:0,
}

export const getProduct=createAsyncThunk(
    'auth/product',
    async(_ , thunkAPI)=>{
        try{
            const res = await getProductAPI();
        
            return res;
        }catch(error){
            thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const getProductByPages = createAsyncThunk(
    'auth/productPage',
    async(data={page: 1, limit: 10 }, thunkAPI)=>{
        try{
            const res = await getProductByPagesAPI(data);
            return res;
        }catch(error){
            thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const getNewArival = createAsyncThunk(
    'user/newArival',
    async(_ , thunkAPI)=>{
        try{
            const res = await getNewArrivalProductsAPI();
            return res;
        }catch(error){
            thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const getSaleProducts = createAsyncThunk(
    'user/saleProduct',
    async(_ , thunkAPI)=>{
        try{
            const res = await getSaleProductsAPI();
            return res;
        }catch(error){
            thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const getProductByBrand = createAsyncThunk(
    'product/brand',
    async(data, thunkAPI)=>{
        try{
         
            const res = await getProductByBrandAPI(data);
            return res;
        }catch(error){
            thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)

export const getProductBySearch = createAsyncThunk(
    'auth/search',
    async(data, thunkAPI)=>{
        try{
          
            const res = await getProductBySearchAPI(data);
            return res;
        }catch(error){
            thunkAPI.rejectWithValue(error.response.data.message)
        }
    }
)


export const createProduct=createAsyncThunk(
    'create/Product',
    async(data , thunkAPI)=>{
        try{
           
            const res = await createProductAPi(data);
         
          return res;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const updateProduct = createAsyncThunk(
    'update/product',
    async({ id ,formData} , thunkAPI)=>{
        
        try{
          
            const res = await updateProductAPI(id ,formData);
       
          return res;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'delete/product',
     async(id , thunkAPI)=>{
        try{
           
            const res = await deleteProductAPI(id);
         
          return res;
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)

const productSlice = createSlice({
    name:'product',
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getProduct.pending , (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getProduct.fulfilled , (state,action)=>{
            state.loading=false;
            state.products = action.payload;
        })
        .addCase(getProduct.rejected , (state , action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(createProduct.pending , (state)=>{
            state.loading = true;
            state.error=null;
        })
        .addCase(createProduct.fulfilled , (state, action)=>{
            state.loading=false;
            state.error=null;
            state.products.push(action.payload);
        })
        .addCase(createProduct.rejected , (state , action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(updateProduct.pending , (state )=>{
            state.loading =true;
            state.error = false;
        })
        .addCase(updateProduct.fulfilled , (state , action)=>{
            state.loading=false;
                const index = state.products.findIndex(p => p._id === action.payload._id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                }
        })
        .addCase(updateProduct.rejected , (state , action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(deleteProduct.pending , (state  )=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(deleteProduct.fulfilled , (state , action)=>{
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(deleteProduct.rejected, (state , action)=>{ 
            state.loading = false;
            state.error = action.payload;
        })
         .addCase(getNewArival.pending , (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getNewArival.fulfilled , (state,action)=>{
            state.loading=false;
            state.products = action.payload;
        })
        .addCase(getNewArival.rejected , (state , action)=>{
            state.loading=false;
            state.error=action.payload;
        })
         .addCase(getSaleProducts.pending , (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getSaleProducts.fulfilled , (state,action)=>{
            state.loading=false;
            state.products = action.payload;
        })
        .addCase(getSaleProducts.rejected , (state , action)=>{
            state.loading=false;
            state.error=action.payload;
        })
         .addCase(getProductByBrand.pending , (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getProductByBrand.fulfilled , (state,action)=>{
            state.loading=false;
            state.products = action.payload;
        })
        .addCase(getProductByBrand.rejected , (state , action)=>{
            state.loading=false;
            state.error=action.payload;
        })
         .addCase(getProductBySearch.pending , (state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getProductBySearch.fulfilled , (state,action)=>{
            state.loading=false;
            state.products = action.payload;
        })
        .addCase(getProductBySearch.rejected , (state , action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase(getProductByPages.pending ,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getProductByPages.fulfilled , (state , action)=>{
            state.loading=false;
            state.error=null;

            if(action.payload.currentPage===1){
                state.products=action.payload.products;
            }else{
                state.products=[...state.products , ...action.payload.products];
            }

            state.currentPage=action.payload.currentPage;
            state.totalPages=action.payload.totalPages;
            state.totalProducts=action.payload.totalProducts;

        })
        .addCase(getProductByPages.rejected , (state , action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
})


export default productSlice.reducer;