import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./../app/store";
import { addProduct } from "../features/products/productSlice";
import { Button, Modal, TextInput } from "flowbite-react";

interface ProductFormProps {
  onAddSuccess: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onAddSuccess }) => {
  const dispatch: AppDispatch = useDispatch();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: 0,
    discount: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addProduct(product))
      .then(() => {
        setProduct({
          name: "",
          category: "",
          price: 0,
          discount: 0,
        });
        setIsModalOpen(false); // Close the modal after submission
        onAddSuccess(); // Notify parent component of successful addition
      })
      .catch(() => {
        // Handle any errors here if needed
      });
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} className="mb-4">
        Add Product
      </Button>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Add Product</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
            />
            <TextInput
              type="text"
              name="category"
              value={product.category}
              onChange={handleChange}
              placeholder="Category"
              required
            />
            <TextInput
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Price"
              required
            />
            <TextInput
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              placeholder="Discount"
              className="decora"
              required
            />
            <div className="flex justify-end space-x-2">
              <Button type="submit">Add Product</Button>
              <Button color="gray" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
