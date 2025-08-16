import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaBook,
  FaDollarSign,
  FaChartLine,
  FaCalendarAlt,
  FaBookOpen,
  FaGraduationCap,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Loader from "../Loader/Loader";

const Dashboard = () => {
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

  // Sample data for charts
  const enrollmentData = [
    { name: "Jan", students: 400 },
    { name: "Feb", students: 600 },
    { name: "Mar", students: 800 },
    { name: "Apr", students: 1000 },
    { name: "May", students: 1200 },
    { name: "Jun", students: 1400 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 6000 },
    { month: "Mar", revenue: 8000 },
    { month: "Apr", revenue: 10000 },
    { month: "May", revenue: 12000 },
    { month: "Jun", revenue: 14000 },
  ];

  const courseDistributionData = [
    { name: "Programming", value: 35 },
    { name: "Design", value: 25 },
    { name: "Business", value: 20 },
    { name: "Language", value: 15 },
    { name: "Other", value: 5 },
  ];

  const COLORS = ["#735557", "#dfd0b8", "#948979", "#604652", "#b2a489"];

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center text-red-500 py-8">
        Error loading statistics: {error.message}
      </div>
    );

  const { totalUsers = 0, totalClasses = 0, totalEnrollments = 0 } = stats;

  return (
    <div className="p-6 bg-neutral min-h-screen">
      <h1 className="text-4xl font-bold text-primary mb-10 text-center">
        Dashboard Overview
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 max-w-7xl mx-auto">
        {/* Total Users */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-lg flex items-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
          <div className="bg-primary/20 p-4 rounded-full mr-4">
            <FaUsers className="text-primary text-2xl" />
          </div>
          <div>
            <h3 className="text-text text-sm">Total Users</h3>
            <p className="text-3xl font-bold text-text">{totalUsers}</p>
            <p className="text-text text-sm flex items-center">
              <FaChartLine className="mr-1" /> 12% from last month
            </p>
          </div>
        </div>

        {/* Total Classes */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-lg flex items-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
          <div className="bg-primary/20 p-4 rounded-full mr-4">
            <FaBookOpen className="text-primary text-2xl" />
          </div>
          <div>
            <h3 className="text-text text-sm">Total Classes</h3>
            <p className="text-3xl font-bold text-text">{totalClasses}</p>
            <p className="text-text text-sm flex items-center">
              <FaChartLine className="mr-1" /> 5% from last month
            </p>
          </div>
        </div>

        {/* Total Enrollments */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-lg flex items-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
          <div className="bg-primary/20 p-4 rounded-full mr-4">
            <FaGraduationCap className="text-primary text-2xl" />
          </div>
          <div>
            <h3 className="text-text text-sm">Total Enrollments</h3>
            <p className="text-3xl font-bold text-text">{totalEnrollments}</p>
            <p className="text-text text-sm flex items-center">
              <FaChartLine className="mr-1" /> 8% from last month
            </p>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-lg flex items-center transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
          <div className="bg-primary/20 p-4 rounded-full mr-4">
            <FaDollarSign className="text-primary text-2xl" />
          </div>
          <div>
            <h3 className="text-text text-sm">Total Revenue</h3>
            <p className="text-3xl font-bold text-text">$24,580</p>
            <p className="text-text text-sm flex items-center">
              <FaChartLine className="mr-1" /> 15% from last month
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 max-w-7xl mx-auto">
        {/* Enrollment Trends */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-text mb-4">
            Enrollment Trends
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-neutral)" }}
                />
                <Legend />
                <Bar dataKey="students" fill="#735557" name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Growth */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-text mb-4">
            Revenue Growth
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-neutral)" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#604652"
                  fill="#604652"
                  fillOpacity={0.4}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Second Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 max-w-7xl mx-auto">
        {/* Course Distribution */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-text mb-4">
            Course Distribution
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {courseDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-neutral)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Instructor Performance */}
        <div className="bg-base-100 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-text mb-4">
            Top Instructors
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "John Doe", students: 400 },
                  { name: "Jane Smith", students: 300 },
                  { name: "Mike Johnson", students: 200 },
                  { name: "Sarah Williams", students: 150 },
                  { name: "David Brown", students: 100 },
                ]}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip
                  contentStyle={{ backgroundColor: "var(--color-neutral)" }}
                />
                <Legend />
                <Bar dataKey="students" fill="#dfd0b8" name="Students" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
