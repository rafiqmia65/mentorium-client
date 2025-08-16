import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router";

const AllClasses = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [sortOrder, setSortOrder] = useState(""); // ascending | descending
  const [priceRange, setPriceRange] = useState([0, Infinity]); // initial all show

  // Fetch all approved classes
  const {
    data: allClasses = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allClasses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/allClasses");
      return res.data.data;
    },
  });

  // Filtering + Sorting
  const filteredAndSorted = useMemo(() => {
    let filtered = allClasses.filter(
      (cls) => cls.price >= priceRange[0] && cls.price <= priceRange[1]
    );

    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [allClasses, sortOrder, priceRange]);

  if (isLoading) return <Loader />;
  if (isError)
    return <p className="text-red-500 text-center">Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-neutral">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center w-full h-64 md:h-80 lg:h-96 flex items-center justify-center text-white"
        style={{
          backgroundImage: `url('https://i.ibb.co/LXDn3ttx/library-1147815-1280.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center p-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            Discover Your Next Learning Journey
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Explore a wide range of courses taught by expert instructors. Your
            path to knowledge starts here.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-0">
        <h2 className="text-3xl font-bold text-primary text-center mb-6">
          All Approved Classes ({filteredAndSorted.length})
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* LEFT SIDE FILTER (Sticky) */}
          <aside className="bg-base-100 shadow-lg p-4 rounded-lg space-y-6 lg:col-span-1 lg:sticky top-20 h-fit">
            <h3 className="text-xl font-semibold text-primary">Filters</h3>

            {/* Price Range */}
            <div>
              <label className="block mb-2 font-medium text-text">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([+e.target.value, priceRange[1]])
                  }
                  className="input input-bordered w-1/2"
                  min="0"
                />
                <input
                  type="number"
                  value={priceRange[1] === Infinity ? "" : priceRange[1]} // show blank if infinity
                  onChange={(e) =>
                    setPriceRange([
                      priceRange[0],
                      e.target.value ? +e.target.value : Infinity,
                    ])
                  }
                  className="input input-bordered w-1/2"
                  min="0"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Sorting */}
            <div>
              <label className="block mb-2 font-medium text-text">
                Sort by Price
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Default</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
          </aside>

          {/* RIGHT SIDE PRODUCTS GRID */}
          <div className="lg:col-span-3">
            {filteredAndSorted.length === 0 ? (
              <p className="text-center text-text text-lg">
                No classes found within this filter.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSorted.map((cls) => (
                  <div
                    key={cls._id}
                    className="bg-base-100 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative">
                      <img
                        src={cls.image}
                        alt={cls.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 right-2 bg-base-100 text-white px-2 py-1 font-semibold rounded-md shadow cursor-pointer">
                        ${cls.price}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-grow">
                      <h2 className="text-lg font-bold text-primary mb-1 line-clamp-1">
                        {cls.title}
                      </h2>
                      <p className="text-sm text-secondary mb-2">
                        By {cls.name}
                      </p>

                      <p className="text-text text-sm line-clamp-3 flex-grow">
                        {cls.description}
                      </p>

                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-text">
                          Enrolled:{" "}
                          <span className="text-primary font-bold">
                            {cls.totalEnrolled || 0}
                          </span>
                        </span>
                      </div>

                      <button
                        onClick={() => navigate(`/enroll/${cls._id}`)}
                        className="btn bg-secondary text-white hover:bg-secondary/80 w-full mt-4 rounded-lg"
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllClasses;
