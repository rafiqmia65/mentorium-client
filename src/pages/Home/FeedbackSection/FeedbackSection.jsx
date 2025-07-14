import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import Loader from "../../Loader/Loader";

const FeedbackSection = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all feedbacks
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

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-8">
        Error loading feedbacks: {error.message}
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="text-center text-text py-8">
        No feedback available yet.
      </div>
    );
  }

  return (
    <section className="py-12 bg-neutral">
      <div className="container mx-auto px-4 lg:px-0 ">
        <h2 className="text-4xl font-extrabold text-center text-primary mb-10">
          What Our Students Say
        </h2>

        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          className="mySwiper p-4"
        >
          {feedbacks.map((feedback) => (
            <SwiperSlide key={feedback._id}>
              <div className="bg-base-100 shadow-lg rounded-xl p-6 flex flex-col items-center text-center h-full">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-secondary mb-4">
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
                <h3 className="text-xl font-bold text-primary mb-1">
                  {feedback.studentName}
                </h3>
                <p className="text-sm text-text mb-3">
                  Class:{" "}
                  <span className="font-semibold">{feedback.className}</span>
                </p>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-xl ${
                        feedback.rating && feedback.rating > i
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-text leading-relaxed flex-grow">
                  "{feedback.description}"
                </p>
                <p className="text-xs text-gray-400 mt-4">
                  Submitted on:{" "}
                  {new Date(feedback.submittedAt).toLocaleDateString()}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeedbackSection;
