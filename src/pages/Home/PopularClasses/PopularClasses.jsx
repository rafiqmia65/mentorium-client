import React from "react";
import { useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import { FaUsers, FaDollarSign } from "react-icons/fa";
import { Link, useNavigate } from "react-router"; // Changed from react-router to react-router-dom
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

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-8">
        Error loading popular classes: {error.message}
      </div>
    );
  }

  if (popularClasses.length === 0) {
    return (
      <div className="text-center text-gray-600 py-8">
        No popular classes available yet.
      </div>
    );
  }

  return (
    <section className="py-12 bg-neutral">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-primary">
            Our Popular Classes
          </h2>
          <p className="text-lg text-text mb-8 mx-auto mt-2 max-w-3xl">
            Discover our most sought-after courses taught by expert instructors.
            These classes have the highest enrollment rates and student
            satisfaction.
          </p>
          <div className="flex justify-end">
            <Link
            className="px-4 py-2 rounded-lg shadow-lg transition-all bg-secondary text-white"
            to="/allClasses"
          >
            See All Classes
          </Link>
          </div>
        </div>

        <div className="h-[450px] overflow-y-hidden">
          <Marquee
            gradient={true}
            gradientColor={[28, 30, 33]}
            speed={50}
            pauseOnHover={true}
            className="h-full"
          >
            {popularClasses.map((cls) => (
              <div
                key={cls._id}
                className="card w-80 bg-base-100 shadow-xl mx-4 rounded-xl overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer flex flex-col h-[400px]"
                onClick={() => navigate(`/enroll/${cls._id}`)}
              >
                <figure className="h-48 w-full flex-shrink-0">
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
                <div className="card-body p-5 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h3 className="card-title text-xl font-bold text-primary mb-2 line-clamp-1">
                      {cls.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {cls.description}
                    </p>
                    <div className="flex justify-between items-center text-sm mb-4">
                      <div className="flex items-center">
                        <FaUsers className="mr-1 text-primary" />
                        <span className="text-info">
                          {cls.totalEnrolled || 0} Enrolled
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FaDollarSign className="mr-1 text-green-600" />
                        <span className="font-semibold">{cls.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-auto">
                    <button className="btn btn-primary btn-sm text-white w-full">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default PopularClasses;
