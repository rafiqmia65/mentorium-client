import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  FaChalkboardTeacher,
  FaDollarSign,
  FaUsers,
  FaChair,
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
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

  // Animation variants for a smoother look
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const instructor = classDetails.instructor;

  const descriptionLimit = 200;
  const truncatedDescription =
    classDetails.description?.length > descriptionLimit
      ? classDetails.description.substring(0, descriptionLimit) + "..."
      : classDetails.description;

  return (
    <div className="bg-neutral min-h-screen pt-20 pb-10 ">
      <motion.div
        className="container mx-auto px-4 lg:px-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3 text-text">
            <li>
              <a href="/" className="hover:text-primary transition-colors">
                Home
              </a>
            </li>
            <li>
              <span className="mx-2 text-text">/</span>
              <a
                href="/allClasses"
                className="hover:text-primary transition-colors"
              >
                All Classes
              </a>
            </li>
            <li aria-current="page">
              <span className="mx-2 text-text">/</span>
              <span className="text-primary font-medium">
                {classDetails.title}
              </span>
            </li>
          </ol>
        </nav>

        {/* Main Content: Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Class Info */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div
              className="bg-base-100 rounded-3xl shadow-xl p-8"
              variants={itemVariants}
            >
              {/* Class Image */}
              <div className="rounded-2xl overflow-hidden shadow-md w-full h-[300px] sm:h-[400px] mb-8">
                <img
                  className="w-full h-full object-cover"
                  src={classDetails.image}
                  alt={classDetails.title}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/800x400?text=Class+Image";
                  }}
                />
              </div>

              {/* Class Title & Details */}
              <h1 className="text-4xl lg:text-5xl font-extrabold text-primary mb-4">
                {classDetails.title}
              </h1>
              <p className="text-lg text-secondary font-medium mb-6">
                {classDetails.category}
              </p>

              {/* Description */}
              <div className="prose max-w-none text-text">
                <p>
                  {showFullDescription
                    ? classDetails.description
                    : truncatedDescription}
                </p>
              </div>
              {classDetails.description?.length > descriptionLimit && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="btn btn-link text-secondary text-sm flex items-center mt-4"
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
            </motion.div>
          </div>

          {/* Right Column: Instructor, Stats & Enroll Button */}
          <div className="lg:col-span-1 space-y-10">
            {/* Instructor Card */}
            {instructor && (
              <motion.div
                className="bg-base-100 rounded-3xl shadow-xl p-8"
                variants={itemVariants}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-primary">
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
                  <h3 className="text-2xl font-bold text-primary mb-1">
                    {instructor?.name}
                  </h3>
                  <p className="text-sm text-text mb-4">
                    Instructor of {classDetails.category}
                  </p>

                  <div className="flex items-center text-text mb-2">
                    <FaEnvelope className="mr-2" />
                    <span className="text-sm">
                      {instructor?.email || "N/A"}
                    </span>
                  </div>
                  {instructor?.phone && (
                    <div className="flex items-center text-text">
                      <FaPhone className="mr-2" />
                      <span className="text-sm">{instructor.phone}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Price, Enrolled, Seats Stats Card */}
            <motion.div
              className="bg-base-100 rounded-3xl shadow-xl p-8"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-primary mb-6 text-center">
                Class Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-primary/10 rounded-xl">
                  <span className="p-3 bg-primary rounded-full text-white">
                    <FaDollarSign className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm text-text">Price</p>
                    <p className="text-xl font-semibold text-primary">
                      ${classDetails.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-secondary/10 rounded-xl">
                  <span className="p-3 bg-secondary rounded-full text-white">
                    <FaUsers className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm text-text">Students Enrolled</p>
                    <p className="text-xl font-semibold text-secondary">
                      {classDetails.totalEnrolled || 0}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-primary/10 rounded-xl">
                  <span className="p-3 bg-primary rounded-full text-white">
                    <FaChair className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm text-text">Available Seats</p>
                    <p className="text-xl font-semibold text-primary">
                      {classDetails.availableSeats}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enroll Button */}
            <motion.div variants={itemVariants}>
              <button
                onClick={handleEnroll}
                disabled={isUserAlreadyEnrolled}
                className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all transform hover:scale-105 shadow-lg ${
                  isUserAlreadyEnrolled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-primary to-secondary"
                }`}
              >
                {isUserAlreadyEnrolled ? (
                  <span>Already Enrolled</span>
                ) : (
                  <span>Enroll Now</span>
                )}
              </button>
              {isUserAlreadyEnrolled ? (
                <p className="text-center text-sm text-text mt-3">
                  You are already a student in this class.
                </p>
              ) : (
                <p className="text-center text-sm text-text mt-3">
                  Secure your spot now!
                </p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        <motion.div
          className="mt-16 bg-base-100 rounded-3xl shadow-xl p-8"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Student Reviews
          </h2>
          {classFeedbacks.length === 0 ? (
            <p className="text-center text-text text-lg italic">
              No reviews available for this class yet. Be the first to leave
              one!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classFeedbacks.map((feedback) => (
                <div
                  key={feedback._id}
                  className="bg-neutral rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-secondary flex-shrink-0">
                      <img
                        src={
                          feedback.studentPhoto ||
                          "https://img.icons8.com/?size=100&id=124204&format=png&color=000000"
                        }
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
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-sm ${
                              feedback.rating > i
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-text italic leading-relaxed text-sm">
                    "{feedback.description}"
                  </p>
                  <p className="text-xs text-gray-500 mt-3">
                    Reviewed on:{" "}
                    {new Date(feedback.submittedAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ClassDetails;
