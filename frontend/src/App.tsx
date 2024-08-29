import React from "react";
import { ProductList } from "./features/products/ProductList";
import Header from "./components/Header";

const App: React.FC = () => {
  return (
    <div className="container mx-auto px-4 lg:px-8 mt-4">
      <div className="relative bg-gray-50 shadow-md dark:bg-gray-800 sm:rounded-lg">
        <Header />
        <ProductList />
      </div>
    </div>
  );
};

export default App;
