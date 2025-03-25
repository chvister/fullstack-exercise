import { useMutation } from "@tanstack/react-query";
import { BlogService } from "@/generated-api";
import { toast } from "react-hot-toast";

export const useDeleteArticle = () => {
  return useMutation({
    mutationFn: (articleId: string) => BlogService.deleteArticle(articleId),
    onSuccess: () => {
      toast.success("Article deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete article: ${error.message}`);
    },
  });
};
