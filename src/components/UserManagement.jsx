import React, { useState } from 'react';
import { FaTrash, FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';

const UserManagement = ({
    activeTab,
    setActiveTab,
    name,
    setName,
    handleAddUser,
    filterList,
    userList,
    deleteUser,
    userType,
    loading,
}) => {
    return (
        <div>
            {/* Add User Section */}
            <div className="flex gap-4 mb-8">
                <div className="flex-1">
                    <input
                        placeholder={`${userType} Name`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-violet-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <button
                        onClick={handleAddUser}
                        className="w-full bg-gradient-to-r flex items-center justify-center from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-600 text-white font-semibold py-3 mt-2 rounded-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? (
                            <div className="animate-spin h-5 w-5 border-4 border-t-4 border-white rounded-full"></div>
                        ) : (
                            <>
                                <FaPlus className="mr-2" /> Add {userType}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* User List Section */}
            <div className="bg-white shadow-md p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-violet-700 mb-4">
                    {userType}s
                </h3>
                <ul>
                    {filterList(userList).map((user, i) => (
                        <li
                            key={i}
                            className="flex justify-between items-center p-3 mb-2 bg-violet-50 rounded-md hover:bg-violet-100 transition duration-200"
                        >
                            {user}
                            <FaTrash
                                className="text-violet-600 cursor-pointer hover:text-violet-800 transition duration-200"
                                onClick={() => {
                                    const confirmDelete = window.confirm(`Are you sure you want to delete this ${userType.toLowerCase()}?`);
                                    if (confirmDelete) {
                                        deleteUser(i);
                                        toast.success(`${userType} removed`);
                                    }
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserManagement;

