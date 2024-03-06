import { AllCoursesCard } from '@/components';
import { MyCoursesProps } from './dashboard.props';

export default function MyCourses({ myCourses }: MyCoursesProps) {
  return (
    <>
      {myCourses.map(course => (
        <AllCoursesCard key={course._id} course={course} isMyCourse={true} />
      ))}
    </>
  );
}
