import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaUserTag,
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaGraduationCap,
} from "react-icons/fa";
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loader from "../../Loader/Loader";

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch user details from the backend
  const {
    data: userProfile = {},
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data.data;
    },
    enabled: !!user?.email && !authLoading,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  if (isLoading || isFetching || authLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="min-h-screen p-6 bg-neutral flex justify-center items-center">
        <p className="text-red-500 text-center text-lg">
          Error loading profile: {error?.message}. Please try again later.
        </p>
      </div>
    );
  }

  // Default photo if userProfile.photo is not available
  const userPhoto =
    userProfile.photo ||
    "https://img.icons8.com/?size=100&id=124204&format=png&color=000000";
  const userRole = userProfile.role || "student"; // Default role if not defined

  return (
    <div className="min-h-screen bg-neutral py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-base-100 rounded-3xl shadow-2xl p-8 sm:p-12 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-3xl">
        <h2 className="text-4xl font-bold text-primary text-center mb-10">
          My Profile
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Profile Image Section */}
          <div className="flex-shrink-0 w-52 h-52 rounded-full overflow-hidden border-4 border-primary shadow-xl">
            <img
              src={userPhoto}
              alt={userProfile.name || "User Photo"}
              className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
              onError={(e) => {
                e.target.src =
                  "https://img.icons8.com/?size=100&id=124204&format=png&color=000000";
              }}
            />
          </div>

          {/* User Information Section */}
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-4xl font-extrabold text-secondary mb-2">
              {userProfile.name || "N/A"}
            </h3>
            <p className="text-lg text-text mb-6 flex items-center justify-center md:justify-start">
              <FaUserTag className="mr-2 text-primary text-xl" />
              Role:{" "}
              <span className="font-semibold capitalize ml-2">{userRole}</span>
            </p>

            <div className="space-y-4 text-text">
              <p className="flex items-center justify-center md:justify-start">
                <FaEnvelope className="mr-2 text-secondary text-lg" />
                Email:{" "}
                <span className="font-medium ml-2">
                  {userProfile.email || "N/A"}
                </span>
              </p>
              {userProfile.phone && (
                <p className="flex items-center justify-center md:justify-start">
                  <FaPhone className="mr-2 text-secondary text-lg" />
                  Phone:{" "}
                  <span className="font-medium ml-2">{userProfile.phone}</span>
                </p>
              )}
              {userProfile.createdAt && (
                <p className="flex items-center justify-center md:justify-start">
                  <FaCalendarAlt className="mr-2 text-secondary text-lg" />
                  Member Since:{" "}
                  <span className="font-medium ml-2">
                    {new Date(userProfile.createdAt).toLocaleDateString()}
                  </span>
                </p>
              )}
            </div>

            {/* Conditional Rendering for Teacher/Admin Specific Info */}
            {userRole === "teacher" && userProfile.teacherApplication && (
              <div className="mt-8 p-6 bg-neutral rounded-lg shadow-inner">
                <h4 className="text-xl font-semibold text-primary mb-3 flex items-center">
                  <FaChalkboardTeacher className="mr-2" /> Teacher Application
                  Details
                </h4>
                <div className="space-y-2 text-text">
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`font-medium capitalize ${
                        userProfile.teacherApplication.status === "approved"
                          ? "text-green-600"
                          : userProfile.teacherApplication.status === "pending"
                          ? "text-orange-600"
                          : "text-red-600"
                      }`}
                    >
                      {userProfile.teacherApplication.status}
                    </span>
                  </p>
                  <p>
                    <strong>Experience:</strong>{" "}
                    {userProfile.teacherApplication.experience || "N/A"}
                  </p>
                  <p>
                    <strong>Subject:</strong>{" "}
                    {userProfile.teacherApplication.category || "N/A"}
                  </p>
                  <p>
                    <strong>Applied On:</strong>{" "}
                    {new Date(
                      userProfile.teacherApplication.appliedAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}

            {userRole === "admin" && (
              <div className="mt-8 p-6 bg-neutral rounded-lg shadow-inner">
                <h4 className="text-xl font-semibold text-text mb-3 flex items-center">
                  <FaGraduationCap className="mr-2 text-secondary" />{" "}
                  Administrator Privileges
                </h4>
                <p className="text-text">
                  You have full administrative access to manage users, classes,
                  and teacher requests.
                </p>
              </div>
            )}

            {/* Edit Profile Button */}
            <div className="mt-10 text-center md:text-left">
              <button className="btn btn-lg bg-secondary text-white hover:bg-secondary/80 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
