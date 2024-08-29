import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../app/store";
import { getProducts, removeProduct, modifyProduct } from "./productSlice";
import { Button, Table, Pagination, Alert } from "flowbite-react";
import { ProductForm } from "../../components/ProductForm";

const PRODUCTS_PER_PAGE = 10;
const ALERT_AUTO_CLOSE_DURATION = 5000; // 5 seconds

export const ProductList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const [modifyProductId, setModifyProductId] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    category: "",
    price: 0,
    discount: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Alert states
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), ALERT_AUTO_CLOSE_DURATION);
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [alert]);

  const handleEditClick = (product: any) => {
    setModifyProductId(product.id);
    setEditedProduct(product);
  };

  const handleSaveClick = () => {
    if (modifyProductId !== null) {
      dispatch(modifyProduct({ id: modifyProductId, product: editedProduct }))
        .then(() => {
          setAlert({
            type: "success",
            message: "Product updated successfully!",
          });
          setModifyProductId(null); // Clear edit mode
        })
        .catch(() => {
          setAlert({ type: "error", message: "Failed to update product!" });
        });
    }
  };

  const handleDeleteClick = (id: number) => {
    dispatch(removeProduct(id))
      .then(() => {
        setAlert({ type: "success", message: "Product deleted successfully!" });
      })
      .catch(() => {
        setAlert({ type: "error", message: "Failed to delete product!" });
      });
  };

  const handleAddSuccess = () => {
    setAlert({ type: "success", message: "Product added successfully!" });
  };

  // Calculate the number of pages
  const pageCount = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  // Get products for the current page
  const displayedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const formatRupiah = (number: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(number);
  };

  return (
    <div className="my-2 px-4 lg:px-8">
      <ProductForm onAddSuccess={handleAddSuccess} />

      {/* Alert Component */}
      {alert && (
        <Alert color={alert.type} onDismiss={() => setAlert(null)}>
          <span className="font-medium">
            {alert.type === "success" ? "Success!" : "Error!"}
          </span>{" "}
          {alert.message}
        </Alert>
      )}

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto w-full mt-5">
        <Table striped className="w-full">
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>Product Name</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Discount</Table.HeadCell>
            <Table.HeadCell>Price After Discount</Table.HeadCell>{" "}
            {/* New Column */}
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {displayedProducts.map((product, index) => {
              const priceAfterDiscount =
                product.price - (product.price * product.discount) / 100;
              return (
                <Table.Row
                  key={product.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>
                    {(currentPage - 1) * PRODUCTS_PER_PAGE + index + 1}
                  </Table.Cell>
                  {modifyProductId === product.id ? (
                    <>
                      <Table.Cell>
                        <input
                          type="text"
                          value={editedProduct.name}
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              name: e.target.value,
                            })
                          }
                          className="w-32 p-2 border rounded dark:bg-gray-700 dark:text-white"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <input
                          type="text"
                          value={editedProduct.category}
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              category: e.target.value,
                            })
                          }
                          className="w-32 p-2 border rounded dark:bg-gray-700 dark:text-white"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <input
                          type="number"
                          value={editedProduct.price}
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              price: parseFloat(e.target.value),
                            })
                          }
                          className="w-32 p-2 border rounded dark:bg-gray-700 dark:text-white"
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <input
                          type="number"
                          value={editedProduct.discount}
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              discount: parseFloat(e.target.value),
                            })
                          }
                          className="w-32 p-2 border rounded dark:bg-gray-700 dark:text-white"
                        />
                      </Table.Cell>
                      <Table.Cell>{priceAfterDiscount.toFixed(2)}</Table.Cell>
                      <Table.Cell>
                        <Button size="sm" onClick={handleSaveClick}>
                          Save
                        </Button>
                      </Table.Cell>
                    </>
                  ) : (
                    <>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </Table.Cell>
                      <Table.Cell>{product.category}</Table.Cell>
                      <Table.Cell>Rp. {formatRupiah(product.price)}</Table.Cell>
                      <Table.Cell>
                        {product.discount
                          ? `${product.discount}%`
                          : "No Discount"}
                      </Table.Cell>
                      <Table.Cell>
                        Rp. {formatRupiah(priceAfterDiscount)}
                      </Table.Cell>{" "}
                      {/* Display calculated price after discount */}
                      <Table.Cell>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleEditClick(product)}
                            size="sm"
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteClick(product.id)}
                            color="failure"
                            size="sm"
                          >
                            Delete
                          </Button>
                        </div>
                      </Table.Cell>
                    </>
                  )}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      <div className="flex justify-center py-4">
        <Pagination
          currentPage={currentPage}
          totalPages={pageCount}
          onPageChange={setCurrentPage}
          showIcons
        />
      </div>
    </div>
  );
};
