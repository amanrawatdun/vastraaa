import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../features/product/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.product);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    description: "",
    costPrice: "",
    sellingPrice: "",
    sizes: "", // State for sizes is now a string
    stock: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Iterate over the form state to append key-value pairs
    for (const key in form) {
      if (key === "sizes") {
        // Only convert the string to an array right before submission
        const sizesArray = form.sizes
          .split(",")
          .map((size) => size.trim().toLowerCase())
          .filter(Boolean); // Remove any empty strings
        formData.append("sizes", JSON.stringify(sizesArray));
      } else if (form[key]) { // Only append if the value exists
        formData.append(key, form[key]);
      }
    }

    const result = await dispatch(createProduct(formData));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/admin/products");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Add New Product
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            value={form.name}
            placeholder="e.g., Cool T-shirt"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            required
          />
        </div>

        {/* Brand */}
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            onChange={handleChange}
            value={form.brand}
            placeholder="e.g., Nike"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            onChange={handleChange}
            value={form.category}
            placeholder="e.g., Apparel"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            value={form.description}
            placeholder="Describe the product..."
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
        </div>

        {/* Prices & Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="costPrice" className="block text-sm font-medium text-gray-700 mb-1">Cost Price</label>
            <input
              type="number"
              id="costPrice"
              name="costPrice"
              onChange={handleChange}
              value={form.costPrice}
              placeholder="e.g., 500"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
          <div>
            <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              onChange={handleChange}
              value={form.sellingPrice}
              placeholder="e.g., 999"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              onChange={handleChange}
              value={form.stock}
              placeholder="e.g., 100"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label htmlFor="sizes" className="block text-sm font-medium text-gray-700 mb-1">Sizes (comma separated)</label>
          <input
            type="text"
            id="sizes"
            name="sizes"
            onChange={handleChange}
            value={form.sizes}
            placeholder="e.g., S, M, L, XL"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
        </div>
        
        {/* Image */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            required
          />
        </div>

        {/* Submit Button and Error */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-3 rounded-lg transition duration-200 
            ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg'}
          `}
        >
          {loading ? "Saving..." : "Add Product"}
        </button>

        {error && (
          <p className="text-red-600 text-sm mt-2 bg-red-50 p-2 rounded-lg">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
