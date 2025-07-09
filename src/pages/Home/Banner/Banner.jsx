import React from "react";
import Lottie from "lottie-react";
import fallbackImage from "../../../assets/banner/banner.json";

const Banner = () => {
  return (
    <div className="min-h-[50vh] bg-neutral pt-16 pb-5 flex items-center">
      <div className="container mx-auto px-4 lg:px-0 flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-5xl lg:text-6xl font-bold text-text mb-6">
            Learn Smarter, <br />
            <span className="text-primary">Achieve Faster</span>
          </h1>
          <p className="text-lg text-text mb-8">
            Join thousands of learners worldwide and level up your skills with
            our expert-led courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="btn bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-content">
              Get Started
            </button>
            <button className="btn  border border-primary text-button-hover px-6 py-3 rounded-lg hover:bg-primary-content hover:text-white">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1">
          <Lottie animationData={fallbackImage} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
