import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createProduct } from './AdminProductApi';

const initialState = {
    products: [],
    status: 'idle',
    selectedProduct: null
}

export const createProductAsync = createAsyncThunk(
    'product/create',
    async (product) => {
        const response = await createProduct(product);
        return response.data;
    }
);



// ---------- main slice ------------
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        productCategory: (state, action) => {
            state.selectedCategory = action.payload
        },
        clearSelectedProduct: (state) => {
            state.selectedProduct = null
        }
    },
    // --------- extra reducers -----------
    extraReducers: (builder) => {
        builder
            // create product
            .addCase(createProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createProductAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products.push(action.payload);
            })

    }
})

export const { productCategory } = productSlice.actions;
export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;

export default productSlice.reducer;