import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  FaChalkboardTeacher,
  FaEnvelope,
  FaDollarSign,
  FaUsers,
  FaChair,
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaPhone,
} from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { motion } from "framer-motion";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import useAuth from "../../Hook/useAuth";
import Loader from "../Loader/Loader";

const ClassDetails = () => {
  const { id: classId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [showFullDescription, setShowFullDescription] = useState(false);

  // Fetch class details including instructor information
  const {
    data: classDetails = {},
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

  // Fetch feedbacks for this specific class
  const {
    data: classFeedbacks = [],
    isLoading: feedbacksLoading,
    isError: feedbacksError,
    error: feedbacksFetchError,
  } = useQuery({
    queryKey: ["classFeedbacks", classId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/feedbacks/class/${classId}`);
      return res.data.data;
    },
    enabled: !!classId,
  });

  // Fetch user's enrolled classes to check if already enrolled
  const {
    data: enrolledClasses = [],
    isLoading: enrolledClassesLoading,
    isError: enrolledClassesError,
    error: enrolledClassesFetchError,
  } = useQuery({
    queryKey: ["enrolledClasses", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosSecure.get(
        `/users/${user.email}/enrolled-classes`
      );
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  // Determine if the current user is already enrolled in this class
  const isUserAlreadyEnrolled = enrolledClasses.some(
    (enrolledClass) => enrolledClass._id === classId
  );

  if (classLoading || feedbacksLoading || enrolledClassesLoading)
    return <Loader />;

  if (classError || feedbacksError || enrolledClassesError) {
    return (
      <div className="min-h-screen p-6 bg-neutral flex justify-center items-center">
        <p className="text-red-500 text-center text-lg">
          Error loading class details or feedbacks:{" "}
          {classFetchError?.message ||
            feedbacksFetchError?.message ||
            enrolledClassesFetchError?.message}
        </p>
      </div>
    );
  }

  const handleEnroll = () => {
    navigate(`/payment/${classId}`);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const instructor = classDetails.instructor;

  // Description truncation logic
  const descriptionLimit = 200;
  const truncatedDescription =
    classDetails.description?.length > descriptionLimit
      ? classDetails.description.substring(0, descriptionLimit) + "..."
      : classDetails.description;

  return (
    <div className="min-h-screen bg-neutral py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary"
              >
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="/allClasses"
                  className="ml-1 text-sm font-medium text-gray-500 hover:text-primary md:ml-2"
                >
                  Classes
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-700 md:ml-2">
                  {classDetails.title}
                </span>
              </div>
            </li>
          </ol>
        </nav>
        {/* Instructor Section - Moved to Top */}
        {instructor && (
          <motion.div
            className="mb-12 bg-base-100 rounded-2xl shadow-xl p-8 flex flex-col md:flex-row gap-6 items-center md:items-start"
            variants={itemVariants}
          >
            <div className="w-28 h-28 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border-4 border-primary">
              <img
                src={
                  instructor?.photo ||
                  "https://img.icons8.com/?size=100&id=124204&format=png&color=000000"
                }
                alt="Instructor"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://img.icons8.com/?size=100&id=124204&format=png&color=000000";
                }}
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-primary mb-2">
                About the Instructor
              </h2>
              <h3 className="text-xl font-semibold text-secondary">
                {instructor?.name || classDetails.name}
              </h3>
              <p className="text-text mb-2">
                {instructor?.teacherApplication?.experience
                  ? `With ${
                      instructor.teacherApplication.experience
                    } of experience in teaching ${classDetails.category}, ${
                      instructor.name.split(" ")[0]
                    } has helped numerous students master this subject.`
                  : `Experienced ${classDetails.category} instructor with a passion for teaching and helping students succeed.`}
              </p>
              <div className="flex items-center justify-center md:justify-start text-text">
                <FaEnvelope className="mr-2" />
                <span className="text-sm">{instructor?.email || "N/A"}</span>
              </div>
              {instructor?.phone && (
                <div className="flex items-center justify-center md:justify-start text-gray-500 mt-1">
                  <FaPhone className="mr-2" />
                  <span className="text-sm">{instructor.phone}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
        {/* Main Class Details Section - Single Column */}
        <motion.div
          className="bg-base-100 rounded-2xl shadow-xl p-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Class Image */}
          <div className="relative rounded-xl overflow-hidden shadow-md w-full h-[400px] mb-6">
            {" "}
            {/* Fixed height */}
            <img
              className="w-full h-full object-cover"
              src={classDetails.image}
              alt={classDetails.title}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/800x400?text=Class+Image"; // Larger placeholder
              }}
            />
            <div className="absolute top-4 right-4 bg-base-100 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
              <span className="text-sm font-semibold text-primary">
                {classDetails.category}
              </span>
            </div>
          </div>

          {/* Class Title */}
          <h1 className="text-4xl font-bold text-primary mb-3 text-center lg:text-left">
            {classDetails.title}
          </h1>

          {/* Description with See More/Less */}
          <p className="text-text mb-4 text-center lg:text-left">
            {showFullDescription
              ? classDetails.description
              : truncatedDescription}
          </p>
          {classDetails.description?.length > descriptionLimit && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="btn btn-link text-secondary text-sm mb-6 flex items-center mx-auto lg:mx-0"
            >
              {showFullDescription ? (
                <>
                  See Less <FaChevronUp className="ml-1" />
                </>
              ) : (
                <>
                  See More <FaChevronDown className="ml-1" />
                </>
              )}
            </button>
          )}

          {/* Enrollment Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {" "}
            <div className="flex items-center bg-blue-50 text-blue-800 rounded-lg p-4 shadow-sm">
              {" "}
              <div className="p-2 rounded-full bg-blue-100 mr-3">
                <FaDollarSign className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-700">Price</p>
                <p className="font-medium text-xl text-blue-900">
                  ${classDetails.price}
                </p>
              </div>
            </div>
            <div className="flex items-center bg-green-50 text-green-800 rounded-lg p-4 shadow-sm">
              {" "}
              <div className="p-2 rounded-full bg-green-100 mr-3">
                <FaUsers className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-green-700">Students Enrolled</p>
                <p className="font-medium">
                  {classDetails.totalEnrolled || 0} students
                </p>
              </div>
            </div>
            <div className="flex items-center bg-yellow-50 text-yellow-800 rounded-lg p-4 shadow-sm">
              {" "}
              <div className="p-2 rounded-full bg-yellow-100 mr-3">
                <FaChair className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-yellow-700">Available Seats</p>
                <p className={`font-medium`}>
                  {classDetails.availableSeats} available
                </p>
              </div>
            </div>
          </div>

          {/* What you'll learn */}
          <div className="bg-purple-50 text-purple-800 rounded-lg p-6 mb-8 shadow-sm">
            {" "}
            <h3 className="font-semibold text-purple-900 mb-3 text-xl">
              What you'll learn
            </h3>
            <ul className="list-disc list-inside space-y-2 text-purple-700">
              <li>Master the fundamentals of {classDetails.category}</li>
              <li>Hands-on projects and exercises</li>
              <li>Personalized feedback from instructor</li>
              <li>Lifetime access to course materials</li>
            </ul>
          </div>

          {/* Enroll Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleEnroll}
            disabled={isUserAlreadyEnrolled}
            className={`w-full py-3 px-6 rounded-xl cursor-pointer font-bold text-white transition-all ${
              isUserAlreadyEnrolled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-primary to-primary-content hover:shadow-lg"
            }`}
          >
            {isUserAlreadyEnrolled ? (
              <span className="flex items-center justify-center">
                Already Enrolled
              </span>
            ) : (
              <span className="flex items-center justify-center">
                Enroll Now for ${classDetails.price}
              </span>
            )}
          </motion.button>

          {isUserAlreadyEnrolled ? (
            <p className="text-center text-sm text-gray-500 mt-3">
              You are already a student in this class.
            </p>
          ) : (
            <p className="text-center text-sm text-gray-500 mt-3">
              Secure your spot now!
            </p>
          )}
        </motion.div>
        {/* Class Reviews Section - At the bottom */}
        <motion.div
          className="mt-12 bg-base-100 rounded-2xl shadow-xl p-8"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-secondary mb-6 text-center">
            Student Reviews for "{classDetails.title}"
          </h2>
          {classFeedbacks.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">
              No reviews available for this class yet. Be the first to leave
              one!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classFeedbacks.map((feedback) => (
                <div
                  key={feedback._id}
                  className="bg-neutral rounded-lg p-5 shadow-sm"
                >
                  <div className="flex items-center mb-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3 border-2 border-secondary">
                      <img
                        src={feedback.studentPhoto}
                        alt={feedback.studentName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://img.icons8.com/?size=100&id=124204&format=png&color=000000";
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-primary">
                        {feedback.studentName}
                      </p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-sm ${
                              feedback.rating && feedback.rating > i
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-text text-sm italic">
                    "{feedback.description}"
                  </p>
                  <p className="text-xs text-text mt-2">
                    Reviewed on:{" "}
                    {new Date(feedback.submittedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ClassDetails;
