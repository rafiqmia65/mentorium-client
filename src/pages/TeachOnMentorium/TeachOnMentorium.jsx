import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FiCheckCircle, FiClock } from "react-icons/fi";
import useAuth from "../../Hook/useAuth";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import Loader from "../Loader/Loader";

const TeachOnMentorium = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch existing user data
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
        return res.data.data;
      } catch (err) {
        if (err.response && err.response.status === 404) return null;
        throw err;
      }
    },
    enabled: !!user?.email,
  });

  const existingApplication = existingUser?.teacherApplication;

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
        queryClient.invalidateQueries(["user-data", user?.email]);
        refetchUserData();
        Swal.fire({
          title: "Application Submitted!",
          text: "Your teaching application has been sent for review.",
          icon: "success",
        });
        reset();
      },
      onError: (error) => {
        Swal.fire({
          title: "Error!",
          text:
            error.response?.data?.message ||
            error.message ||
            "Something went wrong. Please try again.",
          icon: "error",
        });
      },
    });

  const onSubmit = async (data) => await submitTeacherRequest(data);

  if (isLoadingApplication) return <Loader />;

  if (isErrorApplication) {
    return (
      <div className="text-center py-20 bg-neutral min-h-screen text-error">
        <h2 className="text-2xl font-bold">Error Loading Application Status</h2>
        <p className="mt-2">Error: {applicationError?.message}</p>
      </div>
    );
  }

  if (existingUser?.role === "teacher") {
    return (
      <div className="bg-base-100 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
            <FiCheckCircle /> You are already a teacher!
          </h2>
          <p className="text-text">Now you can start creating classes.</p>
        </div>
      </div>
    );
  }

  if (existingApplication?.status === "pending") {
    return (
      <div className="bg-base-100 min-h-screen flex items-center justify-center">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-secondary flex items-center justify-center gap-2">
            <FiClock /> Your application is under review
          </h2>
          <p className="text-text">
            We’ll notify you once your application is processed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-10 bg-neutral">
      <div className="container mx-auto px-4 lg:px-0 ">
        <div className="w-full py-10 px-5 grid grid-cols-1 lg:grid-cols-2 gap-10 bg-base-100 rounded-2xl shadow-xl">
          {/* Left Section - Info */}
          <div className="flex flex-col justify-center space-y-6 ">
            <h2 className="text-4xl font-extrabold text-primary flex items-center gap-2">
              Share Your Knowledge{" "}
              <span className="hidden md:block">
                <FiCheckCircle />
              </span>
            </h2>
            <p className="text-text leading-relaxed">
              At <span className="text-secondary font-semibold">Mentorium</span>
              , we empower learners through expert-led teaching. Apply today to
              become an instructor and inspire students across the globe.
            </p>
            <ul className="space-y-4 text-text">
              <li className="flex items-center gap-2 transform transition-transform duration-300 hover:translate-x-3">
                <FiCheckCircle className="text-secondary flex-shrink-0" />
                Reach thousands of eager students
              </li>
              <li className="flex items-center gap-2 transform transition-transform duration-300 hover:translate-x-3">
                <FiCheckCircle className="text-secondary flex-shrink-0" />
                Build your teaching brand
              </li>
              <li className="flex items-center gap-2 transform transition-transform duration-300 hover:translate-x-3">
                <FiCheckCircle className="text-secondary flex-shrink-0" />
                Flexible teaching schedule
              </li>
              <li className="flex items-center gap-2 transform transition-transform duration-300 hover:translate-x-3">
                <FiCheckCircle className="text-secondary flex-shrink-0" />
                Monetize your skills effectively
              </li>
            </ul>

            <img
              src="https://img.freepik.com/free-vector/online-courses-tutorials_52683-37860.jpg"
              alt="Teach on Mentorium"
              className="rounded-xl shadow-md"
            />
          </div>

          {/* Right Section - Form */}
          <div className="bg-neutral rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-secondary">
              Apply to Teach on Mentorium
            </h2>

            <div className="flex items-center gap-4 mb-6">
              <div className="avatar">
                <div className="w-16 h-16 rounded-full ring ring-secondary ring-offset-2">
                  <img src={user?.photoURL} alt={user?.displayName} />
                </div>
              </div>
              <div>
                <p className="font-semibold text-primary">
                  {user?.displayName}
                </p>
                <p className="text-sm text-text">{user?.email}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block mb-2 font-medium">Full Name</label>
                <input
                  readOnly
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className={`w-full input input-bordered bg-neutral ${
                    errors.name ? "input-error" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-error text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-medium">Email</label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full input input-bordered bg-neutral"
                  readOnly
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block mb-2 font-medium">
                  Experience Level
                </label>
                <select
                  {...register("experience", {
                    required: "Please select experience",
                  })}
                  className={`w-full select select-bordered bg-neutral ${
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

              {/* Title */}
              <div>
                <label className="block mb-2 font-medium">
                  Professional Title
                </label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  placeholder="e.g., Web Development Instructor"
                  className={`w-full input input-bordered bg-neutral ${
                    errors.title ? "input-error" : ""
                  }`}
                />
                {errors.title && (
                  <p className="text-error text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block mb-2 font-medium">
                  Teaching Category
                </label>
                <select
                  {...register("category", {
                    required: "Please select category",
                  })}
                  className={`w-full select select-bordered bg-neutral ${
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

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn bg-secondary text-white hover:bg-secondary/80 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <>
                    <FiCheckCircle /> Submit for Review
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachOnMentorium;
