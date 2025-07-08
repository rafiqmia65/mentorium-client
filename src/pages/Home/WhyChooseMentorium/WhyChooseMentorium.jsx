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
    <section className="bg-neutral py-5 px-6 md:px-12">
      <div className="container mx-auto px-4 lg:px-0 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-text mb-6">
          Why Choose <span className="text-primary">Mentorium?</span>
        </h2>
        <p className="text-lg text-text mb-16 max-w-2xl mx-auto">
          Empower your learning journey with features designed for the modern
          student.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map(({ title, description, icon: Icon }, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
              style={{
                backgroundColor: "var(--color-base-100)",
              }}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-primary mx-auto mb-4">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-text">{title}</h3>
              <p className="text-sm text-text">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMentorium;
