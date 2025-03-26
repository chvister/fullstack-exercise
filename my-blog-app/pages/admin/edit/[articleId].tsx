import EditArticleForm from "@/components/article/EditArticleForm";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { ArticleDetail } from "@/generated-api";
import { useArticleDetail } from "@/hooks/useArticleDetail";
import { useUpdateArticle } from "@/hooks/useUpdateArticle";
import { withAuth } from "@/utils/hocs/withAuth";
import { useRouter } from "next/router";

const EditArticlePage = () => {
  const router = useRouter();
  const { articleId } = router.query;
  const { data: article, isLoading } = useArticleDetail(articleId as string);
  const { mutate, isPending } = useUpdateArticle();

  const handleSubmit = (data: ArticleDetail) => {
    const updatedArticle: ArticleDetail = {
      articleId: articleId as string,
      ...data,
    };
    console.log(updatedArticle);
    mutate(updatedArticle);
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit article</h1>
      {isLoading && <SkeletonLoader />}
      {article && (
        <EditArticleForm
          article={article}
          onSubmit={handleSubmit}
          isPending={isPending}
        />
      )}
    </div>
  );
};

export default withAuth(EditArticlePage);
