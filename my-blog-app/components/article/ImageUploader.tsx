import React, { useState, useEffect } from "react";
import { useUploadImage } from "@/hooks/useUploadImage";
import { LoadingSpinner } from "../LoadingSpinner";
import Image from "next/image";
import toast from "react-hot-toast";

interface ImageUploaderProps {
  onImageUploaded?: (imageId: string) => void;
}

const ImageUploader = ({ onImageUploaded }: ImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const mutation = useUploadImage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      mutation.mutate(file);
    } else {
      toast.error("Invalid file type. Please upload a PNG or JPEG image.");
    }
  };

  useEffect(() => {
    if (mutation.isSuccess && mutation.data && mutation.data[0]?.imageId) {
      onImageUploaded?.(mutation.data[0].imageId);
    }
  }, [mutation.isSuccess, mutation.data, onImageUploaded]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (mutation.isError) {
      setPreviewUrl(null);
    }
  }, [mutation.isError]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Upload an Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <div className="mt-4">
            {mutation.isPending && (
              <div className="flex items-center text-blue-600">
                <LoadingSpinner />
              </div>
            )}
            {mutation.data && (
              <span className="text-green-600">Image Uploaded!</span>
            )}
            {mutation.error && (
              <span className="text-red-600">
                Error: {mutation.error.message}
              </span>
            )}
          </div>
        </div>
        {previewUrl && (
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
            <div className="relative overflow-hidden">
              <Image width={150} height={150} src={previewUrl} alt="Preview" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
