import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loader from "../../Loader/Loader";

const FeedbackSectionMarquee = () => {
  const axiosSecure = useAxiosSecure();
  const marqueeRef = useRef(null);

  const {
    data: feedbacks = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/feedbacks");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <div className="text-center text-red-500 py-8">
        Error loading feedbacks: {error.message}
      </div>
    );

  if (feedbacks.length === 0)
    return (
      <div className="text-center text-text py-8">
        No feedback available yet.
      </div>
    );

  // Function to pause/resume marquee
  const toggleMarquee = (pause) => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = pause
        ? "paused"
        : "running";
    }
  };

  return (
    <section className="py-10 bg-neutral overflow-hidden">
      <div className="container mx-auto px-4 lg:px-0">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          What Our Students Say
        </h2>
        <p className="text-center text-text/80 mb-10 max-w-2xl mx-auto">
          Hear from our students about their learning journey and achievements
          on Mentorium.
        </p>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          <div
            ref={marqueeRef}
            className="flex animate-marquee gap-6"
            style={{ width: `${feedbacks.length * 300}px` }}
          >
            {feedbacks.concat(feedbacks).map((feedback, idx) => (
              <FeedbackCard
                key={idx}
                feedback={feedback}
                onToggleMarquee={toggleMarquee}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Animation */}
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 30s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default FeedbackSectionMarquee;

// ----------------------------
// 🔹 Feedback Card
const FeedbackCard = ({ feedback, onToggleMarquee }) => {
  return (
    <div className="bg-base-100 rounded-xl shadow-md p-4 flex flex-col items-center text-center min-w-[260px] max-w-[260px] hover:shadow-lg transition-shadow duration-300">
      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary mb-3">
        <img
          src={feedback.studentPhoto}
          alt={feedback.studentName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src =
              "https://img.icons8.com/?size=100&id=124204&format=png&color=000000";
          }}
        />
      </div>
      <h3 className="text-lg font-semibold text-primary mb-1">
        {feedback.studentName}
      </h3>
      <p className="text-sm text-text mb-2">
        Class: <span className="font-medium">{feedback.className}</span>
      </p>
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-sm ${
              feedback.rating && feedback.rating > i
                ? "text-primary"
                : "text-secondary/50"
            }`}
          />
        ))}
      </div>
      <FeedbackDescription
        text={feedback.description}
        onToggleMarquee={onToggleMarquee}
      />
    </div>
  );
};

// ----------------------------
// 🔹 Description Toggle
const FeedbackDescription = ({ text, onToggleMarquee }) => {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 50; // limit characters

  const toggleText = () => {
    const newState = !expanded;
    setExpanded(newState);
    if (onToggleMarquee) onToggleMarquee(newState); // pause if expanded
  };

  const displayText =
    text.length <= maxLength || expanded
      ? text
      : text.slice(0, maxLength) + "...";

  return (
    <div className="text-text text-sm leading-snug">
      <p className="italic">"{displayText}"</p>
      {text.length > maxLength && (
        <button
          className="text-primary hover:underline mt-1 text-xs"
          onClick={toggleText}
        >
          {expanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};
