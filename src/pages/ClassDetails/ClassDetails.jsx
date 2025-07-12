import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router";
import {
  FaChalkboardTeacher,
  FaEnvelope,
  FaDollarSign,
  FaUsers,
  FaChair,
} from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { motion } from "framer-motion";

const ClassDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch class details including instructor information
  const {
    data: classDetails = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["classDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${id}`);
      // Fetch instructor details separately
      const instructorRes = await axiosSecure.get(
        `/users/${res.data.data.email}`
      );
      return {
        ...res.data.data,
        instructor: instructorRes.data.data,
      };
    },
  });

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="min-h-screen p-6 bg-gray-50 flex justify-center items-center">
        <p className="text-red-500 text-center text-lg">
          Error loading class details: {error.message}
        </p>
      </div>
    );
  }

  const handleEnroll = () => {
    navigate(`/payment/${id}`);
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

  return (
    <div className="min-h-screen bg-neutral py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
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

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Class Image - Updated with fixed height */}
          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-xl h-[500px]"
            variants={itemVariants}
          >
            <img
              className="w-full h-full object-cover"
              src={classDetails.image}
              alt={classDetails.title}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/500x500?text=Class+Image";
              }}
            />
            <div className="absolute top-4 right-4 bg-base-100 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
              <span className="text-sm font-semibold text-gray-800">
                {classDetails.category}
              </span>
            </div>
          </motion.div>

          {/* Class Details */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8"
            variants={itemVariants}
          >
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {classDetails.title}
                </h1>
                <p className="text-gray-500 mb-6">{classDetails.description}</p>
              </div>
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                ${classDetails.price}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gray-100 mr-3">
                  <FaChalkboardTeacher className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Instructor</p>
                  <p className="font-medium">{classDetails.name}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gray-100 mr-3">
                  <FaEnvelope className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="font-medium">{classDetails.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-gray-100 mr-3">
                    <FaUsers className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Enrolled</p>
                    <p className="font-medium">
                      {classDetails.totalEnrolled || 0} students
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-gray-100 mr-3">
                    <FaChair className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Seats</p>
                    <p
                      className={`font-medium ${
                        classDetails.availableSeats <= 0 ? "text-red-500" : ""
                      }`}
                    >
                      {classDetails.availableSeats} available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                What you'll learn
              </h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Master the fundamentals of {classDetails.category}</li>
                <li>Hands-on projects and exercises</li>
                <li>Personalized feedback from instructor</li>
                <li>Lifetime access to course materials</li>
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEnroll}
              disabled={classDetails.availableSeats <= 0}
              className={`w-full py-3 px-6 rounded-xl font-bold text-white transition-all ${
                classDetails.availableSeats <= 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary to-primary-content hover:shadow-lg"
              }`}
            >
              {classDetails.availableSeats > 0 ? (
                <span className="flex items-center justify-center">
                  Enroll Now for ${classDetails.price}
                </span>
              ) : (
                "Class Full - Join Waitlist"
              )}
            </motion.button>

            {classDetails.availableSeats > 0 && (
              <p className="text-center text-sm text-gray-500 mt-3">
                Secure your spot now! Only {classDetails.availableSeats} seats
                remaining.
              </p>
            )}
          </motion.div>
        </motion.div>

        {/* Instructor Section */}
        {classDetails.instructor && (
          <motion.div
            className="mt-12 bg-white rounded-2xl shadow-xl p-8"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              About the Instructor
            </h2>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={
                    classDetails.instructor?.photo ||
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
              <div className="flex-1">
                <h3 className="text-xl font-semibold">
                  {classDetails.instructor?.name || classDetails.name}
                </h3>
                <p className="text-primary mb-2">
                  Professional {classDetails.category} Instructor
                </p>
                <p className="text-gray-600 mb-4">
                  {classDetails.instructor?.teacherApplication?.experience
                    ? `With ${
                        classDetails.instructor.teacherApplication.experience
                      } of experience in teaching ${classDetails.category}, ${
                        classDetails.instructor.name.split(" ")[0]
                      } has helped numerous students master this subject.`
                    : `Experienced ${classDetails.category} instructor with a passion for teaching and helping students succeed.`}
                </p>
                <div className="flex items-center text-gray-500">
                  <IoIosTime className="mr-1" />
                  <span className="text-sm">
                    Last updated:{" "}
                    {new Date(
                      classDetails.instructor?.createdAt || new Date()
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ClassDetails;
