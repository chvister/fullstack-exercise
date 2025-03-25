import ArticleCard from "@/components/article/ArticleCard";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { ArticleList, BlogService } from "@/generated-api";
import { useQuery } from "@tanstack/react-query";

export default function ArticlePage() {
  const { isLoading, data: articles } = useQuery<ArticleList>({
    queryKey: ["articles"],
    queryFn: () => BlogService.listArticles(),
  });

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-xl font-bold my-8">Latest Articles</h1>
      <div className="grid gap-6">
        <div className="relative">
          {isLoading && (
            <div className="absolute top-0 left-0 right-0 bg-blue-50 p-2 text-center">
              <SkeletonLoader />
            </div>
          )}
          {!isLoading && articles?.items?.length === 0 && (
            <div className="text-center text-gray-500">No articles </div>
          )}
        </div>

        {!isLoading &&
          articles?.items?.map((article) => (
            <ArticleCard key={article.articleId} article={article} />
          ))}
      </div>
    </div>
  );
}
