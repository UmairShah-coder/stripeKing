// src/components/pages/Users.tsx
import React, { useState, useEffect } from "react";
import { FaTrash, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface User {
  _id: string;
  name: string;
  email: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const deleteUser = async (id: string) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ca0808d4",
      cancelButtonColor: "#555",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:5000/api/users/${id}`, { method: "DELETE" });
        setUsers((prev) => prev.filter((user) => user._id !== id));

        await MySwal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success",
          confirmButtonColor: "#ca0808d4",
          timerProgressBar: true,
          showConfirmButton: true,
        });
      } catch (err) {
        console.error(err);
        await MySwal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#ca0808d4",
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br mt-[-25px] from-gray-100 to-gray-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold golden-text">Users</h1>
            <p className="text-gray-500 ">Manage all users.</p>
          </div>
          {/* Total Users Badge */}
  
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative w-96">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white shadow-md rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-300">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100 uppercase golden-text text-gray-800 text-center">
              <tr>
                <th className="px-4 py-3 text-sm border border-gray-300">Name</th>
                <th className="px-4 py-3 text-sm border border-gray-300">Email</th>
                <th className="px-4 py-3 text-sm border border-gray-300">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, idx) => (
                  <tr
                    key={user._id}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition`}
                  >
                    <td className="px-4 py-3 border border-gray-300 text-center font-medium">
                      {user.name}
                    </td>
                    <td className="px-4 py-3 border border-gray-300 text-center">{user.email}</td>
                    <td className="px-4 py-3 flex justify-center gap-3">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="text-red-500 hover:text-red-700 transition text-md"
                        title="Delete User"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-400 border border-gray-300">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
