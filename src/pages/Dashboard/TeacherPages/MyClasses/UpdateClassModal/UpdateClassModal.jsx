import React, { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const UpdateClassModal = ({
  selectedClass,
  updatedData,
  setUpdatedData,
  onClose,
}) => {
  const dialogRef = useRef();

  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  // ✅ Cloudinary image upload
  const imageUploadMutation = useMutation({
    mutationFn: async (imageFile) => {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData }
      );

      const data = await res.json();

      if (!data.secure_url) {
        throw new Error("Image upload failed: " + JSON.stringify(data));
      }

      return data.secure_url;
    },
    onSuccess: (url) => {
      setUpdatedData((prev) => ({ ...prev, image: url }));
      Swal.fire("Success", "Image uploaded successfully!", "success");
    },
    onError: (err) => {
      Swal.fire("Error", err.message || "Image upload failed!", "error");
    },
  });

  // ✅ PATCH mutation for updating class
  const updateClassMutation = useMutation({
    mutationFn: async (classData) => {
      const res = await fetch(
        `http://localhost:3000/my-classes/${selectedClass._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(classData),
        }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(
          errData?.message || `Update failed: ${res.status}`
        );
      }

      return res.json();
    },
    onSuccess: () => {
      Swal.fire("Updated!", "Class updated successfully!", "success");
      dialogRef.current.close();
      onClose();
    },
    onError: (err) => {
      Swal.fire("Error", err.message || "Update failed.", "error");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire("Error", "Image size must be under 10MB", "error");
        return;
      }
      imageUploadMutation.mutate(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: updatedData.title,
      price: updatedData.price,
      description: updatedData.description,
      image: updatedData.image,
      status: updatedData.status || "pending",
    };

    updateClassMutation.mutate(payload);
  };

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }

    if (selectedClass) {
      setUpdatedData({
        title: selectedClass.title || "",
        price: selectedClass.price || "",
        description: selectedClass.description || "",
        name: selectedClass.name || "",
        email: selectedClass.email || "",
        image: selectedClass.image || "",
        status: selectedClass.status || "pending",
      });
    }
  }, [selectedClass, setUpdatedData]);

  return (
    <dialog ref={dialogRef} className="modal">
      <div className="modal-box max-w-xl">
        <h3 className="font-bold text-xl text-primary mb-4">Update Class</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={updatedData.title || ""}
            onChange={handleChange}
            placeholder="Class Title"
            className="input input-bordered w-full"
            required
          />
          <input
            type="text"
            name="name"
            value={updatedData.name || ""}
            className="input input-bordered w-full bg-base-200"
            readOnly
          />
          <input
            type="email"
            name="email"
            value={updatedData.email || ""}
            className="input input-bordered w-full bg-base-200"
            readOnly
          />
          <input
            type="number"
            name="price"
            value={updatedData.price || ""}
            onChange={handleChange}
            placeholder="Price"
            className="input input-bordered w-full"
            required
          />
          <textarea
            name="description"
            value={updatedData.description || ""}
            onChange={handleChange}
            placeholder="Class Description"
            className="textarea textarea-bordered w-full"
            required
          />
          {updatedData.image && (
            <img
              src={updatedData.image}
              alt="Class"
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={imageUploadMutation.isLoading}
            className="file-input file-input-bordered w-full"
          />
          {imageUploadMutation.isLoading && (
            <p className="text-sm text-gray-500">Uploading image...</p>
          )}

          <div className="modal-action">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={
                imageUploadMutation.isLoading || updateClassMutation.isLoading
              }
            >
              {updateClassMutation.isLoading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                dialogRef.current.close();
                onClose();
              }}
              disabled={imageUploadMutation.isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateClassModal;
