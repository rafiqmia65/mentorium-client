import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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
    isLoading, 
    error: classError 
  } = useQuery({
    queryKey: ["classInfo", id, user?.uid],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/class/${id}`);
        return res.data.data; // Note: changed from res.data to res.data.data
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
    data: paymentIntent = {}, 
    isLoading: isPaymentLoading, 
    error: paymentError 
  } = useQuery({
    queryKey: ["paymentIntent", id, user?.uid],
    queryFn: async () => {
      try {
        const res = await axiosSecure.post("/create-payment-intent", {
          amount: Math.round(classInfo.price * 100), // Changed from price to amount
          classId: id,
        });
        setClientSecret(res.data.clientSecret);
        return res.data;
      } catch (err) {
        throw err;
      }
    },
    enabled: !!classInfo?.price && !!user?.accessToken,
    retry: 2,
  });

  if (classError || paymentError) {
    console.error('Payment Error Details:', {
      classError,
      paymentError,
      requestUrls: {
        class: classError?.config?.url,
        payment: paymentError?.config?.url
      },
      responses: {
        class: classError?.response?.data,
        payment: paymentError?.response?.data
      }
    });

    return (
      <div className="min-h-screen bg-neutral py-8 px-4">
        <div className="max-w-2xl mx-auto bg-base-100 rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-error mb-4">Payment Error</h2>
          <div className="space-y-2 mb-4">
            <p><strong>Error:</strong> {classError?.message || paymentError?.message}</p>
            <p><strong>Endpoint:</strong> {classError?.config?.url || paymentError?.config?.url}</p>
            <p><strong>Status Code:</strong> {classError?.response?.status || paymentError?.response?.status}</p>
            <p><strong>Response:</strong> {JSON.stringify(classError?.response?.data || paymentError?.response?.data)}</p>
          </div>
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

  if (isLoading || isPaymentLoading || !clientSecret) {
    return (
      <div className="min-h-screen bg-neutral py-8 px-4">
        <div className="max-w-2xl mx-auto bg-base-100 rounded-xl shadow-md p-8 text-center">
          <Loader />
          <p className="mt-4">Preparing your payment details...</p>
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
    <div className="min-h-screen bg-neutral py-8 px-4 sm:px-6 lg:px-8">
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

        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            classInfo={classInfo}
            clientSecret={clientSecret}
            navigate={navigate}
            location={location}
          />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;