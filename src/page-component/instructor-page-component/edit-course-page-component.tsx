import { InstructorEditCourseCard } from "@/components"
import SectionTitle from "@/components/section-title/section-title"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { Grid } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

const EditCoursePageComponent = () => {
  const { courses } = useTypedSelector(state => state.instructor)
  const { t } = useTranslation()

  return <>
    <SectionTitle
      title={t('edit_course_title', {ns: 'instructor'})}
      subtitle={t('edit_course_description', {ns: 'instructor'})}
    />
    <Grid gridTemplateColumns={{base: '100%', sm: '50% 50%'}} gap={4}>
      {courses.map(item => (
        <InstructorEditCourseCard key={item.slug} item={item} />
      ))}
    </Grid>
  </>
}

export default EditCoursePageComponent