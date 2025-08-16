import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../../Hook/useAuth";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import Loader from "../../../Loader/Loader";
import UpdateClassModal from "./UpdateClassModal/UpdateClassModal";

const MyClasses = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [selectedClass, setSelectedClass] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const {
    data: myClasses = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myClasses", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-classes?email=${user?.email}`);
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  const deleteClassMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/my-classes/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Class has been deleted.", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete class.", "error");
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="min-h-screen p-6 bg-neutral">
      <h2 className="text-3xl font-bold text-primary text-center mb-6">
        My Classes ({myClasses.length})
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myClasses.map((cls) => (
          <div
            key={cls._id}
            className="bg-base-100 shadow-lg rounded-xl flex flex-col h-full"
          >
            <div className="p-4 flex-grow">
              <img
                src={cls.image}
                alt={cls.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h2 className="text-xl font-semibold mb-2">{cls.title}</h2>
              <p className="mb-1">
                <strong>Instructor:</strong> {cls.name}
              </p>
              <p className="mb-1">
                <strong>Email:</strong> {cls.email}
              </p>
              <p className="mb-1">
                <strong>Price:</strong> ${cls.price}
              </p>
              <p className="mb-3">
                <strong>Status:</strong>{" "}
                <span
                  className={`badge ml-2 text-white ${
                    cls.status === "approved"
                      ? "badge-success"
                      : cls.status === "denied"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {cls.status}
                </span>
              </p>
            </div>

            {/* Button container with fixed position at bottom */}
            <div className="p-4 mt-auto">
              <div className="flex flex-wrap gap-2 justify-between">
                <button
                  onClick={() => {
                    setSelectedClass(cls);
                    setUpdatedData({
                      title: cls.title,
                      price: cls.price,
                      description: cls.description,
                      name: cls.name,
                      email: cls.email,
                      image: cls.image,
                      status: cls.status || "pending",
                    });
                  }}
                  className="btn btn-sm bg-secondary/80 hover:bg-secondary text-white flex-1"
                >
                  Update
                </button>

                <button
                  onClick={() =>
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You won't be able to undo this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#d33",
                      cancelButtonColor: "#3085d6",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteClassMutation.mutate(cls._id);
                      }
                    })
                  }
                  className="btn btn-sm btn-error text-white flex-1"
                >
                  Delete
                </button>

                <button
                  onClick={() =>
                    navigate(`/dashboard/teacherClassDetails/${cls._id}`)
                  }
                  className={`btn btn-sm btn-secondary flex-1 text-white ${
                    cls.status !== "approved" ? "btn-disabled" : ""
                  }`}
                  disabled={cls.status !== "approved"}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {selectedClass && (
        <UpdateClassModal
          selectedClass={selectedClass}
          updatedData={updatedData}
          setUpdatedData={setUpdatedData}
          onClose={() => setSelectedClass(null)}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default MyClasses;
