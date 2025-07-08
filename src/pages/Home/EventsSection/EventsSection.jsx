import React from "react";
import { FaCalendarAlt, FaClock, FaVideo } from "react-icons/fa";

const events = [
  {
    id: 1,
    title: "AI & Machine Learning Trends 2025",
    date: "Aug 20, 2025",
    time: "6:00 PM - 7:30 PM",
    speaker: "Dr. Ayesha Rahman",
    type: "Webinar",
  },
  {
    id: 2,
    title: "Building Your First React App",
    date: "Aug 27, 2025",
    time: "5:00 PM - 6:00 PM",
    speaker: "John Smith",
    type: "Workshop",
  },
  {
    id: 3,
    title: "Career Growth in Tech Industry",
    date: "Sep 3, 2025",
    time: "7:00 PM - 8:00 PM",
    speaker: "Nazia Khan",
    type: "Webinar",
  },
  {
    id: 4,
    title: "Design Thinking & UX Basics",
    date: "Dec 10, 2025",
    time: "4:00 PM - 5:30 PM",
    speaker: "Michael Lee",
    type: "Workshop",
  },
];

const EventsSection = () => {
  return (
    <section
      className="bg-neutral py-20 px-6 md:px-12"
      style={{ backgroundColor: "var(--color-neutral)" }}
    >
      <div className="max-w-7xl mx-auto">
        <h2
          className="text-4xl font-bold mb-6 text-center"
          style={{ color: "var(--color-text)" }}
        >
          Upcoming Events & Webinars
        </h2>
        <p className="mb-12 max-w-3xl mx-auto text-center text-text">
          Join our live sessions to stay updated and boost your skills.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {events.map(({ id, title, date, time, speaker, type }) => (
            <div
              key={id}
              className="rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer"
              style={{ backgroundColor: "var(--color-base-100)" }}
            >
              <div
                className="flex items-center mb-3 font-semibold"
                style={{ color: "var(--color-primary)" }}
              >
                <FaCalendarAlt className="mr-2" /> {date}
              </div>
              <h3
                className="text-xl font-semibold mb-2"
                style={{ color: "var(--color-text)" }}
              >
                {title}
              </h3>
              <p className="mb-2 text-text">
                <FaClock className="inline mr-1" /> {time}
              </p>
              <p className="mb-4 text-text">Speaker: {speaker}</p>
              <div className="inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full bg-primary text-white">
                <FaVideo className="mr-2" /> {type}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
