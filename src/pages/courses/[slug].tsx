import { CourseType } from '@/interfaces/course.interface';
import { withLayout } from '@/layout/layout';
import Seo from '@/layout/seo/seo';
import { DetailedCourseComponent } from '@/page-component';
import { AppService } from '@/services/app.service';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

const DetailedCoursePage = () => {
  const router = useRouter();

  return (
    <Seo metaTitle={`MuhsDev course | ${router.query.slug}`}>
      <DetailedCourseComponent />
    </Seo>
  );
};

export default withLayout(DetailedCoursePage);

export const getServerSideProps: GetServerSideProps<MainPageProps> = async ({
  query,
}) => {
  const course = await AppService.getDetailedCourse(query.slug as string);

  return {
    props: { course },
  };
};

interface MainPageProps {
  course: CourseType;
}
