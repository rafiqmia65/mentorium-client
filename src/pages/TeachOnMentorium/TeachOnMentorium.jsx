import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Loader from "../Loader/Loader";

const TeachOnMentorium = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Check if user already has a pending or approved request
  const {
    data: existingUser,
    isLoading: isLoadingApplication,
    isError: isErrorApplication,
    error: applicationError,
    refetch: refetchUserData,
  } = useQuery({
    queryKey: ["user-data", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      try {
        const res = await axiosSecure.get(`/users/${user?.email}`);
        return res.data.data; // Assuming res.data.data contains the full user object
      } catch (err) {
        if (err.response && err.response.status === 404) {
          return null;
        }
        throw err;
      }
    },
    enabled: !!user?.email, // Only run query if user email is available

    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  // existingUser to teacherApplication
  const existingApplication = existingUser?.teacherApplication;

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
    },
  });

  // Mutation to submit teacher application
  const { mutateAsync: submitTeacherRequest, isPending: isSubmitting } =
    useMutation({
      mutationFn: async (formData) => {
        const res = await axiosSecure.patch(`/users/${user?.email}`, {
          role: "pending",
          ...formData,
        });
        return res.data;
      },
      onSuccess: () => {
        // Invalidate both the user data query and the general user role query
        queryClient.invalidateQueries(["user-data", user?.email]);
        queryClient.invalidateQueries(["user", user?.email]);

        refetchUserData();
        Swal.fire({
          title: "Application Submitted!",
          text: "Your teaching application has been sent for review",
          icon: "success",
        });
        reset();
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.";
        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
        });
      },
    });

  const onSubmit = async (data) => {
    await submitTeacherRequest(data);
  };

  // Show loading state for existing application check
  if (isLoadingApplication) {
    return <Loader></Loader>;
  }

  // Handle potential errors during fetching (e.g., network issues)
  if (isErrorApplication) {
    return (
      <div className="text-center py-10 pt-24 bg-neutral min-h-screen text-error">
        <h2 className="text-2xl font-bold">Error Loading Application Status</h2>
        <p className="mt-4">
          Please try again later. Error: {applicationError?.message}
        </p>
      </div>
    );
  }

  if (existingUser?.role === "teacher") {
    return (
      <div className="bg-base-100 min-h-screen flex items-center justify-center">
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold">You are already a teacher!</h2>
          <p className="mt-4">You can now create classes.</p>
        </div>
      </div>
    );
  }

  if (existingApplication && existingApplication.status === "pending") {
    return (
      <div className="bg-base-100 min-h-screen flex items-center justify-center">
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold">
            Your application is under review
          </h2>
          <p className="mt-4">
            We'll notify you once your application is processed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 bg-neutral min-h-screen flex items-center justify-center">
      <div className="max-w-3xl bg-base-100 mx-auto p-6 rounded-lg shadow-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-secondary text-center">
          Apply to Teach on Mentorium
        </h2>

        <div className="flex items-center gap-4 mb-6">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img src={user?.photoURL} alt={user?.displayName} />
            </div>
          </div>
          <div>
            <p className="font-semibold text-primary">{user?.displayName}</p>
            <p className="text-sm text-text">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="w-full">
            <label className="block mb-2 font-medium">Full Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`w-full input input-bordered ${
                errors.name ? "input-error" : ""
              }`}
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="w-full">
            <label className="block mb-2 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full input input-bordered"
              readOnly
            />
          </div>

          {/* Experience Field */}
          <div className="w-full">
            <label className="block mb-2 font-medium">Experience Level</label>
            <select
              {...register("experience", {
                required: "Please select your experience level",
              })}
              className={`w-full select select-bordered ${
                errors.experience ? "select-error" : ""
              }`}
            >
              <option value="">Select your experience</option>
              <option value="beginner">Beginner</option>
              <option value="mid-level">Mid-Level</option>
              <option value="experienced">Experienced</option>
            </select>
            {errors.experience && (
              <p className="text-error text-sm mt-1">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Title Field */}
          <div className="w-full">
            <label className="block mb-2 font-medium">Professional Title</label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={`w-full input input-bordered ${
                errors.title ? "input-error" : ""
              }`}
              placeholder="e.g., Web Development Instructor"
            />
            {errors.title && (
              <p className="text-error text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Category Field */}
          <div className="w-full">
            <label className="block mb-2 font-medium">Teaching Category</label>
            <select
              {...register("category", {
                required: "Please select a category",
              })}
              className={`w-full select select-bordered ${
                errors.category ? "select-error" : ""
              }`}
            >
              <option value="">Select a category</option>
              <option value="web-development">Web Development</option>
              <option value="digital-marketing">Digital Marketing</option>
              <option value="graphic-design">Graphic Design</option>
              <option value="data-science">Data Science</option>
              <option value="mobile-development">Mobile Development</option>
            </select>
            {errors.category && (
              <p className="text-error text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="w-full mt-8">
            <button
              type="submit"
              className="w-full btn bg-primary text-white hover:bg-primary-content"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Submit for Review"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeachOnMentorium;
