import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { articleSchema } from "@/utils/schemas/articleSchema";
import ImageUploader from "./ImageUploader";
import dynamic from "next/dynamic";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);
type ArticleFormData = z.infer<typeof articleSchema>;

interface NewArticleFormProps {
  onSubmit: (data: ArticleFormData) => void;
  isPending: boolean;
}

const NewArticleForm = ({ onSubmit, isPending }: NewArticleFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      perex: "",
      content: "",
    },
  });

  const handleContentChange = (value?: string) => {
    setValue("content", value || "", { shouldValidate: true });
  };

  const handleImageUploaded = (imageId: string) => {
    setValue("imageId", imageId);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Article</h1>

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

        <ImageUploader onImageUploaded={handleImageUploaded} />

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Content</label>
          <MDEditor
            value={watch("content")}
            onChange={handleContentChange}
            height={500}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              {errors.content.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isPending ? "Publishing..." : "Publish Article"}
        </button>
      </form>
    </div>
  );
};

export default NewArticleForm;
