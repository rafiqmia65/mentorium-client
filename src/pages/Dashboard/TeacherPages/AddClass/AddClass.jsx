import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../../../Hook/useAxiosSecure";
import useAuth from "../../../../Hook/useAuth";

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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setFormData((prev) => ({ ...prev, imageFile: files[0] }));
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
    <div className="pt-20 bg-neutral">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        Add New Class
      </h2>
      <div className="max-w-2xl mx-auto bg-base-100 shadow-2xl p-10 rounded-2xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Class Title"
            className="input input-bordered w-full"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            value={user?.displayName || ""}
            className="input input-bordered w-full"
            readOnly
          />
          <input
            type="email"
            value={user?.email || ""}
            className="input input-bordered w-full"
            readOnly
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="input input-bordered w-full"
            required
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Class Description"
            className="textarea textarea-bordered w-full"
            required
            onChange={handleChange}
          ></textarea>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            required
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={addClassMutation.isPending}
            className="btn bg-primary text-white hover:bg-primary-content w-full"
          >
            {addClassMutation.isPending ? "Submitting..." : "Add Class"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddClass;
