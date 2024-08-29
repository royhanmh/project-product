import axios from "axios";

const API_URL = "http://localhost:8000/products";

// Fetch Products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to fetch products"
      );
    } else if (error.request) {
      console.error("Error Request:", error.request);
      throw new Error("No response received from the server");
    } else {
      console.error("Error Message:", error.message);
      throw new Error(error.message);
    }
  }
};

// Create Product
export const createProduct = async (product: any) => {
  try {
    const response = await axios.post(API_URL, product);
    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to create product"
      );
    } else if (error.request) {
      console.error("Error Request:", error.request);
      throw new Error("No response received from the server");
    } else {
      console.error("Error Message:", error.message);
      throw new Error(error.message);
    }
  }
};

// Update Product
export const updateProduct = async (id: number, product: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, product);
    return response.data.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to update product"
      );
    } else if (error.request) {
      console.error("Error Request:", error.request);
      throw new Error("No response received from the server");
    } else {
      console.error("Error Message:", error.message);
      throw new Error(error.message);
    }
  }
};

// Delete Product
export const deleteProduct = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.message;
  } catch (error: any) {
    if (error.response) {
      console.error("Error Response:", error.response.data);
      throw new Error(
        error.response.data.message || "Failed to delete product"
      );
    } else if (error.request) {
      console.error("Error Request:", error.request);
      throw new Error("No response received from the server");
    } else {
      console.error("Error Message:", error.message);
      throw new Error(error.message);
    }
  }
};
