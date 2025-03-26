import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { articleSchema } from "@/utils/schemas/articleSchema";
import ImageUploader from "./ImageUploader";
import { ArticleDetail } from "@/generated-api";
import PreviewImage from "./PreviewImage";
import { useDeleteImage } from "@/hooks/useDeleteImage";
import { useCallback } from "react";
import dynamic from "next/dynamic";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);
type ArticleFormData = z.infer<typeof articleSchema>;

interface EditArticleFormProps {
  article: ArticleDetail;
  onSubmit: (data: ArticleFormData) => void;
  isPending: boolean;
}

const EditArticleForm = ({
  article,
  onSubmit,
  isPending,
}: EditArticleFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: article.title,
      perex: article.perex,
      content: article.content || "",
      imageId: article.imageId || undefined,
    },
  });
  const { mutate, isPending: isImgDeleting } = useDeleteImage();

  const handleContentChange = useCallback(
    (value?: string) => {
      setValue("content", value || "", { shouldValidate: true });
    },
    [setValue]
  );

  const handleImageUploaded = useCallback(
    (imageId: string) => {
      setValue("imageId", imageId, { shouldValidate: true });
    },
    [setValue]
  );

  const handleDeleteImage = async () => {
    if (!article.imageId) {
      return;
    }
    mutate(article.imageId, {
      onSuccess: () => {
        setValue("imageId", undefined);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          {...register("title")}
          className="w-full p-2 border rounded"
          placeholder="Enter article title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Perex</label>
        <textarea
          {...register("perex")}
          className="w-full p-2 border rounded h-32"
          placeholder="Short article summary"
        />
        {errors.perex && (
          <p className="text-red-500 text-sm mt-1">{errors.perex.message}</p>
        )}
      </div>

      {watch("imageId") && article.imageId ? (
        <PreviewImage
          isDeleting={isImgDeleting}
          onDelete={handleDeleteImage}
          previewUrl={article.imageId}
        />
      ) : (
        <ImageUploader onImageUploaded={handleImageUploaded} />
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Content</label>
        <MDEditor
          value={watch("content")}
          onChange={handleContentChange}
          height={500}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditArticleForm;
