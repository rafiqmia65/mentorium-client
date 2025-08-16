import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useAuth from "../../../../Hook/useAuth";
import {
  FaChalkboardTeacher,
  FaDollarSign,
  FaImage,
  FaInfoCircle,
} from "react-icons/fa";

const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const AddClass = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    imageFile: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setFormData((prev) => ({ ...prev, imageFile: files[0] }));
      // Create image preview
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      } else {
        setImagePreview(null);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addClassMutation = useMutation({
    mutationFn: async (data) => {
      const res = await axiosSecure.post("/addClass", data);
      return res.data;
    },
    onSuccess: (res) => {
      if (res.success) {
        Swal.fire("Success!", "Class added successfully.", "success");
        navigate("/dashboard/myClass");
      } else {
        Swal.fire("Failed", "Could not add class.", "error");
      }
    },
    onError: (err) => {
      Swal.fire("Error", err.message || "Something went wrong.", "error");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imageFile) {
      return Swal.fire("Error", "Please upload an image.", "error");
    }

    try {
      // Upload image to Cloudinary
      const imageData = new FormData();
      imageData.append("file", formData.imageFile);
      imageData.append("upload_preset", uploadPreset);

      const imgRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const imgData = await imgRes.json();

      if (!imgData.secure_url) {
        throw new Error("Cloudinary upload failed.");
      }

      const classData = {
        title: formData.title,
        price: formData.price,
        description: formData.description,
        image: imgData.secure_url,
        name: user?.displayName,
        email: user?.email,
        status: "pending",
      };

      addClassMutation.mutate(classData);
    } catch (err) {
      Swal.fire("Image Upload Error", err.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-neutral py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-primary mb-2">
            Add New Class
          </h2>
          <p className="text-lg text-text">
            Fill out the form to create your new class
          </p>
        </div>

        <div className="bg-base-100 rounded-xl shadow-xl overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Class Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center text-text">
                    <FaChalkboardTeacher className="mr-2 text-primary" />
                    Class Title
                  </span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter class title"
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-primary text-text hover:border-primary transition-colors duration-200"
                  required
                  onChange={handleChange}
                />
              </div>

              {/* Instructor Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-text">
                      Instructor Name
                    </span>
                  </label>
                  <input
                    type="text"
                    value={user?.displayName || ""}
                    className="input input-bordered w-full text-text hover:border-primary transition-colors duration-200"
                    readOnly
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-text">
                      Instructor Email
                    </span>
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    className="input input-bordered w-full text-text hover:border-primary transition-colors duration-200"
                    readOnly
                  />
                </div>
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center text-text">
                    <FaDollarSign className="mr-2 text-primary" />
                    Price
                  </span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter price in USD"
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-primary text-text hover:border-primary transition-colors duration-200"
                  required
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center text-text">
                    <FaInfoCircle className="mr-2 text-primary" />
                    Class Description
                  </span>
                </label>
                <textarea
                  name="description"
                  placeholder="Describe what students will learn in this class"
                  className="textarea textarea-bordered w-full h-32 focus:ring-2 focus:ring-primary focus:border-primary text-text hover:border-primary transition-colors duration-200"
                  required
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Image Upload */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center text-text">
                    <FaImage className="mr-2 text-primary" />
                    Class Image
                  </span>
                </label>
                <input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  className="file-input file-input-bordered w-full focus:ring-2 focus:ring-primary focus:border-primary hover:border-primary transition-colors duration-200"
                  required
                  onChange={handleChange}
                />
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-text mb-2">Image Preview:</p>
                    <img
                      src={imagePreview}
                      alt="Class preview"
                      className="h-40 object-cover rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={addClassMutation.isPending}
                  className={`btn btn-block bg-secondary text-white hover:bg-secondary/80 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all ${
                    addClassMutation.isPending ? "opacity-75" : ""
                  }`}
                >
                  {addClassMutation.isPending ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Creating Class...
                    </>
                  ) : (
                    "Create Class"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;
