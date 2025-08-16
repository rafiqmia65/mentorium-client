import React from "react";
import { FaCalendarAlt, FaClock, FaVideo } from "react-icons/fa";

// Function to generate future dates dynamically
const getFutureDate = (monthsAhead) => {
  const date = new Date();
  date.setMonth(date.getMonth() + monthsAhead);
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const events = [
  {
    id: 1,
    title: "AI & Machine Learning Trends 2025",
    date: getFutureDate(1), // 1 month ahead
    time: "6:00 PM - 7:30 PM",
    speaker: "Dr. Ayesha Rahman",
    type: "Webinar",
  },
  {
    id: 2,
    title: "Building Your First React App",
    date: getFutureDate(1.5), // 1.5 months ahead
    time: "5:00 PM - 6:00 PM",
    speaker: "John Smith",
    type: "Workshop",
  },
  {
    id: 3,
    title: "Career Growth in Tech Industry",
    date: getFutureDate(2), // 2 months ahead
    time: "7:00 PM - 8:00 PM",
    speaker: "Nazia Khan",
    type: "Webinar",
  },
  {
    id: 4,
    title: "Design Thinking & UX Basics",
    date: getFutureDate(2.5), // 2.5 months ahead
    time: "4:00 PM - 5:30 PM",
    speaker: "Michael Lee",
    type: "Workshop",
  },
];

const EventsSection = () => {
  return (
    <section className="bg-neutral py-10">
      <div className="container mx-auto px-4 md:px-0">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary text-center">
          Upcoming Events & Webinars
        </h2>
        <p className="text-lg text-text/80 mb-16 max-w-3xl mx-auto text-center">
          Join our live sessions to stay updated and boost your skills.
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {events.map(({ id, title, date, time, speaker, type }) => (
            <div
              key={id}
              className="bg-base-100 rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
            >
              {/* Date */}
              <div className="flex items-center  mb-3 text-primary font-semibold">
                <FaCalendarAlt className="mr-2" /> {date}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold mb-2 text-text line-clamp-2">
                {title}
              </h3>

              {/* Time & Speaker */}
              <div className="text-text/80 mb-4 text-sm">
                <p className="flex items-center mb-1">
                  <FaClock className="mr-2" /> {time}
                </p>
                <p>Speaker: {speaker}</p>
              </div>

              {/* Type Badge */}
              <div className="mt-auto inline-flex items-center justify-center px-3 py-1 text-sm font-semibold rounded-full bg-secondary text-white shadow">
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
