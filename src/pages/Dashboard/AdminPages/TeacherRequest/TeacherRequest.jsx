import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import Loader from "../../../Loader/Loader";

const TeacherRequest = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: teacherRequests,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["teacherRequestsPending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/teacher-requests/pending");
      return res.data.data;
    },
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: true,
  });

  const approveMutation = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch(`/teacher-requests/${email}/approve`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Approved!",
        text: "Teacher request has been approved and user role updated.",
        icon: "success",
      });
      queryClient.invalidateQueries(["teacherRequestsPending"]);
      queryClient.invalidateQueries(["user-data"]);
      queryClient.invalidateQueries(["userRole"]);
      refetch();
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to approve request.";
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (email) => {
      const res = await axiosSecure.patch(`/teacher-requests/${email}/reject`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Rejected!",
        text: "Teacher request has been rejected.",
        icon: "info",
      });
      queryClient.invalidateQueries(["teacherRequestsPending"]);
      queryClient.invalidateQueries(["user-data"]);
      refetch();
    },
    onError: (err) => {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to reject request.";
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
      });
    },
  });

  const handleApprove = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to approve this teacher request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(email);
      }
    });
  };

  const handleReject = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this teacher request!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(email);
      }
    });
  };

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-neutral text-error text-center px-4">
        <h2 className="text-2xl font-bold">Error Loading Teacher Requests</h2>
        <p className="mt-4">{error?.message}</p>
      </div>
    );
  }

  if (!teacherRequests || teacherRequests.length === 0) {
    return (
      <div className="bg-neutral h-screen flex items-center justify-center">
        <div className="text-center py-10">
          <h2 className="text-3xl font-bold text-text">
            0 Teacher Requests Pending
          </h2>
          <p className="mt-4 text-text">
            No applications are currently awaiting review.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral min-h-screen p-4 sm:p-6 lg:p-8 w-full">
      <div className="bg-base-100 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-8 text-primary text-center">
          Manage Teacher Requests ({teacherRequests.length})
        </h2>

        {/* ✅ Horizontal Scroll Wrapper */}
        <div className="w-full overflow-x-auto rounded-lg">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-secondary/20 text-text">
              <tr>
                <th className="py-2 px-3 min-w-[120px]">Name</th>
                <th className="py-2 px-3 min-w-[100px]">Image</th>
                <th className="py-2 px-3 min-w-[120px]">Experience</th>
                <th className="py-2 px-3 min-w-[160px]">Title</th>
                <th className="py-2 px-3 min-w-[120px]">Category</th>
                <th className="py-2 px-3 min-w-[100px]">Status</th>
                <th className="py-2 px-3 min-w-[160px] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-primary text-text">
              {teacherRequests.map((request) => (
                <tr
                  key={request._id}
                  className="bg-neutral border-b border-secondary transition-all"
                >
                  <td className="py-3 px-3 truncate">{request.name}</td>
                  <td className="py-3 px-3">
                    <div className="avatar flex justify-center items-center">
                      <div className="w-10 h-10 border border-primary sm:w-12 sm:h-12 rounded-full overflow-hidden">
                        <img
                          src={
                            request.photo ||
                            "https://placehold.co/100x100/aabbcc/ffffff?text=No+Img"
                          }
                          alt={request.name}
                          className="shadow-2xl"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/100x100/aabbcc/ffffff?text=No+Img";
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 truncate">
                    {request.teacherApplication?.experience}
                  </td>
                  <td className="py-3 px-3 truncate">
                    {request.teacherApplication?.title}
                  </td>
                  <td className="py-3 px-3 truncate">
                    {request.teacherApplication?.category}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`badge text-white text-xs ${
                        request.teacherApplication?.status === "pending"
                          ? "badge-warning"
                          : request.teacherApplication?.status === "approved"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {request.teacherApplication?.status || "N/A"}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex flex-col sm:flex-row justify-center gap-2">
                      <button
                        onClick={() => handleApprove(request.email)}
                        className="btn btn-sm bg-secondary hover:bg-secondary/80 text-white text-xs"
                        disabled={
                          request.teacherApplication?.status === "approved" ||
                          request.teacherApplication?.status === "rejected" ||
                          approveMutation.isPending ||
                          rejectMutation.isPending
                        }
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(request.email)}
                        className="btn btn-sm btn-error text-white text-xs"
                        disabled={
                          request.teacherApplication?.status === "approved" ||
                          request.teacherApplication?.status === "rejected" ||
                          approveMutation.isPending ||
                          rejectMutation.isPending
                        }
                      >
                        Reject
                      </button>
                    </div>
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

export default TeacherRequest;
