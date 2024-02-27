import { useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useActions } from '@/hooks/useActions';
import { CourseType } from '@/interfaces/course.interface';
import { DashboardPageComponent } from '@/page-component';
import { AppService } from '@/services/app.service';
import { LessonType } from '@/interfaces/instructor.interface';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useRouter } from 'next/router';

const CourseDashboard: NextPage<CourseDashboardProps> = ({ course }) => {
  const { sections } = useTypedSelector(state => state.section);
  const { getCourse, getLesson } = useActions();
  const router = useRouter();

  useEffect(() => {
    getCourse(course);
  }, [course]);

  useEffect(() => {
    const link = `/courses/dashboard/${course?.slug}`;
    const lessonId = localStorage.getItem(course._id);

    if (sections.length) {
      const allLessons = sections.map(c => c.lessons).flat();
      if (!lessonId) {
        const currentLesson = allLessons[0];
        getLesson(currentLesson);
        router.replace(
          { pathname: link, query: { lesson: currentLesson._id } },
          undefined,
          { shallow: true }
        );
      } else {
        const currentLesson = allLessons.find(c => c._id === lessonId);
        getLesson(currentLesson as LessonType);
        router.replace(
          { pathname: link, query: { lesson: currentLesson?._id } },
          undefined,
          { shallow: true }
        );
      }
    }
  }, [sections]);

  return <DashboardPageComponent />;
};

export default CourseDashboard;

export const getServerSideProps: GetServerSideProps<
  CourseDashboardProps
> = async ({ query }) => {
  const course = await AppService.getDetailedCourse(query.slug as string);

  return {
    props: { course },
  };
};

interface CourseDashboardProps {
  course: CourseType;
}
