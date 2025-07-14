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

  const {
    register: registerSubmission,
    handleSubmit: handleSubmitSubmission,
    reset: resetSubmissionForm,
  } = useForm();

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
          <div className="overflow-x-auto mb-10">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-base-200">
                  <th>Title</th>
                  <th>Description</th>
                  <th>Deadline</th>
                  <th>Submission</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment._id}>
                    <td>{assignment.title}</td>
                    <td className="line-clamp-2">{assignment.description}</td>
                    <td>
                      {new Date(assignment.deadline).toLocaleDateString()}
                    </td>
                    <td>
                      <form
                        onSubmit={handleSubmitSubmission((data) =>
                          onSubmitAssignment(data, assignment._id)
                        )}
                      >
                        <input
                          type="url"
                          placeholder="Submit link"
                          {...registerSubmission("submissionLink", {
                            required: true,
                          })}
                          className="input input-bordered w-full max-w-xs text-sm"
                        />
                      </form>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={handleSubmitSubmission((data) =>
                          onSubmitAssignment(data, assignment._id)
                        )}
                        className="btn btn-sm bg-primary hover:bg-primary-content text-white"
                        disabled={submitAssignmentMutation.isPending}
                      >
                        <FaPaperclip /> Submit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Evaluation Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => setShowEvaluationModal(true)}
            className="btn btn-secondary text-white btn-lg"
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
                              ? "text-yellow-400"
                              : "text-gray-300"
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
                    className="btn bg-primary text-white hover:bg-primary-content"
                    disabled={submitEvaluationMutation.isPending}
                  >
                    Send Feedback
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
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
