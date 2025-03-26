import NewArticleForm from "@/components/article/NewArticleForm";
import { ArticleDetail } from "@/generated-api";
import { useArticleMutation } from "@/hooks/useCreateArticle";
import { withAuth } from "@/utils/hocs/withAuth";

const NewArticlePage = () => {
  const { mutate, isPending } = useArticleMutation();

  const handleSubmit = (data: ArticleDetail) => {
    mutate(data);
  };

  return <NewArticleForm onSubmit={handleSubmit} isPending={isPending} />;
};

export default withAuth(NewArticlePage);
