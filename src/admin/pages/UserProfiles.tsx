import React, { useState, useEffect } from "react";
import { FaTrash, FaSearch, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface User {
  _id: string;
  name?: string; // optional to prevent runtime errors
  email?: string;
  role: "admin" | "staff";
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Type-safe API URL
  const API_URL = (window as any).process?.env?.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchAdmins = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        MySwal.fire({
          title: "Error",
          text: "You are not logged in",
          icon: "error",
          confirmButtonColor: "#ca0808d4",
        });
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch users");

        const data: User[] = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        MySwal.fire({
          title: "Error",
          text: "Failed to load users",
          icon: "error",
          confirmButtonColor: "#ca0808d4",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [API_URL]);

  const handleDelete = async (user: User) => {
    if (user.role === "admin") {
      return MySwal.fire({
        title: "Error!",
        text: "Admin cannot be deleted.",
        icon: "error",
        confirmButtonColor: "#ca0808d4",
      });
    }

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
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("Token missing");

        const res = await fetch(`${API_URL}/api/admin/${user._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Delete failed");

        setUsers((prev) => prev.filter((u) => u._id !== user._id));

        await MySwal.fire({
          title: "Deleted!",
          text: "User has been deleted.",
          icon: "success",
          confirmButtonColor: "#ca0808d4",
        });
      } catch (err) {
        console.error(err);
        await MySwal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#ca0808d4",
        });
      }
    }
  };

  // ✅ Optional chaining prevents "Cannot read property 'toLowerCase' of undefined"
  const filteredUsers = users.filter(
    (user) =>
      (user.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (user.email?.toLowerCase() || "").includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br mt-[-25px] from-gray-100 to-gray-200 p-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold golden-text">Role</h2>
          <p className="text-gray-600">Manage all role.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-red-600 px-5 py-3 rounded-xl shadow-lg">
            <span className="text-white font-medium">
              Total Admins: {users.length}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative w-96">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search admins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white shadow-md rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="loader border-t-4 border-red-600 w-12 h-12 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white table-auto border border-gray-300 rounded-lg border-collapse">
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
                    No admins found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 transition text-center"
                  >
                    <td className="px-4 py-3 border font-medium">{user.name || "-"}</td>
                    <td className="px-4 py-3 border text-gray-600">{user.email || "-"}</td>
    <td className="px-3 mt-2 py-1 bg-green-600 rounded-full border text-white capitalize inline-block text-center 
               shadow-[5px_5px_5px_rgba(40,197,94,7)]">
  {user.role}
</td>
                    <td className="px-4 py-3 border">
                      <div className="flex justify-center gap-4">
                        <button className="text-blue-500 hover:text-blue-600">
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          disabled={user.role === "admin"}
                          className={`${
                            user.role === "admin"
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-red-500 hover:text-red-600"
                          }`}
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
      )}
    </div>
  );
};

export default UsersPage;