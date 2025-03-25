import Link from "next/link";
import { format } from "date-fns";
import { useFetchImage } from "@/hooks/useFetchImage";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Article } from "@/generated-api";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const fetchImageMutation = useFetchImage();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const formattedDate = article.createdAt
    ? format(new Date(article.createdAt), "MM/dd/yy HH:mm")
    : "Unknown date";

  useEffect(() => {
    if (article.imageId) {
      fetchImageMutation.mutate(article.imageId);
    }
  }, [article.imageId]);

  useEffect(() => {
    if (fetchImageMutation.isSuccess && fetchImageMutation.data) {
      setImageUrl(fetchImageMutation.data);
    }
  }, [fetchImageMutation.isSuccess, fetchImageMutation.data]);

  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-200 last:border-b-0">
      {article.imageId && (
        <div className="w-32 h-32 flex-shrink-0">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={article.title ?? "Article image"}
              className="w-full h-full object-cover rounded"
              loading="lazy"
              height={128}
              width={128}
            />
          )}
        </div>
      )}

      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          <Link
            href={`/articles/${article.articleId}`}
            className="hover:text-blue-600 transition-colors"
          >
            {article.title}
          </Link>
        </h3>

        <div className="text-sm text-gray-500 mb-2">{formattedDate}</div>

        <p className="text-gray-600 text-sm mb-2 line-clamp-3">
          {article.perex}
        </p>

        <Link
          href={`/articles/${article.articleId}`}
          className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
        >
          Read whole article
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;
