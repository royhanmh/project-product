import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./productAPI";

export interface ProductState {
  products: any[];
  status: "idle" | "loading" | "failed";
}

const initialState: ProductState = {
  products: [],
  status: "idle",
};

// Thunks
export const getProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchProducts();
    return response;
  }
);

export const addProduct = createAsyncThunk(
  "products/createProduct",
  async (product: any) => {
    const response = await createProduct(product);
    return response;
  }
);

export const modifyProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, product }: any) => {
    const response = await updateProduct(id, product);
    return response;
  }
);

export const removeProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    await deleteProduct(id);
    return id;
  }
);

// Slice
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(modifyProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export default productSlice.reducer;
