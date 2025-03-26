import { useMutation } from "@tanstack/react-query";
import { ArticleDetail } from "@/generated-api";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export const useUpdateArticle = () => {
  const router = useRouter();
  const auth = useContext(AuthContext);
  return useMutation({
    mutationFn: async (data: ArticleDetail) => {
      if (!data.articleId) {
        throw new Error("Article ID is required to update an article");
      }
      const response = await fetch(`/api/articles/${data.articleId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY || "",
          Authorization: auth.accessToken?.access_token || "",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Update failed");
      return response.json();
    },
    onSuccess: () => {
      toast.success("Article updated successfully!");
      router.push("/admin");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update article: ${error.message}`);
    },
  });
};
