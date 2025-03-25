import ArticlesTable from "@/components/article/ArticlesTable";

const ArticlesPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Articles</h1>
      <ArticlesTable />
    </div>
  );
};

export default ArticlesPage;
