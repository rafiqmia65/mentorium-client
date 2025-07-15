import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hook/useAxiosSecure';
import useAuth from '../../../Hook/useAuth';

const CheckoutForm = ({ classInfo, clientSecret, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    setProcessing(true);
    setCardError('');

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setCardError(error.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName || 'Anonymous',
          },
        },
      }
    );

    if (confirmError) {
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === 'succeeded') {
      setTransactionId(paymentIntent.id);
      
      const payment = {
        classId: classInfo._id,
        studentEmail: user?.email,
        transactionId: paymentIntent.id,
        amount: classInfo.price,
        date: new Date(),
        status: 'completed',
      };

      try {
        const res = await axiosSecure.post('/enrollments', payment);
        if (res.data.success) {
          Swal.fire({
            title: 'Payment Successful!',
            text: `You have successfully enrolled in ${classInfo.title}`,
            icon: 'success',
          }).then(() => {
            navigate('/dashboard/myEnrolledClass');
          });
        }
      } catch (err) {
        console.error('Error saving enrollment:', err);
        Swal.fire({
          title: 'Error',
          text: 'Payment succeeded but failed to save enrollment',
          icon: 'error',
        });
      }
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              '::placeholder': {
                color: '#36d399',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
        className="border p-3 rounded"
      />
      {cardError && <p className="text-red-500">{cardError}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-primary text-white w-full"
      >
        {processing ? 'Processing...' : `Pay $${classInfo.price}`}
      </button>
    </form>
  );
};

export default CheckoutForm;