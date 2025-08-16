import React from "react";
import {
  FaChalkboardTeacher,
  FaBolt,
  FaGlobeAmericas,
  FaUsers,
} from "react-icons/fa";

const features = [
  {
    title: "Expert Instructors",
    description:
      "Learn from industry leaders with real-world experience in tech, business, and design.",
    icon: FaChalkboardTeacher,
  },
  {
    title: "Interactive Learning",
    description:
      "Practice with hands-on projects, quizzes, and collaborative sessions.",
    icon: FaBolt,
  },
  {
    title: "Global Community",
    description:
      "Join a global network of learners, mentors, and professionals.",
    icon: FaGlobeAmericas,
  },
  {
    title: "Flexible Learning Paths",
    description:
      "Choose your pace, switch tracks anytime, and stay on top of your goals.",
    icon: FaUsers,
  },
];

const WhyChooseMentorium = () => {
  return (
    <section className="bg-neutral py-12 ">
      <div className="container mx-auto px-4 md:px-0 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-text mb-4">
          Why Choose <span className="text-primary">Mentorium?</span>
        </h2>
        <p className="text-lg text-text/80 mb-16 max-w-3xl mx-auto">
          Empower your learning journey with features designed for the modern
          student.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ title, description, icon: Icon }, idx) => (
            <div
              key={idx}
              className="group p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-base-100 cursor-pointer"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 text-primary mx-auto mb-4 transition-transform duration-500 group-hover:scale-110">
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-text group-hover:text-primary transition-colors duration-300">
                {title}
              </h3>
              <p className="text-sm text-text/80">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMentorium;
