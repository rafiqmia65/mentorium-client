import React from "react";
import { Link } from "react-router";

const BecomeInstructor = () => {
  return (
    <section className="relative bg-secondary/20 text-white py-10 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-0 text-center relative z-10">
        {/* Small Badge */}
        <span className="inline-block bg-white/20 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
          Ready to Inspire?
        </span>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Inspire the Next Generation
          <br className="hidden sm:inline" /> Become an Instructor on Mentorium
        </h2>

        {/* Motivational Subtitle */}
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 leading-relaxed">
          Share your expertise, create engaging courses, and empower learners
          worldwide. Transform lives while earning flexibly and joining a
          supportive teaching community.
        </p>

        {/* CTA Button */}
        <Link
          to={"/teach"}
          className="inline-block bg-secondary text-white font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 hover:bg-secondary/90"
        >
          Start Teaching Today
        </Link>

        {/* Footer Note */}
        <p className="mt-8 text-sm opacity-80">
          Over <span className="font-semibold">10,000 instructors</span> are
          already making an impact worldwide.
        </p>
      </div>

      {/* Background shapes for modern look */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
    </section>
  );
};

export default BecomeInstructor;
