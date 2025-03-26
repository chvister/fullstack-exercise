import { useRouter } from "next/router";

import { format } from "date-fns";
import Image from "next/image";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { useArticleDetail } from "@/hooks/useArticleDetail";
import dynamic from "next/dynamic";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default.Markdown),
  { ssr: false }
);

const ArticleDetailPage = () => {
  const router = useRouter();
  const { articleId } = router.query;
  const { data: article, isLoading } = useArticleDetail(articleId as string);

  // Format the date
  const formattedDate = article?.createdAt
    ? format(new Date(article.createdAt), "dd.MM.yyyy")
    : "";

  return (
    <div className="max-w-4xl mx-auto p-6">
      {isLoading && <SkeletonLoader />}
      {article && (
        <>
          <h1 className="text-2xl font-bold mb-6">{article.title}</h1>
          <div className="text-sm text-gray-500 mb-6">
            Created: {formattedDate}
          </div>
          {article.imageId && (
            <Image
              src={`/api/images/${article.imageId}`}
              alt={article.title || "Article image"}
              className="w-full h-auto rounded"
              width={768}
              height={256}
              loading="lazy"
            />
          )}

          <MDEditor
            className="prose mt-6"
            source={article.content}
            style={{ whiteSpace: "pre-wrap" }}
          />
        </>
      )}
    </div>
  );
};

export default ArticleDetailPage;
