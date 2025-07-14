import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import Loader from "../../../Loader/Loader";

const AdminAllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch all classes (all status)
  const {
    data: classes = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["adminAllClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/all-classes");
      return res.data.data;
    },
  });

  // Approve/Reject Mutation
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/admin/class-status/${id}`, {
        status,
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Class status updated successfully.", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update status.", "error");
    },
  });

  const handleStatusChange = (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to change the status to ${status}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        statusMutation.mutate({ id, status });
      }
    });
  };

  if (isLoading) return <Loader></Loader>;
  if (isError) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="bg-neutral p-4 sm:p-6 lg:p-8 w-full">
      <div className="bg-base-100 min-h-screen p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-primary text-center">
          Manage All Classes
        </h2>

        <div className="overflow-x-auto rounded-lg">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-secondary text-gray-700">
              <tr>
                <th className="py-2 px-3 min-w-[50px]">#</th>
                <th className="py-2 px-3 min-w-[100px]">Image</th>
                <th className="py-2 px-3 min-w-[120px]">Title</th>
                <th className="py-2 px-3 min-w-[150px]">Email</th>
                <th className="py-2 px-3 min-w-[200px]">Description</th>
                <th className="py-2 px-3 min-w-[100px]">Status</th>
                <th className="py-2 px-3 min-w-[180px] md:min-w-[220px] text-center">
                  Actions
                </th>
                <th className="py-2 px-3 min-w-[120px] text-center">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="bg-primary text-text">
              {classes.map((cls, idx) => (
                <tr
                  key={cls._id}
                  className="border-b bg-neutral border-secondary transition"
                >
                  <td className="py-3 px-3">{idx + 1}</td>
                  <td className="py-3 px-3">
                    <img
                      src={cls.image}
                      alt={cls.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-3 px-3 whitespace-normal">{cls.title}</td>
                  <td className="py-3 px-3 whitespace-normal">{cls.email}</td>
                  <td className="py-3 px-3 whitespace-normal">
                    {cls.description.length > 60
                      ? `${cls.description.substring(0, 50)}...`
                      : cls.description}
                  </td>
                  <td className="py-3 px-3 whitespace-normal">
                    <span
                      className={`badge ${
                        cls.status === "approved"
                          ? "badge-success"
                          : cls.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {cls.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2">
                      <button
                        onClick={() => handleStatusChange(cls._id, "approved")}
                        className="btn btn-sm bg-secondary text-white text-xs sm:text-sm w-full sm:w-auto flex-shrink-0"
                        disabled={
                          cls.status === "approved" || statusMutation.isPending
                        }
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(cls._id, "rejected")}
                        className="btn btn-sm btn-error text-white text-xs sm:text-sm w-full sm:w-auto flex-shrink-0"
                        disabled={
                          cls.status === "rejected" || statusMutation.isPending
                        }
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/admin/class-progress/${cls._id}`)
                      }
                      className="btn btn-sm btn-accent text-white text-xs sm:text-sm w-full flex-shrink-0"
                      disabled={cls.status !== "approved"}
                    >
                      Progress
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

export default AdminAllClasses;
