import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaDollarSign } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loader from "../../Loader/Loader";

const PopularClasses = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: popularClasses = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["popularClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/popular-classes");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <div className="text-center text-red-500 py-8">
        Error loading popular classes: {error.message}
      </div>
    );

  if (popularClasses.length === 0)
    return (
      <div className="text-center text-text py-8">
        No popular classes available yet.
      </div>
    );

  return (
    <section className="py-12 bg-neutral">
      <div className="container mx-auto px-4 lg:px-0">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary">
            Our Popular Classes
          </h2>
          <p className="text-lg text-text mt-2 max-w-3xl mx-auto">
            Discover our most sought-after courses taught by expert instructors.
            These classes have the highest enrollment rates and student
            satisfaction.
          </p>
          <div className="flex justify-center mt-6">
            <Link
              className="px-6 py-2 rounded-lg shadow-lg transition-all bg-secondary text-white hover:bg-secondary/80"
              to="/allClasses"
            >
              See All Classes
            </Link>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {popularClasses.map((cls) => (
            <div
              key={cls._id}
              className="card bg-base-100 shadow-lg rounded-xl overflow-hidden flex flex-col transform transition-transform duration-300 hover:scale-105 cursor-pointer w-full max-w-sm"
              onClick={() => navigate(`/enroll/${cls._id}`)}
            >
              {/* Image */}
              <figure className="h-40 w-full flex-shrink-0">
                <img
                  src={cls.image}
                  alt={cls.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Class+Image";
                  }}
                />
              </figure>

              {/* Body */}
              <div className="card-body p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-text mb-1 line-clamp-1">
                    {cls.title}
                  </h3>
                  <p className="text-text text-sm line-clamp-2 mb-2">
                    {cls.description}
                  </p>
                  <div className="flex justify-between items-center text-sm mb-3 text-text">
                    <div className="flex items-center">
                      <FaUsers className="mr-1 text-green-600" />
                      <span>{cls.totalEnrolled || 0} Enrolled</span>
                    </div>
                    <div className="flex items-center">
                      <FaDollarSign className="mr-1 text-green-600" />
                      <span className="font-semibold">{cls.price}</span>
                    </div>
                  </div>
                </div>

                {/* Enroll Button */}
                <div className="card-actions mt-auto">
                  <button className="btn bg-secondary text-white w-full hover:bg-secondary/80 transition-colors duration-300">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularClasses;
