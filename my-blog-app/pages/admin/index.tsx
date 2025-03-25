import { withAuth } from "@/utils/hocs/withAuth";

const AdminArticlesPage = () => {
  return (
    <div>
      <h1>Articles</h1>
    </div>
  );
};

export default withAuth(AdminArticlesPage);
