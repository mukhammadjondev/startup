import { withLayout } from '@/layout/layout';
import Seo from '@/layout/seo/seo';
import { UserDashboardPageComponent } from '@/page-component';

const Dashboard = () => {
  return (
    <Seo metaTitle="MuhsDev | Dashboard">
      <UserDashboardPageComponent />
    </Seo>
  );
};

export default withLayout(Dashboard);
