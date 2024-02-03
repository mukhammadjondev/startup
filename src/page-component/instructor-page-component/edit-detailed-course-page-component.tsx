import { useRouter } from "next/router"
import { InstructorManageCourse } from "@/components"
import SectionTitle from "@/components/section-title/section-title"
import { Divider, useToast } from "@chakra-ui/react"
import { useTypedSelector } from "@/hooks/useTypedSelector"
import { useActions } from "@/hooks/useActions"
import { CourseType } from "@/interfaces/course.interface"
import { useTranslation } from "react-i18next"

const EditDetailedCoursePageComponent = () => {
  const router = useRouter()
  const { course } = useTypedSelector(state => state.instructor)
  const { editCourse } = useActions()
  const toast = useToast()
  const { t } = useTranslation()

	const onSubmit = (data: CourseType) => {
    editCourse({...data, callback: () => {
      toast({title: t('successfully_edited', {ns: 'instructor'}), position: 'top-right', isClosable: true})
      router.push('/instructor/edit-courses')
    }})
  }

  return <>
    <SectionTitle title={`${t('edit_course_title', {ns: 'instructor'})} ${router.query.slug}`} subtitle='' />
    <Divider mt={5} />
    <InstructorManageCourse titleBtn={t('edit_course_title', {ns: 'instructor'})} submitHandler={onSubmit} courseValues={course} />
  </>
}

export default EditDetailedCoursePageComponent