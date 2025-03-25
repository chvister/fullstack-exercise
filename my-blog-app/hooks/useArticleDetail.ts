import { useQuery } from "@tanstack/react-query";
import { BlogService, ArticleDetail } from "@/generated-api";

export const useArticleDetail = (articleId?: string) => {
  return useQuery<ArticleDetail>({
    queryKey: ["article", articleId],
    queryFn: () => BlogService.getArticle(articleId as string),
    enabled: !!articleId,
  });
};
