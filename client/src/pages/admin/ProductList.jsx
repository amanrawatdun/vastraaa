import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getProduct } from "../../features/product/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  // State to manage the confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  // Function to open the confirmation modal
  const openDeleteModal = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  // Function to handle the actual deletion after confirmation
  const handleConfirmDelete = () => {
    if (productToDelete) {
      dispatch(deleteProduct(productToDelete));
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  // Function to close the modal without deleting
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Products</h2>
        <Link
          to="/admin/product/create"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow-lg transition duration-200"
        >
          + Add Product
        </Link>
      </div>

      {/* Loading and Error States */}
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-600 font-semibold">{error}</p>
      ) : (
        // Product Table
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 border-b text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Stock</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition duration-150">
                  <td className="px-6 py-4">
                    <img
                      src={product.image?.url}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                      // Fallback image for broken URLs
                      onError={(e) => { e.target.src = "https://placehold.co/48x48/F3F4F6/9CA3AF?text=No+Img"; }}
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">{product.name}</td>
                  <td className="px-6 py-4 text-gray-700">₹{product.sellingPrice}</td>
                  <td className="px-6 py-4 text-gray-700">{product.stock}</td>
                  <td className="px-6 py-4 text-gray-700">{product.category}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <Link
                      to={`/admin/product/edit/${product._id}`}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg shadow transition"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => openDeleteModal(product._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this product? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
