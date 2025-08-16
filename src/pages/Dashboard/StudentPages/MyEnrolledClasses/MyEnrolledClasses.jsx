import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useAuth from "../../../../Hook/useAuth";
import Loader from "../../../Loader/Loader";

const MyEnrolledClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: enrolledClasses = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["enrolledClasses", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      try {
        const res = await axiosSecure.get(
          `/users/${user.email}/enrolled-classes`
        );
        return res.data.data || [];
      } catch (err) {
        throw new Error(
          err.response?.data?.message || "Failed to fetch enrolled classes"
        );
      }
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="min-h-screen p-6 bg-neutral flex flex-col justify-center items-center">
        <p className="text-red-500 text-center text-lg mb-4">
          Error loading enrolled classes: {error.message}
        </p>
        <button onClick={() => refetch()} className="btn btn-primary">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-primary mb-8">
          My Enrolled Classes
        </h2>

        {enrolledClasses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-text mb-4">
              You haven't enrolled in any classes yet.
            </p>
            <Link
              to="/allClasses"
              className="btn bg-primary text-white hover:bg-primary-content"
            >
              Browse Available Classes
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {enrolledClasses.map((classItem) => (
              <div
                key={classItem._id}
                className="bg-base-100 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={
                      classItem.image || "https://via.placeholder.com/300x200"
                    }
                    alt={classItem.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x200";
                    }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-bold mb-2 text-primary">
                    {classItem.title}
                  </h3>

                  <p className="text-text mb-4">
                    Instructor: {classItem.instructorName || classItem.name}
                  </p>

                  <div className="text-sm text-text mb-4">
                    <p>
                      Enrolled:{" "}
                      {new Date(classItem.enrollmentDate).toLocaleDateString()}
                    </p>
                    <p>Price: ${(classItem.amountPaid / 100).toFixed(2)}</p>
                  </div>

                  {/* Button always bottom */}
                  <div className="mt-auto">
                    <Link
                      to={`/dashboard/continueClass/${classItem._id}`}
                      className="btn bg-secondary w-full text-white hover:bg-secondary/80"
                    >
                      Continue Learning
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEnrolledClasses;
