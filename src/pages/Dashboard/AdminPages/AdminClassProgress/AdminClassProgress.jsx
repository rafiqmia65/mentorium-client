import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaTasks, FaCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import Loader from "../../../Loader/Loader";

const AdminClassProgress = () => {
  const { id: classId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // 1. Fetch class details
  const {
    data: classDetails,
    isLoading: classLoading,
    isError: classError,
    error: classFetchError,
  } = useQuery({
    queryKey: ["adminClassDetails", classId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${classId}`);
      return res.data.data;
    },
    enabled: !!classId,
  });

  // 2. Total Enrollments
  const { data: totalEnrollments = 0, isLoading: enrollmentsLoading } =
    useQuery({
      queryKey: ["adminEnrollmentsCount", classId],
      queryFn: async () => {
        return classDetails?.totalEnrolled || 0;
      },
      enabled: !!classDetails,
    });

  // 3. Total Assignments
  const { data: totalAssignments = 0, isLoading: assignmentsLoading } =
    useQuery({
      queryKey: ["adminAssignmentsCount", classId],
      queryFn: async () => {
        const res = await axiosSecure.get(`/assignments/count/${classId}`);
        return res.data.count;
      },
      enabled: !!classId,
    });

  // 4. Total Submissions
  const { data: totalSubmissions = 0, isLoading: submissionsLoading } =
    useQuery({
      queryKey: ["adminSubmissionsCount", classId],
      queryFn: async () => {
        const res = await axiosSecure.get(`/submissions/count/${classId}`);
        return res.data.count;
      },
      enabled: !!classId,
    });

  // 5. Handle loading state
  if (
    classLoading ||
    enrollmentsLoading ||
    assignmentsLoading ||
    submissionsLoading
  ) {
    return <Loader />;
  }

  // 6. Handle error state
  if (classError) {
    return (
      <div className="min-h-screen p-6 bg-neutral flex flex-col justify-center items-center">
        <p className="text-red-500 text-center text-lg mb-4">
          Error loading class details: {classFetchError?.message}
        </p>
        <button
          onClick={() => navigate("/dashboard/admin")}
          className="btn btn-primary"
        >
          Back to Admin Dashboard
        </button>
      </div>
    );
  }

  // 7. If no class found
  if (!classDetails) {
    return (
      <div className="min-h-screen p-6 bg-neutral flex justify-center items-center">
        <p className="text-gray-600 text-center text-lg">
          Class not found or no data available.
        </p>
      </div>
    );
  }

  //  UI
  return (
    <div className="min-h-screen bg-neutral py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-base-100 rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">
          Class Progress: "{classDetails?.title}"
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Enrollments */}
          <div className="card bg-blue-100 text-blue-800 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <FaUsers className="text-5xl mb-3" />
            <p className="text-4xl font-bold">{totalEnrollments}</p>
            <p className="text-lg">Total Enrolled Students</p>
          </div>

          {/* Assignments */}
          <div className="card bg-green-100 text-green-800 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <FaTasks className="text-5xl mb-3" />
            <p className="text-4xl font-bold">{totalAssignments}</p>
            <p className="text-lg">Total Assignments</p>
          </div>

          {/* Submissions */}
          <div className="card bg-purple-100 text-purple-800 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <FaCheckCircle className="text-5xl mb-3" />
            <p className="text-4xl font-bold">{totalSubmissions}</p>
            <p className="text-lg">Total Submissions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClassProgress;
