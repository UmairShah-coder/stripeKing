import React, { useState } from "react";
import { FaTrash, FaSearch, FaEdit, FaPlus } from "react-icons/fa";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Staff";
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "Super Admin",
    email: "admin@gmail.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Ali Khan",
    email: "ali@gmail.com",
    role: "Staff",
  },
];

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");

  const handleDelete = (id: number, role: string) => {
    if (role === "Admin") return; // ❌ Admin delete blocked

    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-4xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold golden-text mb-1">Users</h2>
          <p className="text-gray-600">Manage system users.</p>
        </div>

        {/* ADD USER BUTTON */}
        <div className="flex items-center">
          <button className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition">
            <FaPlus />
            Add User
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="relative w-full sm:w-64 mb-5">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-full
          focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 rounded-lg border-collapse">
          <thead>
            <tr className="bg-gray-100 golden-text text-center">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500 border">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition text-center">
                  <td className="px-4 py-3 border font-medium">
                    {user.name}
                  </td>

                  <td className="px-4 py-3 border text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-4 py-3 border">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.role === "Admin"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-3 border">
                    <div className="flex justify-center gap-4">
                      
                      {/* EDIT */}
                      <button
                        className="text-blue-500 hover:text-blue-600"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(user.id, user.role)}
                        disabled={user.role === "Admin"}
                        className={`${
                          user.role === "Admin"
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-red-500 hover:text-red-600"
                        }`}
                        title={
                          user.role === "Admin"
                            ? "Admin cannot be deleted"
                            : "Delete"
                        }
                      >
                        <FaTrash size={16} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
