import Carousel from "react-multi-carousel"
import { useTranslation } from "react-i18next"
import { courseCarousel } from "@/config/carousel"
import SectionTitle from "../section-title/section-title"
import PopularCoursesCard from "../popular-courses-card/popular-courses-card"
import { useTypedSelector } from "@/hooks/useTypedSelector"

const PopularCourses = () => {
	const {t} = useTranslation()
  const { courses } = useTypedSelector(state => state.course)

  return (
    <>
      <SectionTitle title={t('popular_courses_title', {ns: 'home'})} subtitle={t('popular_courses_description', {ns: 'home'})} />
      <Carousel responsive={courseCarousel} arrows={true} showDots={false} autoPlay={true} autoPlaySpeed={5000} infinite>
        {courses.map(course => (
          <PopularCoursesCard course={course} key={course.title} />
        ))}
      </Carousel>
    </>
  )
}

export default PopularCourses