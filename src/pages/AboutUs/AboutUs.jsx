import React from "react";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaUsers,
  FaLightbulb,
  FaHeart,
  FaBookOpen,
  FaGlobe,
} from "react-icons/fa";
import { Link } from "react-router";

const AboutUs = () => {
  // Animation variants for sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for individual items within sections
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-neutral text-text font-inter">
      {/* Hero Section */}
      <motion.section
        className="relative bg-gradient-to-r from-primary to-primary-content text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-2xl shadow-lg"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute inset-0 z-0 opacity-70">
          {/* Background pattern or subtle image */}
          <img
            src="https://i.ibb.co/BV9WVDtM/ai-generated-8225400-1280.png"
            alt="Background Pattern"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/1920x1080/007bff/ffffff?text=Background";
            }}
          />
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1
            className="text-5xl sm:text-6xl font-extrabold mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            About Us
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl font-light max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            At Mentorium, we bridge the gap between knowledge and aspiration.
            Discover our story, mission, and values.
          </motion.p>
        </div>
      </motion.section>

      {/* Our Mission Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-base-100 rounded-2xl shadow-xl mx-auto max-w-6xl -mt-16 relative z-20 mb-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold text-primary mb-4"
            variants={itemVariants}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-lg text-text max-w-2xl mx-auto"
            variants={itemVariants}
          >
            We are committed to creating high-quality, accessible, and
            personalized learning opportunities for students worldwide.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="bg-gray-50 p-8 rounded-xl shadow-md text-center border-t-4 border-blue-500 hover:shadow-lg transition-shadow duration-300"
            variants={itemVariants}
          >
            <FaGraduationCap className="text-5xl text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-secondary mb-2">
              Quality Education
            </h3>
            <p className="text-gray-700">
              We ensure that the quality of every course and instructor is of
              the highest standard, so students receive the best education.
            </p>
          </motion.div>
          <motion.div
            className="bg-gray-50 p-8 rounded-xl shadow-md text-center border-t-4 border-green-500 hover:shadow-lg transition-shadow duration-300"
            variants={itemVariants}
          >
            <FaUsers className="text-5xl text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-secondary mb-2">
              Community Building
            </h3>
            <p className="text-gray-700">
              We believe in fostering a supportive and inspiring learning
              community.
            </p>
          </motion.div>
          <motion.div
            className="bg-gray-50 p-8 rounded-xl shadow-md text-center border-t-4 border-purple-500 hover:shadow-lg transition-shadow duration-300"
            variants={itemVariants}
          >
            <FaLightbulb className="text-5xl text-purple-600 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-secondary mb-2">
              Innovative Learning
            </h3>
            <p className="text-gray-700">
              We use modern technology to make the learning process more
              effective and engaging.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div variants={itemVariants}>
            <img
              src="https://placehold.co/600x400/FF5733/FFFFFF?text=Our+Story"
              alt="Our Story"
              className="rounded-2xl shadow-xl w-full h-auto object-cover"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/600x400/FF5733/FFFFFF?text=Our+Story";
              }}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl font-bold text-primary mb-6">Our Story</h2>
            <p className="text-lg leading-relaxed mb-4">
              Mentorium began with a simple dream: to make education accessible
              to everyone. We believe that with the right guidance and
              resources, anyone can achieve their full potential. Starting as a
              small team, we have now grown into a vibrant community of
              thousands of students and teachers.
            </p>
            <p className="text-lg leading-relaxed">
              Our platform is designed to make both learning and teaching an
              enjoyable experience. We are constantly exploring new methods and
              technologies to ensure our users get the best experience.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Values Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-base-100 rounded-2xl shadow-xl mx-auto max-w-6xl my-12"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="text-center mb-12">
          <motion.h2
            className="text-4xl font-bold text-primary mb-4"
            variants={itemVariants}
          >
            Our Values
          </motion.h2>
          <motion.p
            className="text-lg text-text max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Our core values guide us in every step we take at Mentorium.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            className="flex flex-col items-center p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
            variants={itemVariants}
          >
            <FaHeart className="text-5xl text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-secondary mb-2">
              Passion
            </h3>
            <p className="text-center text-gray-700">
              We feel a deep passion for learning and teaching.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
            variants={itemVariants}
          >
            <FaBookOpen className="text-5xl text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-secondary mb-2">
              Continuous Learning
            </h3>
            <p className="text-center text-gray-700">
              We believe that learning has no end.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
            variants={itemVariants}
          >
            <FaUsers className="text-5xl text-teal-500 mb-4" />
            <h3 className="text-xl font-semibold text-secondary mb-2">
              Collaboration
            </h3>
            <p className="text-center text-gray-700">
              By working together, we become stronger.
            </p>
          </motion.div>
          <motion.div
            className="flex flex-col items-center p-6 rounded-xl shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
            variants={itemVariants}
          >
            <FaGlobe className="text-5xl text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold text-secondary mb-2">
              Accessibility
            </h3>
            <p className="text-center text-gray-700">
              Ensuring quality education for all.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-secondary to-accent text-white text-center rounded-t-2xl shadow-lg"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-bold mb-4 drop-shadow"
            variants={itemVariants}
          >
            Join Our Community!
          </motion.h2>
          <motion.p
            className="text-lg mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Start your learning journey or share your knowledge as an
            instructor.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              to="/allClasses"
              className="btn btn-lg bg-white text-secondary hover:bg-gray-100 border-none rounded-full shadow-lg hover:shadow-xl transition-all duration-300 mr-4"
            >
              Explore Classes
            </Link>
            <Link
              to="/teach"
              className="btn btn-lg bg-primary text-white hover:bg-primary-dark border-none rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Become an Instructor
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
