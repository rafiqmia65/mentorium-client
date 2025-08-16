import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loader from "../../Loader/Loader";
import Pagination from "./Pagination/Pagination";

const UsersList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const axiosSecure = useAxiosSecure();

  const {
    data: userData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allUsers", currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/mentorium/allUsers?page=${currentPage}&limit=${itemsPerPage}`
      );

      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-neutral">
        <Loader />
        <p className="ml-2 text-text">Loading users...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500 bg-neutral min-h-screen">
        <h2 className="text-2xl font-bold">Error Loading Users</h2>
        <p className="mt-4">Please try again later. Error: {error?.message}</p>
        <button onClick={() => refetch()} className="btn btn-primary mt-4">
          Retry
        </button>
      </div>
    );
  }

  const users = userData?.data || [];
  const totalUsers = userData?.totalCount || 0;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-neutral p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-primary mb-8 text-center">
          All Users
        </h1>
        <div className="bg-base-100 rounded-2xl shadow-xl p-6 lg:p-8">
          {users.length === 0 ? (
            <p className="text-center text-primary text-lg py-10">
              No users found.
            </p>
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="">
                    <tr>
                      <th className="py-3 px-6 text-left text-xs font-medium text-text uppercase tracking-wider rounded-tl-lg">
                        Name
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-text uppercase tracking-wider">
                        Email
                      </th>
                      <th className="py-3 px-6 text-left text-xs font-medium text-text uppercase tracking-wider rounded-tr-lg">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-neutral divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="transition-colors duration-150"
                      >
                        <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-text-text">
                          {user.name}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-text-text">
                          {user.email}
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-text-text">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${
                              user.role === "admin"
                                ? "bg-blue-100 text-blue-800"
                                : user.role === "teacher"
                                ? "bg-green-100 text-green-800"
                                : user.role === "student"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={currentPage}
                totalItems={totalUsers}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
