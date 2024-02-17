import { CourseType } from '@/interfaces/course.interface';
import { withLayout } from '@/layout/layout';
import Seo from '@/layout/seo/seo';
import { CoursesPageComponent } from '@/page-component';
import { AppService } from '@/services/app.service';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'react-i18next';

const Courses = () => {
  const { t } = useTranslation();

  return (
    <Seo
      metaTitle={
        `MuhsDev | ${t('course_page_title', { ns: 'seo' })}` ||
        'MuhsDev | All Courses'
      }
      metaDescription={
        `MuhsDev | ${t('course_page_description', { ns: 'seo' })}` ||
        'All courses in MuhsDev platform just learn and relax'
      }
    >
      <CoursesPageComponent />
    </Seo>
  );
};

export default withLayout(Courses);

export const getServerSideProps: GetServerSideProps<MainPageType> = async ({
  req,
}) => {
  const courses = await AppService.getCourses(req.cookies.i18next);

  return {
    props: { courses },
  };
};

interface MainPageType {
  courses: CourseType[];
}
