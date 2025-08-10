import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateProduct } from "../../features/product/productSlice";

const EditProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const { products, loading, error } = useSelector((state) => state.product);

    // Find the product to edit
    const product = products.find((product) => product._id === id);

    const [form, setForm] = useState({
        name: "",
        brand: "",
        description: "",
        category: "",
        costPrice: "",
        sellingPrice: "",
        sizes: "",
        stock: "", // Added stock field
        image: null,
    });
    
    // Add state for form submission status
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Populate the form with product data on initial load
    useEffect(() => {
        if (product) {
            setForm({
                name: product.name || "",
                brand: product.brand || "",
                description: product.description || "",
                category: product.category || "",
                costPrice: product.costPrice || "",
                sellingPrice: product.sellingPrice || "",
                sizes: Array.isArray(product.sizes) ? product.sizes.join(", ") : "",
                stock: product.stock || "",
                image: null,
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setForm((prev) => ({ ...prev, image: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("brand", form.brand);
        formData.append("description", form.description);
        formData.append("category", form.category);
        formData.append("costPrice", form.costPrice);
        formData.append("sellingPrice", form.sellingPrice);
        formData.append("stock", form.stock);

        // Convert the comma-separated string back to an array
        const sizesArray = form.sizes
            .split(",")
            .map((size) => size.trim().toLowerCase())
            .filter((size) => size !== "");

        formData.append("sizes", JSON.stringify(sizesArray));

        if (form.image) {
            formData.append("image", form.image);
        }

        const result = await dispatch(updateProduct({ id, formData }));

        setIsSubmitting(false);

        if (result.meta.requestStatus === "fulfilled") {
            navigate("/admin/products");
        } else {
            // Handle error, e.g., show a toast message
            console.error("Failed to update product:", result.payload);
        }
    };
    
    if (loading) {
      return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <p className="text-xl font-medium text-gray-700">Loading product data...</p>
        </div>
      );
    }
    
    if (!product) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <p className="text-xl font-medium text-red-500">Product not found!</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex items-center justify-center">
            <div className="w-full max-w-2xl bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Edit Product</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Product Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="e.g., Stylish T-Shirt"
                                className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                required
                            />
                        </div>
                        {/* Brand */}
                        <div>
                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={form.brand}
                                onChange={handleChange}
                                placeholder="e.g., Nike"
                                className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                required
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            placeholder="e.g., men, women, kid"
                            className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="A detailed description of the product."
                            rows="4"
                            className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Cost Price */}
                        <div>
                            <label htmlFor="costPrice" className="block text-sm font-medium text-gray-700 mb-1">Cost Price ($)</label>
                            <input
                                type="number"
                                name="costPrice"
                                value={form.costPrice}
                                onChange={handleChange}
                                placeholder="e.g., 500"
                                className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                                required
                            />
                        </div>
                        {/* Selling Price */}
                        <div>
                            <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700 mb-1">Selling Price ($)</label>
                            <input
                                type="number"
                                name="sellingPrice"
                                value={form.sellingPrice}
                                onChange={handleChange}
                                placeholder="e.g., 999"
                                className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                            />
                        </div>
                         {/* Stock */}
                        <div>
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={form.stock}
                                onChange={handleChange}
                                placeholder="e.g., 25"
                                className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                            />
                        </div>
                    </div>

                    {/* Sizes */}
                    <div>
                        <label htmlFor="sizes" className="block text-sm font-medium text-gray-700 mb-1">Sizes</label>
                        <input
                            type="text"
                            name="sizes"
                            value={form.sizes}
                            onChange={handleChange}
                            placeholder="e.g., s, m, l, xl"
                            className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                        />
                        <p className="mt-1 text-xs text-gray-500">Enter sizes as a comma-separated list.</p>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 transition-colors duration-200"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 disabled:bg-indigo-400"
                    >
                        {isSubmitting ? "Updating..." : "Update Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
