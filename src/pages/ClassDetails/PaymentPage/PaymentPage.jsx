import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import Loader from "../../Loader/Loader";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");

  const {
    data: classInfo = {},
    isLoading: classLoading,
    error: classError,
  } = useQuery({
    queryKey: ["classInfo", id, user?.uid],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/class/${id}`);
        return res.data.data;
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          navigate("/login", { state: { from: location }, replace: true });
        }
        throw err;
      }
    },
    enabled: !!user?.accessToken,
  });

  const {
    data: paymentIntentData = {},
    isLoading: isPaymentLoading,
    error: paymentError,
  } = useQuery({
    queryKey: ["paymentIntent", id, user?.uid],
    queryFn: async () => {
      try {
        // Check if user is already enrolled
        const enrollmentCheckRes = await axiosSecure.get(
          `/users/${user.email}/enrolled-classes`
        );
        const isAlreadyEnrolled = enrollmentCheckRes.data.data.some(
          (enrolledClass) => enrolledClass._id === id
        );

        if (isAlreadyEnrolled) {
          Swal.fire({
            icon: "info",
            title: "Already Enrolled!",
            text: "You are already enrolled in this class. Redirecting to your enrolled classes.",
            timer: 3000,
            showConfirmButton: false,
          }).then(() => {
            navigate("/dashboard/myEnrolledClass", { replace: true });
          });
          return Promise.reject(new Error("User already enrolled."));
        }

        // Create payment intent
        const res = await axiosSecure.post("/create-payment-intent", {
          amount: classInfo.price,
        });
        setClientSecret(res.data.clientSecret);
        return res.data;
      } catch (err) {
        console.error("Error creating payment intent:", err);
        throw err;
      }
    },
    enabled: !!classInfo?.price && !!user?.accessToken,
  });

  if (classLoading || isPaymentLoading) {
    return (
      <div className="min-h-screen bg-neutral py-8 px-4">
        <div className="max-w-2xl mx-auto bg-base-100 rounded-xl shadow-md p-8 text-center">
          <Loader />
          <p className="mt-4">Preparing payment details...</p>
        </div>
      </div>
    );
  }

  if (classError || paymentError) {
    return (
      <div className="min-h-screen bg-neutral py-10 px-4">
        <div className="max-w-2xl mx-auto bg-base-100 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-error mb-4">Payment Error</h2>
          <p className="mb-4">{classError?.message || paymentError?.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="bg-neutral py-10 pt-25 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-base-100 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-primary mb-6">
          Complete Your Enrollment
        </h2>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Class Information</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Title:</span> {classInfo.title}
            </p>
            <p>
              <span className="font-medium">Instructor:</span> {classInfo.name}
            </p>
            <p>
              <span className="font-medium">Price:</span> ${classInfo.price}
            </p>
          </div>
        </div>

        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm
              classInfo={classInfo}
              clientSecret={clientSecret}
              navigate={navigate}
              location={location}
            />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
