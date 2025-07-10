import React from "react";
import { Link } from "react-router";

const BecomeInstructor = () => {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 px-4 sm:px-6 lg:px-8 text-center rounded-lg shadow-lg ">
      <div className="container mx-auto px-4 lg:px-0">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
          Inspire the Next Generation.
          <br className="hidden sm:inline" /> Become an Instructor on Mentorium.
        </h2>

        <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto opacity-90">
          Share your expertise, empower learners, and earn income on your own
          terms. Join a vibrant community dedicated to making knowledge
          accessible to all.
        </p>

        <Link
          to={"/teach"}
          className="bg-white text-blue-600 hover:bg-blue-100 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Start Teaching Today
        </Link>

        <div className="mt-8 text-sm opacity-80">
          <p>Over 10,000 instructors are already making an impact.</p>
        </div>
      </div>
    </section>
  );
};

export default BecomeInstructor;
