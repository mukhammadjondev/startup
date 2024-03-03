import { AllCoursesCard } from '@/components';
import { courses } from '@/config/constants';

export default function MyCourses() {
  return (
    <>
      {courses.map(course => (
        <AllCoursesCard course={course} />
      ))}
    </>
  );
}
