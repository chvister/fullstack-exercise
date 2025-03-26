import { useQuery } from "@tanstack/react-query";
import { BlogService, ArticleList } from "@/generated-api";

export const useFetchArticles = (page: number, pageSize: number = 10) => {
  const offset = (page - 1) * pageSize;

  return useQuery<ArticleList, Error>({
    queryKey: ["articles", page, pageSize],
    queryFn: () => BlogService.listArticles(offset, pageSize),
  });
};
