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
} from "react-icons/fa"; // আইকন যোগ করা হয়েছে
import useAuth from "../../../Hook/useAuth";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loader from "../../Loader/Loader";

const Profile = () => {
  const { user, loading: authLoading } = useAuth(); // user এবং authLoading স্টেট নিন
  const axiosSecure = useAxiosSecure();

  // Fetch user details from the backend
  const {
    data: userProfile = {},
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["userProfile", user?.email], // user.email এর উপর নির্ভর করে ডেটা ফেচ হবে
    queryFn: async () => {
      if (!user?.email) return {}; // If no user email, return empty object
      console.log("Fetching user profile for:", user.email);
      const res = await axiosSecure.get(`/users/${user.email}`);
      console.log("User profile data:", res.data.data);
      return res.data.data; // Assuming res.data.data contains the user object
    },
    enabled: !!user?.email && !authLoading, // user.email থাকা এবং authLoading শেষ হওয়া পর্যন্ত কোয়েরি রান করবে না
    staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
    cacheTime: 1000 * 60 * 10, // Data stays in cache for 10 minutes
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
    <div className="min-h-screen bg-neutral py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-base-100 rounded-xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">
          My Profile
        </h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Profile Image Section */}
          <div className="flex-shrink-0 w-48 h-48 rounded-full overflow-hidden border-4 border-primary shadow-lg">
            <img
              src={userPhoto}
              alt={userProfile.name || "User Photo"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://img.icons8.com/?size=100&id=124204&format=png&color=000000"; // Fallback image
              }}
            />
          </div>

          {/* User Information Section */}
          <div className="flex-grow text-center md:text-left">
            <h3 className="text-4xl font-extrabold text-gray-900 mb-2">
              {userProfile.name || "N/A"}
            </h3>
            <p className="text-lg text-gray-600 mb-4 flex items-center justify-center md:justify-start">
              <FaUserTag className="mr-2 text-primary" />
              Role:{" "}
              <span className="font-semibold capitalize ml-1">{userRole}</span>
            </p>

            <div className="space-y-3 text-gray-700">
              <p className="flex items-center justify-center md:justify-start">
                <FaEnvelope className="mr-2 text-secondary" />
                Email:{" "}
                <span className="font-medium ml-1">
                  {userProfile.email || "N/A"}
                </span>
              </p>
              {userProfile.phone && (
                <p className="flex items-center justify-center md:justify-start">
                  <FaPhone className="mr-2 text-secondary" />
                  Phone:{" "}
                  <span className="font-medium ml-1">{userProfile.phone}</span>
                </p>
              )}
              {userProfile.createdAt && (
                <p className="flex items-center justify-center md:justify-start">
                  <FaCalendarAlt className="mr-2 text-secondary" />
                  Member Since:{" "}
                  <span className="font-medium ml-1">
                    {new Date(userProfile.createdAt).toLocaleDateString()}
                  </span>
                </p>
              )}
            </div>

            {/* Conditional Rendering for Teacher/Admin Specific Info */}
            {userRole === "teacher" && userProfile.teacherApplication && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold text-blue-800 mb-3 flex items-center">
                  <FaChalkboardTeacher className="mr-2" /> Teacher Application
                  Details
                </h4>
                <p className="text-gray-700">
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
                <p className="text-gray-700">
                  <strong>Experience:</strong>{" "}
                  {userProfile.teacherApplication.experience || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Subject:</strong>{" "}
                  {userProfile.teacherApplication.category || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Applied On:</strong>{" "}
                  {new Date(
                    userProfile.teacherApplication.appliedAt
                  ).toLocaleDateString()}
                </p>
              </div>
            )}

            {userRole === "admin" && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
                  <FaGraduationCap className="mr-2" /> Administrator Privileges
                </h4>
                <p className="text-gray-700">
                  You have full administrative access to manage users, classes,
                  and teacher requests.
                </p>
              </div>
            )}

            {/* Edit Profile Button (Optional - if you want to add this functionality later) */}
            <div className="mt-8 text-center md:text-left">
              <button className="btn btn-primary">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
