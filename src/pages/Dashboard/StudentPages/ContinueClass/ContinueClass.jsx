import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { FaPaperclip, FaStar } from "react-icons/fa";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useAuth from "../../../../Hook/useAuth";
import Loader from "../../../Loader/Loader";

const ContinueClass = () => {
  const { id: classId } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  // Fetch Class Details
  const {
    data: classDetails,
    isLoading: classLoading,
    isError: classError,
    error: classFetchError,
  } = useQuery({
    queryKey: ["classDetails", classId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/class/${classId}`);
      return res.data.data;
    },
    enabled: !!classId,
  });

  // Fetch Assignments
  const {
    data: assignments = [],
    isLoading: assignmentsLoading,
    isError: assignmentsError,
    error: assignmentsFetchError,
    refetch: refetchAssignments,
  } = useQuery({
    queryKey: ["assignments", classId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assignments/${classId}`);
      return res.data.data;
    },
    enabled: !!classId,
  });

  // Form for submission
  const {
    register: registerSubmission,
    handleSubmit: handleSubmitSubmission,
    reset: resetSubmissionForm,
  } = useForm();

  // Submit Assignment
  const submitAssignmentMutation = useMutation({
    mutationFn: async (submissionData) => {
      const res = await axiosSecure.post("/submissions", submissionData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Submitted!", "Your assignment has been submitted.", "success");
      resetSubmissionForm();
      refetchAssignments();
      queryClient.invalidateQueries([
        "teacherClassDetails",
        classDetails?.email,
        classId,
      ]);
    },
    onError: (err) => {
      Swal.fire(
        "Error!",
        err.response?.data?.message || "Failed to submit.",
        "error"
      );
    },
  });

  const onSubmitAssignment = (data, assignmentId) => {
    if (!user?.email) {
      Swal.fire("Error!", "You must be logged in.", "error");
      return;
    }
    submitAssignmentMutation.mutate({
      assignmentId,
      classId,
      studentEmail: user.email,
      submissionLink: data.submissionLink,
    });
  };

  // Form for Evaluation
  const {
    register: registerEvaluation,
    handleSubmit: handleSubmitEvaluation,
    reset: resetEvaluationForm,
    formState: { errors },
  } = useForm();

  const submitEvaluationMutation = useMutation({
    mutationFn: async (evaluationData) => {
      const res = await axiosSecure.post("/evaluations", evaluationData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Feedback Sent!", "Your evaluation was submitted.", "success");
      resetEvaluationForm();
      setSelectedRating(0);
      setShowEvaluationModal(false);
    },
    onError: (err) => {
      Swal.fire(
        "Error!",
        err.response?.data?.message || "Failed to submit evaluation.",
        "error"
      );
    },
  });

  const onSubmitEvaluation = (data) => {
    if (!user?.email || !classDetails?._id) {
      Swal.fire("Error!", "Missing user or class info.", "error");
      return;
    }

    if (selectedRating === 0) {
      Swal.fire("Error!", "Please select a rating before submitting.", "error");
      return;
    }

    submitEvaluationMutation.mutate({
      classId: classDetails._id,
      className: classDetails.title,
      instructorEmail: classDetails.email,
      studentEmail: user.email,
      rating: selectedRating,
      description: data.description,
    });
  };

  if (classLoading || assignmentsLoading) return <Loader />;

  if (classError || assignmentsError) {
    return (
      <div className="min-h-screen p-6 bg-neutral flex flex-col justify-center items-center">
        <p className="text-red-500 text-center text-lg mb-4">
          Error loading data:{" "}
          {classFetchError?.message || assignmentsFetchError?.message}
        </p>
        <button
          onClick={() => navigate("/dashboard/my-enroll-classes")}
          className="btn btn-primary"
        >
          Back to My Enrolled Classes
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-base-100 rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">
          Assignments for "{classDetails?.title}"
        </h2>

        {assignments.length === 0 ? (
          <p className="text-center text-text text-lg">
            No assignments available yet.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {assignments.map((assignment) => (
              <div
                key={assignment._id}
                className="card bg-neutral shadow-md border border-primary rounded-xl p-5 flex flex-col justify-between"
              >
                {/* Title */}
                <h3 className="text-base font-semibold text-primary mb-2">
                  {assignment.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-text line-clamp-2 mb-2">
                  {assignment.description}
                </p>

                {/* Deadline */}
                <p className="text-xs text-text mb-4">
                  Deadline:{" "}
                  <span className="font-medium text-primary">
                    {new Date(assignment.deadline).toLocaleDateString()}
                  </span>
                </p>

                {/* Submission Form */}
                <form
                  onSubmit={handleSubmitSubmission((data) =>
                    onSubmitAssignment(data, assignment._id)
                  )}
                  className="flex flex-col gap-3 mt-auto"
                >
                  <input
                    type="url"
                    placeholder="Submit link"
                    {...registerSubmission("submissionLink", {
                      required: true,
                    })}
                    className="input input-bordered input-sm w-full"
                  />
                  <button
                    type="submit"
                    className="btn btn-sm bg-secondary hover:bg-secondary/80 text-white flex items-center gap-2"
                    disabled={submitAssignmentMutation.isPending}
                  >
                    <FaPaperclip /> Submit
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}

        {/* Evaluation Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => setShowEvaluationModal(true)}
            className="btn bg-secondary text-white btn-lg"
          >
            Create Teaching Evaluation Report
          </button>
        </div>

        {/* Evaluation Modal */}
        {showEvaluationModal && (
          <dialog id="evaluation_modal" className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-2xl text-primary mb-4">
                Teaching Evaluation Report
              </h3>
              <form
                onSubmit={handleSubmitEvaluation(onSubmitEvaluation)}
                className="space-y-4"
              >
                {/* Feedback Textarea */}
                <div className="form-control">
                  <label className="label text-text">
                    <span className="label-text text-text">Your Feedback</span>
                  </label>
                  <textarea
                    {...registerEvaluation("description", {
                      required: "Feedback is required",
                    })}
                    className="textarea textarea-bordered h-24 w-full"
                    placeholder="Share your experience..."
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Star Rating */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Rating (1–5 Stars)</span>
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <label key={star} className="cursor-pointer">
                        <input
                          type="radio"
                          value={star}
                          className="hidden"
                          onChange={() => setSelectedRating(star)}
                          checked={selectedRating === star}
                        />
                        <FaStar
                          className={`text-3xl transition ${
                            selectedRating >= star
                              ? "text-primary"
                              : "text-primary/40"
                          }`}
                        />
                      </label>
                    ))}
                  </div>
                  {selectedRating === 0 && (
                    <p className="text-red-500 text-sm mt-1">
                      Please select a star rating.
                    </p>
                  )}
                </div>

                <div className="modal-action">
                  <button
                    type="submit"
                    className="btn bg-primary text-white hover:bg-primary/80"
                    disabled={submitEvaluationMutation.isPending}
                  >
                    Send Feedback
                  </button>
                  <button
                    type="button"
                    className="btn bg-secondary text-white "
                    onClick={() => {
                      setShowEvaluationModal(false);
                      setSelectedRating(0);
                      resetEvaluationForm();
                    }}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default ContinueClass;
