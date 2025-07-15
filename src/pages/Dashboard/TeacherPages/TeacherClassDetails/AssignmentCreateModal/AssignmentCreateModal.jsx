import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../../Hook/useAxiosSecure";
import useAuth from "../../../../../Hook/useAuth";

const AssignmentCreateModal = ({ classId, onClose }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addAssignmentMutation = useMutation({
    mutationFn: async (assignmentData) => {
      const res = await axiosSecure.post("/assignments", assignmentData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Added!", "Assignment has been added successfully.", "success");
      reset(); 
      onClose(); 
      queryClient.invalidateQueries(["totalAssignments", classId]);
      queryClient.invalidateQueries(["assignments", classId]);
    },
    onError: (err) => {
      Swal.fire(
        "Error!",
        err.response?.data?.message || "Failed to add assignment.",
        "error"
      );
    },
  });

  const onSubmit = (data) => {
    if (!user?.email || !classId) {
      Swal.fire(
        "Error!",
        "User or class details missing for adding assignment.",
        "error"
      );
      return;
    }
    const assignmentPayload = {
      classId: classId,
      teacherEmail: user.email,
      title: data.title,
      description: data.description,
      deadline: data.deadline, 
    };
    addAssignmentMutation.mutate(assignmentPayload);
  };

  return (
    <dialog id="add_assignment_modal" className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-2xl text-primary mb-4">
          Add New Assignment
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Assignment Title</span>
            </label>
            <input
              type="text"
              placeholder="e.g., React Project Setup"
              {...register("title", { required: "Title is required" })}
              className="input input-bordered w-full"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Deadline</span>
            </label>
            <input
              type="date"
              {...register("deadline", { required: "Deadline is required" })}
              className="input input-bordered w-full"
            />
            {errors.deadline && (
              <p className="text-red-500 text-sm mt-1">
                {errors.deadline.message}
              </p>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="textarea textarea-bordered h-24 w-full"
              placeholder="Detailed description of the assignment..."
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="modal-action">
            <button
              type="submit"
              className="btn bg-primary text-white hover:bg-primary-content"
              disabled={addAssignmentMutation.isPending}
            >
              {addAssignmentMutation.isPending ? "Adding..." : "Add Assignment"}
            </button>
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default AssignmentCreateModal;
