import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch all approved classes
  const {
    data: allClasses = [],
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/allClasses");
        return res.data.data;
      } catch (err) {
        console.error(
          "Error fetching allClasses:",
          err.response || err.message
        );
        throw err;
      }
    },
    staleTime: 0,
    cacheTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 1,
  });

  if (isLoading || isFetching) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="min-h-screen p-6 bg-neutral flex justify-center items-center">
        <p className="text-red-500 text-center text-lg">
          Error loading classes: {error.message}. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral">
      <div
        className="relative bg-cover bg-center w-full h-64 md:h-80 lg:h-96 flex items-center justify-center text-white"
        style={{
          backgroundImage: `url('https://i.ibb.co/LXDn3ttx/library-1147815-1280.jpg')`,
        }}
      >
        <div className="absolute pt-5 inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center p-4">
          <h1 className="text-4xl md:text-5xl  lg:text-6xl font-extrabold mb-4 leading-tight">
            Discover Your Next Learning Journey
          </h1>
          <p className="text-lg md:text-xl  max-w-2xl mx-auto">
            Explore a wide range of courses taught by expert instructors. Your
            path to knowledge starts here.
          </p>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4  sm:px-6 lg:px-0">
        <h2 className="text-3xl font-bold text-primary text-center mb-6">
          All Approved Classes ({allClasses.length})
        </h2>

        {allClasses.length === 0 ? (
          <p className="text-center text-text text-lg">
            No approved classes available yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allClasses.map((cls) => (
              <div
                key={cls._id}
                className="bg-base-100 shadow-xl p-4 rounded-xl space-y-3 flex flex-col"
              >
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <div className="flex justify-between items-center text-secondary">
                  <p className="text-text">
                    <strong>Price:</strong> ${cls.price}
                  </p>
                  <p className="text-text">
                    <strong>Total Enrolled:</strong> {cls.totalEnrolled || 0}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl text-primary font-semibold mb-1">
                    {cls.title}
                  </h2>
                  <p className="text-text">
                    <strong>Instructor:</strong> {cls.name}
                  </p>
                </div>

                <p className="line-clamp-3 text-text flex-grow">
                  <strong>Description:</strong> {cls.description}
                </p>

                <button
                  onClick={() => navigate(`/enroll/${cls._id}`)}
                  className="btn bg-primary text-white hover:bg-primary-content w-full mt-auto"
                >
                  Enroll
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllClasses;
