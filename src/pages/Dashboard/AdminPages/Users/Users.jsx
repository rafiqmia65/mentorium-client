import React, { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../../Loader/Loader";
import debounce from "lodash.debounce";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  // Debounced state update function
  const handleDebouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 500),
    []
  );

  // Search handler
  const handleSearchChange = (e) => {
    handleDebouncedSearch(e.target.value);
  };

  // Fetch users with search
  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allUsers?search=${search}`);
      return res.data.data;
    },
    enabled: true,
  });

  // Make admin mutation
  const makeAdminMutation = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch(`/users/make-admin/${email}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success!", "User has been promoted to admin.", "success");
      queryClient.invalidateQueries(["allUsers"]);
      refetch();
    },
    onError: (err) => {
      Swal.fire("Error", err.message || "Failed to make admin.", "error");
    },
  });

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center text-red-500">
        <p>Error loading users: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="bg-neutral p-4 sm:p-6 lg:p-8 w-full">
      <div className="bg-base-100 min-h-screen p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-primary text-center">
          All Users ({users.length})
        </h2>

        {/* Search Input */}
        <div className="mb-6 flex justify-left">
          <input
            type="text"
            placeholder="Search by name or email"
            onChange={handleSearchChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-secondary text-gray-700">
              <tr>
                <th className="py-2 px-3 min-w-[120px]">Name</th>
                <th className="py-2 px-3 min-w-[200px]">Email</th>
                <th className="py-2 px-3 min-w-[100px]">Image</th>
                <th className="py-2 px-3 min-w-[100px] text-center">Role</th>
                <th className="py-2 px-3 min-w-[120px] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="bg-neutral text-text">
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-secondary transition"
                >
                  <td className="py-3 px-3">{user.name}</td>
                  <td className="py-3 px-3">{user.email}</td>
                  <td className="py-3 px-3">
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover bg-accent p-1"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://placehold.co/100x100/aaa/fff?text=No+Img";
                      }}
                    />
                  </td>
                  <td className="py-3 px-3 text-center capitalize">
                    {user.role}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "Do you really want to make this user an admin?",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, make admin!",
                          cancelButtonText: "Cancel",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            makeAdminMutation.mutate(user.email);
                          }
                        });
                      }}
                      disabled={user.role === "admin"}
                      className="btn btn-sm btn-success text-white"
                    >
                      {user.role === "admin" ? "Admin" : "Make Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
