import { withAuth } from "@/utils/hocs/withAuth";

const AdminArticlesPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My articles</h1>
    </div>
  );
};

export default withAuth(AdminArticlesPage);
