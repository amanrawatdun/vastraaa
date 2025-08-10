import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, getAllOrders, markOrderAsPaid, updateOrderStatus } from '../../features/order/orderSlice';

const OrderList = () => {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.order);

    // State for the custom confirmation modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);

    useEffect(() => {
        dispatch(getAllOrders());
    }, [dispatch]);

    const handleUpdateStatus = (orderId) => {
        dispatch(updateOrderStatus(orderId));
    };

    const handleMarkAsPaid = (orderId) => {
        dispatch(markOrderAsPaid(orderId));
    };

    // Function to open the confirmation modal
    const openDeleteModal = (orderId) => {
      setOrderToDelete(orderId);
      setShowDeleteModal(true);
    };

    // Function to handle the actual deletion after confirmation
    const handleConfirmDelete = () => {
      if (orderToDelete) {
        dispatch(deleteOrder(orderToDelete));
        setShowDeleteModal(false);
        setOrderToDelete(null);
      }
    };

    // Function to close the modal without deleting
    const handleCancelDelete = () => {
      setShowDeleteModal(false);
      setOrderToDelete(null);
    };

    return (
        <div>
            {/* Page Header */}
            <h1 className="text-3xl font-bold mb-6 text-gray-800">All Orders</h1>

            {loading && <p className="text-lg text-gray-600">Loading...</p>}
            {error && <p className="text-red-500 font-medium">{error}</p>}
            {!loading && orders.length === 0 && <p className="mt-4 text-gray-600">No orders found.</p>}

            {!loading && orders.length > 0 && (
                <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
                    <table className="min-w-full table-auto text-sm text-left border-collapse">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="px-6 py-3 font-semibold text-gray-700">Order ID</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">User</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">Total</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">Payment</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">Delivery</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">Created At</th>
                                <th className="px-6 py-3 font-semibold text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-b hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap">{order._id}</td>
                                    <td className="px-6 py-4">{order.user?.name || "N/A"}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800">₹{order.totalPrice}</td>

                                    <td className="px-6 py-4">
                                        {order.isPaid ? (
                                            <span className="text-green-600 font-medium">
                                                Paid on {new Date(order.paidAt).toLocaleDateString()}
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => handleMarkAsPaid(order._id)}
                                                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                                            >
                                                Mark as Paid
                                            </button>
                                        )}
                                    </td>

                                    <td className="px-6 py-4">
                                        {order.isDelivered ? (
                                            <span className="text-green-600 font-medium">
                                                Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => handleUpdateStatus(order._id)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                                            >
                                                Mark as Delivered
                                            </button>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 text-gray-700">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4">
                                        {order.isPaid && order.isDelivered && (
                                            <button
                                                onClick={() => openDeleteModal(order._id)}
                                                className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
                                            >
                                                Delete
                                            </button>
                                        )}
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
                        <h3 className="text-xl font-bold mb-4">Confirm Order Deletion</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete this order? This action cannot be undone.
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

export default OrderList;
