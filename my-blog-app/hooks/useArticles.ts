import { useQuery } from "@tanstack/react-query";
import { BlogService, ArticleList } from "@/generated-api";

export const useFetchArticles = () => {
  return useQuery<ArticleList, Error>({
    queryKey: ["articles"],
    queryFn: () => BlogService.listArticles(),
  });
};
