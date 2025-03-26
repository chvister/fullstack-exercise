import Image from "next/image";

interface PreviewImageProps {
  previewUrl: string;
  onDelete: () => void;
  isDeleting?: boolean;
}

const PreviewImage = ({
  previewUrl,
  onDelete,
  isDeleting,
}: PreviewImageProps) => {
  return (
    <div className="mt-6">
      <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
      <div className="relative overflow-hidden">
        <Image
          width={150}
          height={150}
          src={`/api/images/${previewUrl}`}
          alt="Preview img"
          className="rounded"
        />
      </div>
      <button
        type="button"
        onClick={onDelete}
        disabled={isDeleting}
        className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:bg-gray-400"
      >
        {isDeleting ? "Deleting..." : "Delete Image"}
      </button>
    </div>
  );
};

export default PreviewImage;
