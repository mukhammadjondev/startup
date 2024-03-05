import { AllCoursesCard } from '@/components';
import { MyCoursesProps } from './dashboard.props';

export default function MyCourses({ myCourses }: MyCoursesProps) {
  return (
    <>
      {myCourses.map(course => (
        <AllCoursesCard course={course} isMyCourse={true} />
      ))}
    </>
  );
}
