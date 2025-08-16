import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUsers, FaTasks, FaCheckCircle, FaPlus } from "react-icons/fa";
import AssignmentCreateModal from "./AssignmentCreateModal/AssignmentCreateModal.jsx";
import useAxiosSecure from "../../../../Hook/useAxiosSecure.jsx";
import useAuth from "../../../../Hook/useAuth.jsx";
import Loader from "../../../Loader/Loader.jsx";

const TeacherClassDetails = () => {
  const { id: classId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false);

  // Fetch class details
  const {
    data: classDetails,
    isLoading: classLoading,
    isError: classError,
    error: classFetchError,
  } = useQuery({
    queryKey: ["classDetails", classId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${classId}`);
      return res.data.data;
    },
    enabled: !!classId,
  });

  // Fetch total enrollments for this class
  const { data: totalEnrollments = 0, isLoading: enrollmentsCountLoading } =
    useQuery({
      queryKey: ["totalEnrollments", classId],
      queryFn: async () => {
        return classDetails?.totalEnrolled || 0;
      },
      enabled: !!classDetails,
    });

  // Fetch total assignments for this class
  const {
    data: totalAssignments = 0,
    isLoading: assignmentsCountLoading,
    refetch: refetchTotalAssignments,
  } = useQuery({
    queryKey: ["totalAssignments", classId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/count/${classId}`);
      return res.data.count;
    },
    enabled: !!classId,
  });

  // Fetch total assignment submissions for this class
  const {
    data: totalSubmissions = 0,
    isLoading: submissionsCountLoading,
    refetch: refetchTotalSubmissions,
  } = useQuery({
    queryKey: ["totalSubmissions", classId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions/count/${classId}`);
      return res.data.count;
    },
    enabled: !!classId,
  });

  // No need for useForm or mutation directly in TeacherClassDetails anymore
  // The logic is moved to AssignmentCreateModal

  if (
    classLoading ||
    enrollmentsCountLoading ||
    assignmentsCountLoading ||
    submissionsCountLoading
  ) {
    return <Loader />;
  }

  if (classError) {
    return (
      <div className="min-h-screen p-6 bg-neutral flex flex-col justify-center items-center">
        <p className="text-red-500 text-center text-lg mb-4">
          Error loading class details: {classFetchError?.message}
        </p>
        <button
          onClick={() => navigate("/dashboard/myClass")}
          className="btn btn-primary"
        >
          Back to My Classes
        </button>
      </div>
    );
  }

  if (!classDetails) {
    return (
      <div className="min-h-screen p-6 bg-neutral flex justify-center items-center">
        <p className="text-text text-center text-lg">
          Class not found or no details available.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">
          Manage "{classDetails?.title}" Class
        </h2>

        {/* Class Progress Section */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold text-secondary mb-6">
            Class Progress Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Enrollment Card */}
            <div className="card bg-base-100 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center">
              <FaUsers className="text-5xl mb-3 text-primary" />
              <p className="text-4xl font-bold text-text">{totalEnrollments}</p>
              <p className="text-lg text-text">Total Enrolled Students</p>
            </div>

            {/* Total Assignment Card */}
            <div className="card bg-base-100 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center">
              <FaTasks className="text-5xl mb-3 text-primary" />
              <p className="text-4xl font-bold text-text">{totalAssignments}</p>
              <p className="text-lg text-text">Total Assignments Added</p>
            </div>

            {/* Total Assignment Submission Card */}
            <div className="card bg-base-100 shadow-lg rounded-lg p-6 flex flex-col items-center justify-center text-center">
              <FaCheckCircle className="text-5xl mb-3 text-primary" />
              <p className="text-4xl font-bold text-text">{totalSubmissions}</p>
              <p className="text-lg text-text">Total Assignment Submissions</p>
            </div>
          </div>
        </section>

        {/* Add Assignment Section */}
        <section>
          <h3 className="text-2xl font-semibold text-secondary mb-6">
            Class Assignments
          </h3>
          <div className="text-center">
            <button
              onClick={() => setShowAddAssignmentModal(true)}
              className="btn btn-primary btn-lg text-white"
            >
              <FaPlus className="mr-2" /> Add New Assignment
            </button>
          </div>

          {/* Add Assignment Modal (now a separate component) */}
          {showAddAssignmentModal && (
            <AssignmentCreateModal
              classId={classId}
              onClose={() => setShowAddAssignmentModal(false)}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default TeacherClassDetails;
