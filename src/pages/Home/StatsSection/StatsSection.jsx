import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaBookOpen, FaGraduationCap } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loader from "../../Loader/Loader";

const StatsSection = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: stats = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["websiteStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/stats");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center text-red-500 py-8">
        Error loading statistics: {error.message}
      </div>
    );

  const { totalUsers = 0, totalClasses = 0, totalEnrollments = 0 } = stats;

  const statsData = [
    {
      title: "Total Users",
      value: totalUsers,
      icon: FaUsers,
      iconBg: "bg-purple-50",
    },
    {
      title: "Total Classes",
      value: totalClasses,
      icon: FaBookOpen,
      iconBg: "bg-teal-50",
    },
    {
      title: "Total Enrollments",
      value: totalEnrollments,
      icon: FaGraduationCap,
      iconBg: "bg-orange-50",
    },
  ];

  return (
    <section className="py-12 bg-neutral">
      <div className="container mx-auto px-4 lg:px-0">
        {/* Heading */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
            Our Achievements
          </h2>
          <p className="text-text/70 text-base md:text-lg leading-relaxed">
            Mentorium has grown into a vibrant learning community. Each number
            showcases the dedication of our learners and educators worldwide. We
            provide quality courses and guidance to help you achieve your goals
            efficiently.
          </p>
        </div>

        {/* Image + Stats + Description */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-10">
          {/* Image */}
          <div className="flex-1">
            <img
              src="https://i.ibb.co/jZw68fGN/library-1400313-1280.jpg"
              alt="Learning Platform Statistics"
              className="rounded-xl shadow-md w-full h-[320px] md:h-[380px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Stats + Text */}
          <div className="flex-1 flex flex-col">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {statsData.map(({ title, value, icon: Icon, iconBg }, idx) => (
                <div
                  key={idx}
                  className="rounded-xl p-4 flex flex-col items-center justify-center text-center bg-base-100 shadow-sm hover:shadow-md transform transition-transform duration-300 min-h-[180px]"
                >
                  <div
                    className={`p-3 rounded-full mb-3 inline-flex items-center justify-center bg-primary/20 shadow`}
                  >
                    <Icon className="text-3xl md:text-3xl text-primary" />
                  </div>
                  <p className="text-2xl md:text-3xl font-semibold">{value}</p>
                  <p className="text-sm mt-1 text-text">{title}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-3">
              Be Part of Our Learning Journey
            </h3>
            <p className="text-text/80 text-base md:text-lg leading-relaxed">
              Join thousands of learners achieving their goals through our
              interactive courses and expert mentorship. Our platform combines
              practical exercises, community support, and flexible learning to
              help you grow your skills and advance your career. Start your
              journey with Mentorium today.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
