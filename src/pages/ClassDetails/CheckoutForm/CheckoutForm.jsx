import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import useAxiosSecure from "../../../Hook/useAxiosSecure";
import useAuth from "../../../Hook/useAuth";
import { useNavigate, useLocation } from "react-router";

const CheckoutForm = ({ classInfo, clientSecret, navigate, location }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      return;
    }

    try {
      console.log("Confirming payment with clientSecret:", clientSecret);

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

      if (stripeError) {
        console.error("Stripe payment error:", stripeError);
        setError(stripeError.message);
        setProcessing(false);
        return;
      }

      console.log("Payment successful, paymentIntent:", paymentIntent);
      console.log("Attempting enrollment for class:", classInfo._id);

      const enrollmentResponse = await axiosSecure.post("/enrollments", {
        classId: classInfo._id,
        studentEmail: user.email,
        paymentIntentId: paymentIntent.id,
      });

      console.log("Enrollment response:", enrollmentResponse.data);

      if (enrollmentResponse.data.success) {
        navigate("/dashboard/myEnrolledClass", {
          state: { from: location },
          replace: true,
        });
      } else {
        setError(enrollmentResponse.data.message || "Enrollment failed");
      }
    } catch (err) {
      console.error("Full error details:", {
        message: err.message,
        response: err.response?.data,
        config: err.config,
      });
      setError(
        err.response?.data?.message ||
          err.message ||
          "An unknown error occurred"
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      {error && <div className="text-red-500 py-2">{error}</div>}

      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn bg-primary hover:bg-primary-content w-full mt-4"
      >
        {processing ? "Processing..." : `Pay $${classInfo.price}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
