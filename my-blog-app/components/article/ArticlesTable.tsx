import Link from "next/link";
import { useFetchArticles } from "@/hooks/useArticles";
import { useDeleteArticle } from "@/hooks/useDeleteArticle";

const ArticlesTable = () => {
  const {
    data: articles,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchArticles();
  const deleteArticleMutation = useDeleteArticle();

  const handleDelete = (articleId: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      deleteArticleMutation.mutate(articleId, {
        onSuccess: () => {
          refetch();
        },
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
              Article Title
            </th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
              Perex
            </th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={4} className="py-4 text-center text-gray-500">
                Loading...
              </td>
            </tr>
          )}
          {isError && (
            <tr>
              <td colSpan={4} className="py-4 text-center text-red-600">
                Error: {error?.message || "Failed to load articles"}
              </td>
            </tr>
          )}
          {articles?.items?.map((article) => (
            <tr key={article.articleId} className="border-b border-gray-200">
              <td className="py-3 px-4 text-gray-900 truncate max-w-xs">
                {article.title}
              </td>
              <td className="py-3 px-4 text-gray-600 truncate max-w-md">
                {article.perex}
              </td>
              <td className="py-3 px-4 flex space-x-2">
                <Link
                  href={`/admin/edit/${article.articleId}`}
                  className="text-gray-500 hover:text-blue-600"
                >
                  ✏️
                </Link>
                <button
                  onClick={() => handleDelete(article.articleId ?? "")}
                  className="text-gray-500 hover:text-red-600"
                  disabled={deleteArticleMutation.isPending}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticlesTable;
