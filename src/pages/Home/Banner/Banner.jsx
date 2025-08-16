import React from "react";
import Lottie from "lottie-react";
import fallbackImage from "../../../assets/banner/banner.json";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="relative min-h-[60vh] bg-gradient-to-r from-primary/20 via-neutral/50 to-secondary/20 pt-25 pb-6  flex items-center overflow-hidden">
      {/* Decorative Floating Shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="w-72 h-72 bg-primary/20 rounded-full blur-3xl absolute top-0 left-1/4 animate-pulse-slow"></div>
        <div className="w-96 h-96 bg-secondary/20 rounded-full blur-3xl absolute bottom-0 right-1/4 animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-0 flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-bold text-text mb-6 animate-fadeIn">
            <span className="text-3xl lg:text-5xl block">Learn Smarter,</span>
            <span className="text-primary block">Achieve Faster</span>
          </h1>
          <p className="text-lg text-text mb-8 animate-fadeIn delay-200">
            Join thousands of learners worldwide and level up your skills with
            our expert-led courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/AllClasses"
              className="btn bg-secondary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-secondary/80 hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
            <Link
              to="/aboutUs"
              className="btn bg-secondary/80 text-white px-6 py-3 rounded-lg shadow hover:bg-secondary hover:scale-105 transition-all duration-300"
            >
              Learn More Mentorium
            </Link>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <div className="rounded-xl shadow-2xl overflow-hidden">
            <Lottie animationData={fallbackImage} loop={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
