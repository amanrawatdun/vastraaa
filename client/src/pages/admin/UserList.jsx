import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllUser } from '../../features/admin/adminSlice';

const UserList = () => {
  const dispatch = useDispatch();
  const { data: users, loading, error } = useSelector((state) => state.admin);

  // State for the custom confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  // Function to open the confirmation modal
  const openDeleteModal = (id) => {
    setUserToDelete(id);
    setShowDeleteModal(true);
  };

  // Function to handle the actual deletion after confirmation
  const handleConfirmDelete = () => {
    if (userToDelete) {
      dispatch(deleteUser(userToDelete));
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  // Function to close the modal
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        All Users
      </h1>

      {loading && <p className="text-blue-600 font-medium">Loading users...</p>}
      {error && <p className="text-red-600 font-medium">{error}</p>}

      {!loading && users && users.length > 0 && (
        <div className="overflow-x-auto shadow-lg border border-gray-200 rounded-2xl bg-white">
          <table className="min-w-full text-left text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 border-b font-semibold text-gray-700">#</th>
                <th className="px-6 py-3 border-b font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 border-b font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 border-b font-semibold text-gray-700">Role</th>
                <th className="px-6 py-3 border-b font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50 transition duration-200">
                  <td className="px-6 py-3 border-b">{index + 1}</td>
                  <td className="px-6 py-3 border-b">{user.name}</td>
                  <td className="px-6 py-3 border-b break-all">{user.email}</td>
                  <td className="px-6 py-3 border-b capitalize">{user.role || 'user'}</td>
                  <td className="px-6 py-3 border-b">
                    <button
                      onClick={() => openDeleteModal(user._id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-200"
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

      {!loading && !error && users && users.length === 0 && (
        <p className="text-gray-600 mt-4">No users found.</p>
      )}

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-4">Confirm User Deletion</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
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

export default UserList;
