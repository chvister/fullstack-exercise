import { Article } from "@/generated-api";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return <div className="bg-white ">{article.title}</div>;
};

export default ArticleCard;
