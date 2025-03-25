import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { ArticleDetail, BlogService } from "@/generated-api";

export const useArticleMutation = () => {
  const router = useRouter();

  return useMutation<unknown, Error, ArticleDetail>({
    mutationFn: (data: ArticleDetail) => BlogService.createArticle(data),
    onSuccess: () => {
      toast.success("Article created successfully!");
      router.push("/admin");
    },
    onError: (error: Error) => {
      toast.error(`Failed to create article: ${error.message}`);
    },
  });
};
