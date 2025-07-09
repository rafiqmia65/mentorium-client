import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const TeachOnMentorium = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: existingRequest, isLoading } = useQuery({
    queryKey: ["teacher-request", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/teacher-requests/${user?.email}`);
      return res.data;
    },
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
    },
  });

  const { mutateAsync: submitRequest } = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.post("/teacher-requests", {
        ...formData,
        status: "pending",
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["teacher-request", user?.email]);
      Swal.fire({
        title: "Success!",
        text: "Your request has been submitted for review",
        icon: "success",
      });
      reset();
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    },
  });

  const { mutateAsync: resubmitRequest } = useMutation({
    mutationFn: async () => {
      const res = await axiosSecure.patch(
        `/teacher-requests/${existingRequest._id}`,
        { status: "pending" }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["teacher-request", user?.email]);
      Swal.fire({
        title: "Success!",
        text: "Your request has been resubmitted for review",
        icon: "success",
      });
    },
  });

  const onSubmit = async (data) => {
    await submitRequest(data);
  };

  const handleResubmit = async () => {
    await resubmitRequest();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (existingRequest?.status === "approved") {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">You are already a teacher!</h2>
        <p className="mt-4">You can now create and manage classes.</p>
      </div>
    );
  }

  if (existingRequest?.status === "pending") {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Your request is under review</h2>
        <p className="mt-4">
          We'll notify you once your application has been processed.
        </p>
      </div>
    );
  }

  if (existingRequest?.status === "rejected") {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Your request was not approved</h2>
        <p className="mt-4 mb-6">
          You can submit a new request if you'd like to try again.
        </p>
        <button onClick={handleResubmit} className="btn btn-primary">
          Submit New Request
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Apply to Teach on [Your Website]
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img src={user?.photoURL} alt={user?.displayName} />
            </div>
          </div>
          <div>
            <p className="font-semibold">{user?.displayName}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input input-bordered"
            readOnly
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Experience Level</span>
          </label>
          <select
            {...register("experience", { required: true })}
            className="select select-bordered"
          >
            <option value="">Select your experience</option>
            <option value="beginner">Beginner</option>
            <option value="mid-level">Mid-Level</option>
            <option value="experienced">Experienced</option>
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Title/Headline</span>
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered"
            placeholder="e.g., Web Development Instructor"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <select
            {...register("category", { required: true })}
            className="select select-bordered"
          >
            <option value="">Select a category</option>
            <option value="web-development">Web Development</option>
            <option value="digital-marketing">Digital Marketing</option>
            <option value="graphic-design">Graphic Design</option>
            <option value="data-science">Data Science</option>
            <option value="mobile-development">Mobile Development</option>
          </select>
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Submit for Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeachOnMentorium;
